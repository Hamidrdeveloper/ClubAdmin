const _ = require('lodash');
const fs = require('fs');
const { translate } = require('./translator');
const logger = require('node-color-log');
const { progress } = require('./starter');
const spell = require('spellchecker');
const cache = require('../history/History.json');
//
module.exports = {
    async addLanguage(locale, { folder, file: _file, counts }, engineDir) {
        const file = _.cloneDeep(_file)
        const currentFile = fs.existsSync(folder + '/' + String(locale).toUpperCase() + '.json') ? JSON.parse(fs.readFileSync(folder + '/' + String(locale).toUpperCase() + '.json', 'utf-8')) : undefined;
        logger.color('yellow').bold().log('Loading...');
        //
        let _count = 1;
        const recursive = async (obj, stepper) => {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const item = keys[i];
                if (typeof obj[item] === 'object') {
                    await recursive(obj[item], stepper ? [...stepper, item] : [item]);
                } else if (typeof obj[item] === 'string') {
                    if (!currentFile || _.get(cache, [String(locale).toUpperCase(), ...(stepper ? [...stepper, item] : [item])].join("."), "Amir") !== _.get(file, (stepper ? [...stepper, item] : [item]).join("."), "Amir"))
                        _.set(file, (stepper ? [...stepper, item] : [item]).join('.'), await translate(obj[item], locale));
                    else
                        _.set(file, (stepper ? [...stepper, item] : [item]).join('.'), _.get(currentFile, (stepper ? [...stepper, item] : [item]).join("."), "Amir"));
                    progress(((_count++ / counts) * 100).toFixed(1));
                }
            }
        };
        await recursive(file, null);
        fs.writeFileSync(folder + '/' + String(locale).toUpperCase() + '.json', JSON.stringify(file));
        //
        const newHistory = JSON.parse(fs.readFileSync(engineDir + '/history/History.json'));
        newHistory[String(locale).toUpperCase()] = _file;
        fs.writeFileSync(engineDir + '/history/History.json', JSON.stringify(newHistory));
        //
        logger.color('green').log('\nDone!');
    },
    spellCheck({ file }) {
        const recursive = (obj, stepper) => {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const item = keys[i];
                if (typeof obj[item] === 'object') {
                    recursive(obj[item], stepper ? [...stepper, item] : [item]);
                } else if (typeof obj[item] === 'string') {
                    const words = obj[item].split(" ");
                    let result = false;
                    words.forEach((word) => {
                        if (spell.isMisspelled(word))
                            result = true;
                    });
                    //
                    if (result && !obj[item].includes('{') && !obj[item].includes('}') && !obj[item].includes('-') && !obj[item].includes('/') && !obj[item].includes('.') && !obj[item].includes('!') && !obj[item].includes('?') && !obj[item].includes('&') && !obj[item].includes(')')) {
                        logger
                            .color('yellow')
                            .log('Spell Check Error: ')
                            .joint()
                            .color('cyan')
                            .log(item)
                            .joint()
                            .log(' - ')
                            .joint()
                            .color('blue')
                            .log(obj[item]);
                    }
                }
            }
        };
        recursive(file, null);
        logger.color('green').log('\nDone!');
    },
    checkUntranslated(srcDir) {
        const recursive = (dir) => {
            const res = fs.statSync(dir)
            //
            if (res.isDirectory()) {
                const dirs = fs.readdirSync(dir);
                dirs.forEach((d) => {
                    recursive(dir + "/" + d);
                });
            } else if (res.isFile()) {
                const files = String(dir).split('.').filter((t) => t === 'tsx' | t === 'ts');
                if (files && files.length > 0) {
                    const file = fs.readFileSync(dir, 'utf-8');
                    //
                    const match = file.search(/label="(.+)"|placeholder="(.+)"|alt="(.+)"|title="(.+)"|>([a-zA-Z0-9 \.,\?!:]*)<\/|message\.(\w+)\('([a-zA-Z0-9 ]*)'\)|cancel\.\('([a-zA-Z0-9 ]*)'\)/g);
                    // 
                    if (match !== -1) {
                        let count = 0;
                        let ans = -1;
                        const lines = file.split("\n");
                        for (let j = 0; j < lines.length; j++) {
                            count += lines[j].length;
                            if (match <= count + j + 1) {
                                ans = j + 1;
                                break;
                            }
                        }
                        logger.color('yellow').log("Founded! : ").joint().color('green').log(dir + ":" + ans)
                    }


                }
            }
        };
        recursive(srcDir);
    },
    structureCheck({ file }) {
        const keys = Object.keys(file)
        const recursive = (obj, key) => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach((key) => {
                    recursive(obj[key], key);
                });
            } else if (typeof obj === 'string') {
                if (key?.includes('.') || key?.includes('/'))
                    logger.color('yellow').log('Founded! : ').joint().color("blue").log(key);
            }
        };
        keys.forEach((key) => {
            recursive(file[key], null);
        });
    },
    duplicateCheck({ file }) {
        const recursive = (obj, key, lastLevel) => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach((_key) => {
                    recursive(obj[_key], _key, key ? (lastLevel ? [...lastLevel, key] : [key]) : [])
                });
            } else if (typeof obj === 'string') {
                const recursive_inner = (_obj, _key, dup, _last) => {
                    if (typeof _obj === 'object') {
                        Object.keys(_obj).forEach((__key) => {
                            recursive_inner(_obj[__key], __key, dup, _key ? (_last ? [..._last, _key] : [_key]) : [])
                        });
                    } else if (typeof _obj === 'string') {
                        if (_obj === dup && key !== _key)
                            logger.color('yellow').log("Duplicate: ").joint().color('blue').log('[' + lastLevel?.join('.') + '.' + key + ', ' + _last?.join('.') + '.' + _key + ']').joint().log(" - ").joint().color('cyan').log(dup)
                    }
                };

                recursive_inner(file, null, obj, null);
            }
        };

        recursive(file, null, null);
    },
    globalDuplicateCheck({ file }) {
        const recursive = (obj, key, lastLevel) => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach((_key) => {
                    recursive(obj[_key], _key, key ? (lastLevel ? [...lastLevel, key] : [key]) : [])
                });
            } else if (typeof obj === 'string') {
                const recursive_inner = (_obj, _key, dup, _last) => {
                    if (typeof _obj === 'object') {
                        Object.keys(_obj).forEach((__key) => {
                            recursive_inner(_obj[__key], __key, dup, _key ? (_last ? [..._last, _key] : [_key]) : [])
                        });
                    } else if (typeof _obj === 'string') {
                        if (_obj === dup && (!lastLevel || !lastLevel.includes('Global')))
                            logger.color('yellow').log("Duplicate: ").joint().color('blue').log('[' + lastLevel?.join('.') + '.' + key + ', ' + 'Global.' + _key + ']').joint().log(" - ").joint().color('cyan').log(dup)
                    }
                };

                recursive_inner(file["Global"], "Global", obj, null);
            }
        };

        recursive(file, null, null);
    },

};
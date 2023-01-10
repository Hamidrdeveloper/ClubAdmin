const fs = require('fs');
const logger = require('node-color-log');
//
module.exports = {
    find: () => {
        const path = process.cwd().split("/");
        path.pop();
        //
        const pack = fs.existsSync(path.join("/") + "/package.json") ? JSON.parse(fs.readFileSync(path.join("/") + "/package.json", "utf-8")) : false;
        const src = fs.existsSync(path.join("/") + "/src") ? path.join("/") + "/src" : false;
        const t_engine = fs.existsSync(path.join("/") + "/t_engine") ? path.join("/") + "/t_engine" : false;
        if (pack && src) {
            logger.color('green').log("Success: ").joint().log("Project founded! Project Name: ").joint().color("yellow").log(pack["name"]);
        } else {
            logger.color('red').log("Error: ").joint().log("Project is not in parent directory!");
        }

        const en = fs.existsSync(path.join("/") + "/src/assets/locales/En.json") ? JSON.parse(fs.readFileSync(path.join("/") + "/src/assets/locales/En.json", "utf-8")) : false;
        let enCount = 0;
        const recursive = (obj) => {
            if (typeof obj === 'object') {
                Object.keys(obj).forEach((key) => {
                    recursive(obj[key])
                })
            } else if (typeof obj === 'string')
                enCount++;
        };

        recursive(en);
        if (en) {
            logger.color('green').log("Success: ").joint().log("Source translation founded!");
            logger.color('yellow').log("Translated Words: ").joint().color('cyan').log(enCount + " Words");
        } else {
            logger.color('red').log("Error: ").joint().log("There was no translation source!");
        }

        return [pack, src, { src: path.join("/") + "/src/assets/locales/En.json", folder: path.join("/") + "/src/assets/locales", file: en, counts: enCount }, t_engine];
    },
    breaker: (i = true) => {
        if (i)
            process.stdout.write('\x1Bc');
        logger.color('magenta').log("------------------------------")
    },
    progress(progress) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(progress + '%');
    }
};
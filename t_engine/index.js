const { addLanguage, spellCheck, checkUntranslated, structureCheck, duplicateCheck, globalDuplicateCheck } = require("./functions/language");
const { find, breaker } = require("./functions/starter");
const { menu } = require("./strings/questions");
const { addLanguageToProject } = require("./functions/project");
//
const scanner = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
//
breaker();
//
let config = find();
//
const run = () => {
    const [package, srcDir, trans, engineDir] = config;
    //
    breaker(false);
    //
    scanner.question(menu, (answer) => {
        switch (answer) {
            case '0':
                process.stdout.write('\x1Bc');
                config = find();
                run();
                break;
            case '1':
                // Add Language!
                breaker();
                scanner.question("(type locale): ", async (locale) => {
                    await addLanguage(locale, trans, engineDir);
                    breaker();
                    scanner.question("\tAdd language to project?\n(yes/n): ", async (answer) => {
                        if (answer === 'yes') {
                            await addLanguageToProject(srcDir, locale, scanner);
                        }
                        run();
                    })
                });
                break;
            case '2':
                //Spell Check!
                breaker();
                spellCheck(trans);
                run();
                break;
            case '3':
                //Untranslated Words!
                breaker();
                checkUntranslated(srcDir);
                run();
                break;
            case '4':
                //Structure Checks!
                breaker();
                structureCheck(trans);
                run();
                break;
            case '5':
                //Duplicate Check
                breaker();
                duplicateCheck(trans);
                run();
                break;
            case '6':
                //Global Duplicate Check
                breaker();
                globalDuplicateCheck(trans);
                run();
                break;
            default:
                run();
                break;
        }
    });
}

run();
const fs = require("fs");
const logger = require("node-color-log");
const util = require('util');

module.exports = {
    async addLanguageToProject(srcDir, locale, scanner) {
        const headerMenu = fs.readFileSync(srcDir + '/core/Layout/Header/Header.tsx', 'utf-8')
        const start = headerMenu.search("LanguagesMenus") - 6;
        const end = headerMenu.search(/<\/Menu>\n(\s{0,})\);/g) + 12;
        const langMenu = headerMenu.substring(start, end)
        const langAdd = [];
        const langTitle = [];
        const all = langMenu.matchAll(/handleChangeLang\('(\w+)'\)/g);
        while (true) {
            const n = all.next();
            if (n.done) {
                langAdd.push(locale)
                break;
            }
            else
                langAdd.push(n.value[1])
        }

        const question = util.promisify(scanner.question).bind(scanner);

        for (let i = 0; i < langAdd.length; i++) {
            const res = await question("Title of: '" + langAdd[i] + "'? ");
            langTitle.push(res);
        }

        const result = `const LanguagesMenus = (
            <Menu>
               ${langAdd.map((v, i) => `
                <Menu.Item key="${i}">
                    <span onClick={() => handleChangeLang('${v}')}>${langTitle[i]}</span>
                </Menu.Item>
                `).join("")}
            </Menu>  
        );`;

        fs.writeFileSync(srcDir + '/core/Layout/Header/Header.tsx', headerMenu.split(langMenu).join(result))
        //
        logger.color('green').log('\nHeader.tsx Done!');

        const i18nConfig = fs.readFileSync(srcDir + '/core/i18n/config.ts', 'utf-8');
        const line = i18nConfig.split(";").filter((line) => line.includes("as const"))[0] + ";";
        const resultI18N = `\nexport const resources = {${langAdd.map((v, i) => `${v}: { ns1: ${langTitle[i]} },`).join("")}} as const;`;
        const impos = `import ${langTitle[langTitle.length - 1]} from '@src/assets/locales/${String(langAdd[langAdd.length - 1]).toUpperCase()}.json';\n`;
        fs.writeFileSync(srcDir + '/core/i18n/config.ts', (impos + i18nConfig).split(line).join(resultI18N))
        logger.color('green').log('\Config.ts Done!');
    }
};
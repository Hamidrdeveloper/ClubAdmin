const fs = require('fs');
const path = require('path');
const jsonConcat = require('json-concat');

const modulesDir = path.join(__dirname, '../src/modules');
const mainTranslation = path.join(__dirname, '../src/core/i18n/En.json');
const authTranslation = path.join(__dirname, '../src/core/Authentication/translate/en.json');

const translationDir = path.join(__dirname, '../src/assets/locales/En.json');

fs.readdir(modulesDir, { withFileTypes: true }, (err, files) => {
  const translations = [mainTranslation];

  fs.readFile(authTranslation, 'utf8', async (err, data) => {
    if (data) {
      const AuthJSON = { Auth: JSON.parse(data) };
      translations.push(AuthJSON);
    }
  });

  for (const file of files) {
    if (file.isDirectory()) {
      const utilDir = path.join(modulesDir, `${file.name}/translate`);
      const jsonPath = path.join(utilDir, 'en.json');

      if (fs.existsSync(jsonPath)) {
        fs.readFile(jsonPath, 'utf8', async (err, data) => {
          const FileJSON = { [file.name]: JSON.parse(data) };

          translations.push(FileJSON);
          jsonConcat({ src: translations, dest: translationDir }, () => {
            console.log(`Adding ${file.name} Translation !`);
          });
        });
      }
    }
  }
});

const trans = require('@vitalets/google-translate-api')
    //
module.exports = {
    translate: async(text, locale) => {
        try {
            return (await trans(text, { to: locale })).text;
        } catch (e) {
            console.error(e);
        }
    }
};
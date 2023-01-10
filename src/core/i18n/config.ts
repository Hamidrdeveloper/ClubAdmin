import Germany from '@src/assets/locales/DE.json';
import English from '@src/assets/locales/En.json';
import Turkish from '@src/assets/locales/TR.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'ns1';
export const resources = { en: { ns1: English }, de: { ns1: Germany }, tr: { ns1: Turkish } } as const;

i18n.use(initReactI18next).init({ lng: localStorage.getItem('lang') || 'en', ns: [defaultNS], resources });

export default i18n;

import { resources, defaultNS } from '../core/i18n/config';

declare module 'react-i18next' {
  interface CustomTypeOptions {
      defaultNS: typeof defaultNS;
      resources: typeof resources['en'];
  }
}
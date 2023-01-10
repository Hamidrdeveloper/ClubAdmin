import { adminTheme } from '@src/core/Configs/ConfigureTheme';
import { Theme } from 'react-select';

import { GeneralTranslate, TranslateContext } from '../models';

export * from './api-builder.service';
export * from './query-builder.service';

export const normalizeTranslate = (translate?: GeneralTranslate[] | TranslateContext): TranslateContext => {
  const context = {};
  if (translate && Array.isArray(translate)) {
    for (let i = 0; i < translate.length; i++) {
      context[translate[i].locale || ''] = translate[i];
    }
  }
  return context;
};

export const reactSelectTheme = (theme: Theme): Theme => ({
  ...theme,
  spacing: {
    ...theme.spacing,
    baseUnit: 2.7,
    controlHeight: 30,
  },
  colors: {
    ...theme.colors,
    neutral50: '#bfbfbf',
    neutral20: '#d9d9d9',
    primary: adminTheme.colors.main,
  },
});

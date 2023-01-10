import { GeneralTranslate } from '@src/shared/models';
import React from 'react';

export const TranslateRenderer: React.FC<GeneralTranslate[]> = (translate) => {
  return <div>{translate.map((item) => item.locale).toString()}</div>;
};

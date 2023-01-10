import { GeneralTranslate } from '@src/shared/models';
import React, { FC } from 'react';

export const RenderTranslate: FC<GeneralTranslate[]> = (translate) => {
  return <div>{translate?.map((item) => item.locale).toString()}</div>;
};

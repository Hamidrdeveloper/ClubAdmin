import { intlDate } from '@src/shared/utils/engine.service';
import React, { FC } from 'react';

export const DateRenderer: FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as string).replace(/'-'/g, '/'))) : '-'}</span>
);

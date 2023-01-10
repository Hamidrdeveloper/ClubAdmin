import { intlDate } from '@src/shared/utils/engine.service';
import React from 'react';

const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export default DateRenderer;

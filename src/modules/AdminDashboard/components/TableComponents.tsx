import { intlDate } from '@src/shared/utils/engine.service';
import React from 'react';

export const DateRenderer: React.FC<Date> = (date) => {
  return <span>{date ? intlDate(new Date(String(date).replace(/-/g, '/'))) : '-'}</span>;
};

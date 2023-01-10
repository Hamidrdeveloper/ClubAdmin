import { intlDate } from '@src/shared/utils/engine.service';
import React, { FC } from 'react';

export const DateRenderer: FC<{ data: string | null}> = ({ data }) => {
  return <span>{data ? intlDate(new Date((data as string).replace(/'-'/g, '/'))) : ' - '}</span>;
};

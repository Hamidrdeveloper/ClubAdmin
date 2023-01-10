import { Env } from '@src/core';
import { RoundedImage } from '@src/shared/components';
import { intlDate } from '@src/shared/utils/engine.service';
import React, { FC, ReactElement } from 'react';

export const DateRenderer: FC<Date> = (date) => {
  return <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>;
};

export const ImageRenderer = (data: string): ReactElement => <RoundedImage image={Env.PURE_URL + data} />;

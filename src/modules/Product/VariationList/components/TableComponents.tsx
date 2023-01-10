import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';

export const TooltipRenderer: FC<string> = (name) => {
  return (
    <Tooltip placement="topLeft" title={name}>
      {name}
    </Tooltip>
  );
};

export const DateRenderer: FC<string> = (date) => {
  return <span>{date ? moment(date).format('DD.MM.yyyy') : '-'}</span>;
};

export const PointRenderer: FC<string> = (point) => {
  return <span>{point || '-'}</span>;
};

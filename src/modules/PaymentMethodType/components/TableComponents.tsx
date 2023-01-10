import { Tooltip } from 'antd';
import React, { ReactElement } from 'react';

export const ToolTipRenderer = (name: string): ReactElement => (
  <Tooltip placement="topLeft" title={name}>
    {name}
  </Tooltip>
);

export const Percent = (percent: number): ReactElement => <span>{percent}%</span>;

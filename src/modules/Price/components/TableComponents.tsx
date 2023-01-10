import { Tooltip } from 'antd';
import React, { FC } from 'react';

export const NameRenderer: FC<string> = (name) => {
  return (
    <Tooltip placement="topLeft" title={name}>
      {name}
    </Tooltip>
  );
};

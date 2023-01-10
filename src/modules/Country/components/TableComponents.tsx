import { Tooltip } from 'antd';
import React, { FC, ReactElement } from 'react';

export const ToolTipRenderer = (name: string): ReactElement => (
  <Tooltip placement="topLeft" title={name}>
    {name}
  </Tooltip>
);

export const DetailsToolTipRenderer: FC<{ data: string }> = ({ data }) => {
  if (data) {
    return ToolTipRenderer(data);
  } else {
    return (
      <span>
        <strong>-</strong>
      </span>
    );
  }
};

export const TaxRenderer = (tax: string): string => tax || '-';

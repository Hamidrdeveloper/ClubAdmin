import React, { FC } from 'react';

export const PercentRenderer: FC<number> = (percent) => (
  <span>
    <strong>{percent}%</strong>
  </span>
);

export const DetailsPercentRenderer: FC<{ data: number }> = ({ data }) => {
  if (typeof data === 'number') {
    return PercentRenderer(data);
  } else {
    return (
      <span>
        <strong>-</strong>
      </span>
    );
  }
};

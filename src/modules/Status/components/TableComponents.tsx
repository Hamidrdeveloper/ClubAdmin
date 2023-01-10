import React, { FC } from 'react';

export const RenderColor: FC<string> = (color) => {
  return (
    <div
      style={{
        width: 35,
        height: 20,
        border: '1px solid #f5f5f7',
        background: String(color).toLocaleLowerCase(),
      }}
    />
  );
};

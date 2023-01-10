import Text from 'antd/lib/typography/Text';
import React, { FC } from 'react';

export const BodyRenderer: FC<string> = (body) => {
  return (
    <Text
      ellipsis={{
        tooltip: body,
      }}
    >
      <strong>{body}</strong>
    </Text>
  );
};

export const DetailsBodyRenderer: FC<{ data: string }> = ({ data }) => {
  if (typeof data === 'string') {
    return BodyRenderer(data);
  } else {
    return (
      <span>
        <strong>-</strong>
      </span>
    );
  }
};

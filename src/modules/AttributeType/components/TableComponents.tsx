import { VariationCategory } from '@src/modules/VariationCategory';
import { Tag } from 'antd';
import React, { FC, ReactElement } from 'react';

export const PVC_Renderer = (datas: VariationCategory[]): ReactElement => {
  return (
    <span>
      {datas.map((tag) => (
        <Tag color={'geekblue'} key={tag.id}>
          {tag.name}
        </Tag>
      ))}
    </span>
  );
};

export const Details_PVC_Renderer: FC<{ data: VariationCategory[] }> = ({ data }) => {
  if (data) {
    return PVC_Renderer(data);
  } else {
    return <span>-</span>;
  }
};

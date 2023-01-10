import i18n from '@src/core/i18n/config';
import { Tag } from 'antd';
import React, { FC } from 'react';

export const TagRenderer: React.FC<boolean> = (used) => {
  return used ? (
    <Tag color="green">{i18n.t('Global.Yes')}</Tag>
  ) : (
    <Tag color="red">{i18n.t('Global.No')}</Tag>
  );
};

export const DetailsTagsRenderer: FC<{ data: boolean }> = ({ data }) => {
  if (typeof data === 'boolean') {
    return TagRenderer(data);
  } else {
    return <span>-</span>;
  }
};

import { EyeOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import i18n from '@src/core/i18n/config';
import { Space } from 'antd';
import React, { FC } from 'react';

export const FileRenderer: FC<string> = (file) => {
  if (file) {
    return (
      <a target="_blank" href={Env.PURE_URL + file}>
        <Space>
          <EyeOutlined />
          <span>{i18n.t('Availability.ShowFile')}</span>
        </Space>
      </a>
    );
  } else {
    return <span> - </span>;
  }
};

export const DetailsFileRenderer: FC<{ data: string }> = ({ data }) => {
  if (data) {
    return FileRenderer(data);
  } else {
    return <span> - </span>;
  }
};

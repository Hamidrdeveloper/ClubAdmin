/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import { Space, Tooltip } from 'antd';
import React, { FC } from 'react';

export const LinkRenderer: FC<string> = (link) => {
  return (
    <Tooltip title={link}>
      <a target="_blank" href={link.includes('https') ? link : `https://${link}`}>
        <Space>
          <LinkOutlined />
          <span>Proceed To Link</span>
        </Space>
      </a>
    </Tooltip>
  );
};

export const FileRenderer: FC<string> = (file) => {
  if (file) {
    return (
      <a target="_blank" href={ file}>
        <Space>
          <EyeOutlined />
          <span>Show File</span>
        </Space>
      </a>
    );
  } else {
    return <span>-</span>;
  }
};

export const DetailsFileRenderer: FC<{ data: string }> = ({ data }) => {
  return FileRenderer(data);
};

export const DetailsLinkRenderer: FC<any> = ({ data }) => {
  if (data) {
    return LinkRenderer(data);
  } else {
    return <span>-</span>;
  }
};

import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { File } from '@src/modules/Download/model/DownloadCategory.entity';
import { intlDate } from '@src/shared/utils/engine.service';
import { Button, Typography } from 'antd';
import React, { FC } from 'react';

export const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const PreviewButtonRenderer: FC<string> = (filePath) => {
  const url: string = Env.PURE_URL + filePath;
  const onPreviewButtonClickHandler = () => {
    window.open(url, '_blank');
  };

  return (
    <Button type="dashed" onClick={onPreviewButtonClickHandler}>
      {i18n.t('ExportLogs.Preview')}
    </Button>
  );
};

export const FileNameRenderer: FC<{ data: File }> = ({ data }) => {
  return (
    <>
      {data?.name ? (
        <Typography.Paragraph strong ellipsis={{ rows: 1 }} copyable={{ text: data?.name }}>
          {data?.name}
        </Typography.Paragraph>
      ) : (
        <span>-</span>
      )}
    </>
  );
};

export const FileExtensionRenderer: FC<{ data: File }> = ({ data }) => {
  return <Typography.Paragraph strong>{data?.extension ?? '-'}</Typography.Paragraph>;
};

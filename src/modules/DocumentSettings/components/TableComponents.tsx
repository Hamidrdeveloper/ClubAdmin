import { EyeOutlined } from '@ant-design/icons';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { Button, Space, message } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { DocumentSettingsModel } from '../model/DocumentSettings.entity';
import { getDocumentSettingPreviewLink, setDocumentSettingToDefault } from '../services/documentSettings';

export const FileRenderer: FC<string> = (file) => {
  const { t } = useTranslation();
  if (file) {
    return (
      <a target="_blank" href={Env.PURE_URL + file}>
        <Space>
          <EyeOutlined />
          <span>{t('DocumentSettings.ShowFile')}</span>
        </Space>
      </a>
    );
  } else {
    return <span>-</span>;
  }
};

export const PreviewButtonRenderer: FC<number> = (docSettingId: number, allData: DocumentSettingsModel) => {
  // const { t } = useTranslation();

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPreviewButtonClickHandler = () => {
    // setIsLoading(true);
    getDocumentSettingPreviewLink(docSettingId ?? allData.id).then((url) => window.open(url, '_blank'));
    // .finally(() => setIsLoading(false));
  };

  return (
    <Button type="dashed" onClick={onPreviewButtonClickHandler}>
      {i18n.t('DocumentSettings.Preview')}
    </Button>
  );
};

export const ResetToDefaultButtonRenderer: FC<number> = (
  docSettingId: number,
  allData: DocumentSettingsModel,
) => {
  const id = docSettingId ?? allData.id;

  const { mutate, isLoading } = useMutation(setDocumentSettingToDefault);

  const resetToDefaultHandler = () => {
    mutate(id, {
      onSuccess: () => {
        message.success(i18n.t('DocumentSettings.DocumentSettingsHasBeenSetToDefault'));
      },
    });
  };

  return (
    <Button type="dashed" onClick={resetToDefaultHandler} loading={isLoading}>
      {i18n.t('DocumentSettings.ResetToDefault')}
    </Button>
  );
};

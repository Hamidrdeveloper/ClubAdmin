import i18n from '@src/core/i18n/config';
import { Button, message } from 'antd';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import { exportData } from '../service/Setting.service';

export const ExportBtn: FC<number> = (_id, allData) => {
  const id = _id ?? allData['id'];
  const { isLoading, mutate } = useMutation(exportData);

  const onExportBtnClick = () => {
    mutate(id, {
      onSuccess: (data) => {
        message.success(data);
      },
    });
  };

  return (
    <Button loading={isLoading} onClick={onExportBtnClick}>
      {i18n.t('ExportSettings.Export')}
    </Button>
  );
};

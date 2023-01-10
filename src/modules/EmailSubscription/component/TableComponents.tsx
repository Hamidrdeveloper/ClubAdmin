import { usePageLayout } from '@src/shared/components';
import { Button } from 'antd';
import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { EmailSubscriptionModel } from '../model/emailSubscription.entity';
import unsubscribeEmail from '../service/unSubscribe.service';

export const UnsubscribeButtonRenderer: FC<void> = (_, allData: EmailSubscriptionModel): ReactElement => {
  const { email } = allData;
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(unsubscribeEmail);

  const { setRequestUpdate } = usePageLayout();

  const onUnSubscribeClickHandler = () => {
    mutate(email, {
      onSuccess: () => {
        setRequestUpdate(true);
      },
    });
  };

  return (
    <Button type="dashed" onClick={onUnSubscribeClickHandler} loading={isLoading}>
      {t('EmailSubscription.Unsubscribe')}
    </Button>
  );
};

import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoginDetailUpsert from '../container/LoginDetailUpsert';
import { LoginDetailContext } from '../model/email.entity';
import { getLoginDetail } from '../services/email.service';

export default function LoginDetailPage(): ReactElement {
  const [data, setData] = useState<LoginDetailContext>();
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      breadcrumbName: i18n.t('Email.Title', { count: 2 }),
      path: `/admin/email/*`,
    },
    {
      breadcrumbName: i18n.t('Email.Field.LoginDetail'),
      path: `/admin/email/*`,
    },
  ];

  useEffect(() => {
    setPending(true);
    getLoginDetail()
      .then((data: LoginDetailContext) => {
        setData(data);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />

      <PageLayout.Panel>
        {isPending ? (
          <Loader title={t('Email.LoginDetail.Loader')} />
        ) : (
          <LoginDetailUpsert singleData={data} />
        )}
      </PageLayout.Panel>
    </div>
  );
}

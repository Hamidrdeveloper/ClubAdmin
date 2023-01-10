import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InfoServiceUpsert from '../container/InfoServiceUpsert';
import { InfoServiceContext } from '../model/email.entity';
import { getInfoService } from '../services/email.service';

export default function InfoServicePage(): ReactElement {
  const [data, setData] = useState<InfoServiceContext>();
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      breadcrumbName: i18n.t('Email.Title', { count: 1 }),
      path: `/admin/email/*`,
    },
    {
      breadcrumbName: i18n.t('Email.Field.InfoService'),
      path: `/admin/email/*`,
    },
  ];

  useEffect(() => {
    setPending(true);
    getInfoService()
      .then((data: InfoServiceContext) => {
        setData(data);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />

      <PageLayout.Panel>
        {isPending ? (
          <Loader title={t('Email.InfoService.Loader')} />
        ) : (
          <InfoServiceUpsert singleData={data} />
        )}
      </PageLayout.Panel>
    </div>
  );
}

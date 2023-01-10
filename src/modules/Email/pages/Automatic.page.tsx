import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AutomaticUpsert from '../container/AutomaticUpsert';
import { Automatic } from '../model/email.entity';
import { getAutomatics } from '../services/email.service';

export default function AutomaticPage(): ReactElement {
  const [data, setData] = useState<Automatic[]>([]);
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      breadcrumbName: i18n.t('Email.Title', { count: 1 }),
      path: `/admin/email/*`,
    },
    {
      breadcrumbName: i18n.t('Email.Field.Automatics'),
      path: `/admin/email/*`,
    },
  ];

  useEffect(() => {
    setPending(true);
    getAutomatics()
      .then((notice: Automatic[]) => {
        setData(notice);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />

      <PageLayout.Panel>
        {isPending ? <Loader title={t('Email.Automatic.Loader')} /> : <AutomaticUpsert data={data} />}
      </PageLayout.Panel>
    </div>
  );
}

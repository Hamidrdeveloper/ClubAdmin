import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewsLetterUpsert from '../container/NewsLetterUpsert';
import { NewsLetterContext } from '../model/email.entity';
import { getNewsLetter } from '../services/email.service';

export default function NewsLetterPage(): ReactElement {
  const [data, setData] = useState<NewsLetterContext>();
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      breadcrumbName: t('Email.Title', { count: 2 }),
      path: `/admin/email/*`,
    },
    {
      breadcrumbName: t('Email.Field.NewsLetter'),
      path: `/admin/email/*`,
    },
  ];

  useEffect(() => {
    setPending(true);
    getNewsLetter()
      .then((data: NewsLetterContext) => setData(data))
      .finally(() => setPending(false));
  }, []);

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />

      <PageLayout.Panel>
        {isPending ? <Loader title={t('Email.NewsLetter.Loader')} /> : <NewsLetterUpsert singleData={data} />}
      </PageLayout.Panel>
    </div>
  );
}

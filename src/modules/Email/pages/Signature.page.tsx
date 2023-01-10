import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SignatureUpsert from '../container/SignatureUpsert';
import { SignatureContext } from '../model/email.entity';
import { getSignature } from '../services/email.service';

export default function SignaturePage(): ReactElement {
  const [data, setData] = useState<SignatureContext>();
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const breadcrumbItems = [
    {
      breadcrumbName: i18n.t('Email.Title', { count: 1 }),
      path: `/admin/email/*`,
    },
    {
      breadcrumbName: i18n.t('Email.Field.Signature'),
      path: `/admin/email/*`,
    },
  ];

  useEffect(() => {
    setPending(true);
    getSignature()
      .then((data: SignatureContext) => {
        setData(data);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />

      <PageLayout.Panel>
        {isPending ? <Loader title={t('Email.Signature.Loader')} /> : <SignatureUpsert singleData={data} />}
      </PageLayout.Panel>
    </div>
  );
}

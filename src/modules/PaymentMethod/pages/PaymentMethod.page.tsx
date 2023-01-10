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
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentMethod } from '../model/paymentMethod.entity';
import PaymentMethodModule from '../PaymentMethod.module';

export default function paymentMethodPage(): ReactElement {
  const { t } = useTranslation();
  const paymentMethodModule = new PaymentMethodModule();

  return (
    <PageLayout<PaymentMethod> module={paymentMethodModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew  />

        <Panel.ListView
        updateLink="upsert"
        hasUpdate={true}
          tableScroll={{ x: 992, y: 475 }}
          module={paymentMethodModule}
         
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentMethodType } from '../model/paymentMethodType.entity';
import PaymentMethodTypeModule from '../PaymentMethodType.module';

export default function PaymentTermManagePage(): ReactElement {
  const { t } = useTranslation();
  const paymentMethodTypeModule = new PaymentMethodTypeModule();

  return (
    <PageLayout<PaymentMethodType> module={paymentMethodTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          hasUpdate={false}
          module={paymentMethodTypeModule}
          togglers={[
            {
              url: 'active',
              sorter: true,
              dataIndex: 'is_active',
              title: t('Global.Active'),
            },
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

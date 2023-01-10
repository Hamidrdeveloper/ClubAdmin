import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import PaymentTermModule from '../PaymentTerm.module';
import { PaymentTerm } from '../model/paymentTerm.entity';

export default function PaymentTermManagePage(): ReactElement {
  const paymentTermModule = new PaymentTermModule();

  return (
    <PageLayout<PaymentTerm> module={paymentTermModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView  module={paymentTermModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

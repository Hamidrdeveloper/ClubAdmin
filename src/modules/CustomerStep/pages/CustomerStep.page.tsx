import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CustomerStepModule from '../CustomerStep.module';
import { CustomerStepModel } from '../model/CustomerStep.entity';

export default function CustomerStepPage(): ReactElement {
  const customerStepModule = new CustomerStepModule();

  return (
    <PageLayout<CustomerStepModel> module={customerStepModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView module={customerStepModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

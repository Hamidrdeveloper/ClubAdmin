import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Supplier } from '../model/supplier.entity';
import SupplierModule from '../Supplier.module';

export default function SupplierPage(): ReactElement {
  const supplierModule = new SupplierModule();

  return (
    <PageLayout<Supplier> module={supplierModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch newLink="manage" />

        <Panel.ListView module={supplierModule} updateLink="manage" />
      </PageLayout.Panel>
    </PageLayout>
  );
}

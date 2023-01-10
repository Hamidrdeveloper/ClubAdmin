import { AuthContext } from '@src/core';
import { PageLayout, Panel } from '@src/shared/components';
import { ApiBuilder } from '@src/shared/utils';
import React, { ReactElement, useContext } from 'react';

import { PurchaseSalePure } from '../../model/purchase.entity';
import PurchaseModule from '../../Purchase.module';

export default function PurchasePage(): ReactElement {
  const module = new PurchaseModule();
  const { role } = useContext(AuthContext);
  return (
    <PageLayout<PurchaseSalePure> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={role !== 'partner'} newLink="" noListView />

        <Panel.ListView
          module={module}
          updateLink={module.breadcrumbItems[0].path}
          tableScroll={{ x: 1450, y: 750 }}
          params={{ orderBy: { id: 'DESC' } }}
          customEntities={{
            getAll: new ApiBuilder<PurchaseSalePure>('order/purchases/list', module.title[0]),
          }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

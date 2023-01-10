import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import OrderOfferModule from '../OrderOffer.module';
import { OrderOffer } from '../model/orderOffer.entity';

export default function OrderOfferPage(): ReactElement {
  const orderOfferModule = new OrderOfferModule();

  return (
    <PageLayout<OrderOffer> module={orderOfferModule}
    >
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView  
          tableScroll={{ x: 3250, y: 432 }}
        module={orderOfferModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

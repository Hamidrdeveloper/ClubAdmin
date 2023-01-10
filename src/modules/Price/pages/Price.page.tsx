import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Price } from '../model/price.entity';
import PriceModule from '../Price.module';

export default function PricePage(): ReactElement {
  const priceModule = new PriceModule();

  return (
    <PageLayout<Price> module={priceModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView tableScroll={{ x: 1320, y: 700 }} module={priceModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

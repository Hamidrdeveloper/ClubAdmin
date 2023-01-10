import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { PriceType } from '../model/priceType.entity';
import PriceTypeModule from '../PriceType.module';

export default function CurrencyPage(): ReactElement {
  const priceTypeModule = new PriceTypeModule();

  return (
    <PageLayout<PriceType> module={priceTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew  />

        <Panel.ListView module={priceTypeModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

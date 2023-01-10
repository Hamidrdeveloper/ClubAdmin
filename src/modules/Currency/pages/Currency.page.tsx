import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CurrencyModule from '../Currency.module';
import { Currency } from '../model/currency.entity';

export default function CurrencyPage(): ReactElement {
  const currencyModule = new CurrencyModule();

  return (
    <PageLayout<Currency> module={currencyModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView hasActive hasDefault tableScroll={{ x: 992, y: 475 }} module={currencyModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

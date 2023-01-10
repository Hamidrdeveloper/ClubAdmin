import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Stock } from '../model';
import StockModule from '../Stock.module';

function StockPage(): ReactElement {
  const stockModule = new StockModule();

  return (
    <PageLayout<Stock> module={stockModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew newLink="manage" hasSearch />

        <Panel.ListView updateLink="manage" module={stockModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

export default StockPage;

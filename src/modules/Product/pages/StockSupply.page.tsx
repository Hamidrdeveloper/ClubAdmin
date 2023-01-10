import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { SupplyModule } from '../Stock.module';

const StockSupplyPage = (): ReactElement => {
  const module = new SupplyModule();

  // TODO unknown => Supply
  return (
    <PageLayout<unknown> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView module={module} noId />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default StockSupplyPage;

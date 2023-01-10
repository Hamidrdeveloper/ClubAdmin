import { PageLayout } from '@src/shared/components';
import React, { ReactElement } from 'react';

import IncomingItemsUpsert from '../../containers/IncomingItemsUpsert';
import { IncomingItems } from '../../model/incomingItems';
import { IncomingItemsModule } from '../../Stock.module';

const IncomingItemsTab = (): ReactElement => {
  return (
    <PageLayout<IncomingItems> module={new IncomingItemsModule()}>
      <PageLayout.Panel>
        <IncomingItemsUpsert />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default IncomingItemsTab;

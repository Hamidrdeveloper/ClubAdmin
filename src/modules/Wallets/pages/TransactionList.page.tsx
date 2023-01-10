import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { TransactionModel } from '../model/Transaction.entity';
import TransactionModule from '../Transactions.module';

const TransactionListPage = (): ReactElement => {
  const module = new TransactionModule();

  return (
    <PageLayout<TransactionModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} noDescription />

        <Panel.ListView module={module} hasUpdate={false} />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default TransactionListPage;

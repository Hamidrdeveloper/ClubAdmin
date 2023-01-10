import { TransactionModel } from '@src/modules/Wallets/model/Transaction.entity';
import TransactionModule from '@src/modules/Wallets/Transactions.module';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

type Props = {
  userId: number | string;
  walletId: number | string;
};
const TransactionHistoryPage = ({ walletId, userId }: Partial<Props>): ReactElement => {
  const module = new TransactionModule();

  return (
    <PageLayout<TransactionModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} noDescription />

        <Panel.ListView
          dontNavigate
          module={module}
          hasUpdate={false}
          params={{ walletId, holderId: userId }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default TransactionHistoryPage;

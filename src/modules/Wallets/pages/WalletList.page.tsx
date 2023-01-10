import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { WalletListModel } from '../model/WalletList.entity';
import WalletModule from '../WalletList.module';

const WalletListPage = (): ReactElement => {
  const module = new WalletModule();

  return (
    <PageLayout<WalletListModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} noDescription />

        {/* NOTE: walletId and userId are the same */}
        <Panel.ListView module={module} hasUpdate={false} noId />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default WalletListPage;

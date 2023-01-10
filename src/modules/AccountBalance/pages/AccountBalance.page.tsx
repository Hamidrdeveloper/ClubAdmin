import { AccountBalanceModule } from '@src/modules/AccountBalance/AccountBalance.module';
import { AccountBalanceModel } from '@src/modules/User/model/accountBalance';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

export default function AccountBalancePage(): ReactElement {
  const module = new AccountBalanceModule();

  return (
    <PageLayout<AccountBalanceModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} noDescription />

        <Panel.ListView hasUpdate={false} module={module} params={{ orderBy: { id: 'DESC' } }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

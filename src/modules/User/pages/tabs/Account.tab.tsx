import { AccountBalanceModule } from '@src/modules/AccountBalance/AccountBalance.module';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import { AccountBalanceModel } from '../../model/accountBalance';

export default function AccountBalanceTab(): ReactElement {
  const { user_id: id } = useParams();
  if (!id) return <Fallback />;

  const module = new AccountBalanceModule(id ?? undefined);

  return (
    <PageLayout<AccountBalanceModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} noDescription dontNavigate />

        <Panel.ListView dontNavigate hasUpdate={false} module={module} params={{ orderBy: { id: 'DESC' } }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

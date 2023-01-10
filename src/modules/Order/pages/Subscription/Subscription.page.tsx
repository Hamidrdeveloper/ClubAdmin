import { AuthContext } from '@src/core';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement, useContext } from 'react';

import SubscriptionModule from '../../Subscription.module';
import { SubscriptionSalePure } from '../..';

export default function SubscriptionPage(): ReactElement {
  const module = new SubscriptionModule();
  const { role } = useContext(AuthContext);
  return (
    <PageLayout<SubscriptionSalePure> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={role !== 'partner'} newLink="" noListView />

        <Panel.ListView
          module={module}
          updateLink={module.breadcrumbItems[0].path}
          tableScroll={{ x: 1450, y: 750 }}
          params={{ orderBy: { id: 'DESC' } }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

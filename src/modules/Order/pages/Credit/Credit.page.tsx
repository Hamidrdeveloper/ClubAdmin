import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CreditModule from '../../Credit.module';
import { CreditSalePure } from '../..';

export default function CreditPage(): ReactElement {
  const module = new CreditModule();

  return (
    <PageLayout<CreditSalePure> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch noListView />

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

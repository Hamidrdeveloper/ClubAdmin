import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { PartnerSalePure } from '../../model/partner.entity';
import PartnerModule from '../../Partner.module';

export default function PartnerPage(): ReactElement {
  const module = new PartnerModule();

  return (
    <PageLayout<PartnerSalePure> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch newLink="" noListView />

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

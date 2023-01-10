import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { PackingType } from '../model/packingType.entity';
import PackingTypeModule from '../PackingType.module';

export default function PackingTypePage(): ReactElement {
  const packingTypeModule = new PackingTypeModule();

  return (
    <PageLayout<PackingType> module={packingTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView module={packingTypeModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

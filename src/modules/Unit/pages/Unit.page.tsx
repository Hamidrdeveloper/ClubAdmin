import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Unit } from '../model/unit.entity';
import UnitModule from '../Unit.module';

export default function UnitPage(): ReactElement {
  const unitModule = new UnitModule();

  return (
    <PageLayout<Unit> module={unitModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew={false} hasSearch />

        <Panel.ListView module={unitModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

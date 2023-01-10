import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CustomTariffModule from '../CustomTariff.module';
import { CustomTariff } from '../model/customTariff.entity';

export default function CustomTariffPage(): ReactElement {
  const customTariffModule = new CustomTariffModule();

  return (
    <PageLayout<CustomTariff> module={customTariffModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch hasDelete />

        <Panel.ListView module={customTariffModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

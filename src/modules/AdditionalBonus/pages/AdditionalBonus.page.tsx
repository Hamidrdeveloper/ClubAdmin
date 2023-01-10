import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import AdditionalBonusModule from '../AdditionalBonus.module';
import { AdditionalBonus } from '../model/additionalBonus.entity';

export default function AdditionalBonusPage(): ReactElement {
  const additionalBonusModule = new AdditionalBonusModule();

  return (
    <PageLayout<AdditionalBonus> module={additionalBonusModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView module={additionalBonusModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

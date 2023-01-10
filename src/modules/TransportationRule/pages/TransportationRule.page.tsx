import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { TransportationRule } from '../model/transportationrule.entity';
import TransportationRuleModule from '../TransportationRule.module';

export default function TransportationRulePage(): ReactElement {
  const transportationRuleModule = new TransportationRuleModule();

  return (
    <PageLayout<TransportationRule> module={transportationRuleModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView module={transportationRuleModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

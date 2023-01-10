import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { SpecialConditionCareerStepModel } from '../model/SpecialConditionCareerStep.entity';
import SpecialConditionCareerStepModule from '../SpecialConditionCareerStep.module';

export default function SpecialConditionCareerStepPage(): ReactElement {
  const module = new SpecialConditionCareerStepModule();

  return (
    <PageLayout<SpecialConditionCareerStepModel> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew noDescription />

        <Panel.ListView module={module} hasUpdate />
      </PageLayout.Panel>
    </PageLayout>
  );
}

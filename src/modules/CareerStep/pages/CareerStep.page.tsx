import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CareerStepModule from '../CareerStep.module';
import { CareerStep } from '../model/careerstep.entity';

export default function CareerStepPage(): ReactElement {
  const careerStepModule = new CareerStepModule();
  return (
    <PageLayout<CareerStep> module={careerStepModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView module={careerStepModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

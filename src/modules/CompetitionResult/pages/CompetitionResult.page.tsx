import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CompetitionResultModule from '../CompetitionResult.module';
import { CompetitionResultModel } from '../model/competitionResult.entity';

export default function CompetitionResultPage(): ReactElement {
  const module = new CompetitionResultModule();

  return (
    <PageLayout<CompetitionResultModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch noDescription />

        <Panel.ListView module={module} hasUpdate={false} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

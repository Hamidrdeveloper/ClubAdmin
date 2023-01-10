import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import DocumentSettingsModule from '../DocumentSettings.module';
import { DocumentSettingsModel } from '../model/DocumentSettings.entity';

export default function DocumentSettingsPage(): ReactElement {
  const module = new DocumentSettingsModule();

  return (
    <PageLayout<DocumentSettingsModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="./upsert" noDescription />

        <Panel.ListView module={module} hasUpdate updateLink="./upsert" />
      </PageLayout.Panel>
    </PageLayout>
  );
}

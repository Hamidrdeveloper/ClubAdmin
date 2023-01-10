import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import ExportTypeModule from '../ExportType.module';
import { ExportTypeModel } from '../model/ExportsTypes.entity';

export default function ExportTypePage(): ReactElement {
  const module = new ExportTypeModule();

  return (
    <PageLayout<ExportTypeModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView updateLink="edit" module={module} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

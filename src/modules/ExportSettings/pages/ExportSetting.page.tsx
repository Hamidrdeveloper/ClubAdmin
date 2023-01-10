import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import ExportSettingModule from '../ExportSetting.module';
import { ExportSettingModel } from '../model/ExportsSettings.entity';

export default function ExportSettingPage(): ReactElement {
  const module = new ExportSettingModule();

  return (
    <PageLayout<ExportSettingModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch noDescription />

        <Panel.ListView module={module} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

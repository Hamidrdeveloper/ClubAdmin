import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import ExportLogsModule from '../ExportLogs.module';
import { ExportLogsModel } from '../model/ExportLogs.entity';

type Props = { exportSettginId?: string };
export default function ExportLogPage({ exportSettginId }: Props): ReactElement {
  const module = new ExportLogsModule();

  return (
    <PageLayout<ExportLogsModel> module={module}>
      {!exportSettginId && <PageLayout.Breadcrumb />}
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} />

        <Panel.ListView
          module={module}
          hasUpdate={false}
          dontNavigate={!!exportSettginId}
          params={{ orderBy: { id: 'DESC' }, exportDataSettingId: exportSettginId }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

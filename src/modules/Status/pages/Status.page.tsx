import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Status } from '../model/status.entity';
import StatusModule from '../Status.module';

export default function StatusPage(): ReactElement {
  const statusModule = new StatusModule();

  return (
    <PageLayout<Status> module={statusModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView
          module={statusModule}
          tableScroll={{ x: 2000, y: 475 }}
          params={{ orderBy: { number: 'ASC' } }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

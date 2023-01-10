import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import LoginLogsModule from '../LoginLogs.module';
import { LoginLogs } from '../model/loginLogs.entity';

function LoginLogsPage(): ReactElement {
  const loginlogsModule = new LoginLogsModule();

  return (
    <PageLayout<LoginLogs> module={loginlogsModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch noDescription />

        <Panel.ListView hasUpdate={false} params={{ orderBy: { id: 'DESC' } }} module={loginlogsModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

export default LoginLogsPage;

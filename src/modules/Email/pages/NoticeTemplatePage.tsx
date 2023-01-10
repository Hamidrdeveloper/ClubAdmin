import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import EmailModule from '../Email.module';
import { EmailTemplates } from '../model/email.entity';

export default function EmailPage(): ReactElement {
  const module = new EmailModule();

  return (
    <PageLayout<EmailTemplates> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch newLink="/admin/email/template/upsert" noListView noDescription />

        <Panel.ListView module={module} updateLink={'/admin/email/template/upsert'} />
      </PageLayout.Panel>
    </PageLayout>
  );
}

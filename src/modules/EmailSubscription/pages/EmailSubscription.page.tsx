import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import EmailSubscriptionModule from '../EmailSubscription.module';
import { EmailSubscriptionModel } from '../model/emailSubscription.entity';

export default function EmailSubscriptionPage(): ReactElement {
  const module = new EmailSubscriptionModule();

  return (
    <PageLayout<EmailSubscriptionModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink={'upsert'} noDescription />

        <Panel.ListView
          hasUpdate={false}
          module={module}
          togglers={[{ dataIndex: 'is_active', url: 'active', title: i18n.t('Global.IsActive') }]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { UserType } from '../model/userType.entity';
import UserTypeModule from '../UserType.module';

export default function UserTypePage(): ReactElement {
  const userTypeModule = new UserTypeModule();

  return (
    <PageLayout<UserType> module={userTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView
          module={userTypeModule}
          tableScroll={{ x: 2000, y: 475 }}
          togglers={[
            { url: 'is-generation', title: i18n.t('Global.IsGeneration'), dataIndex: 'is_generation' },
            { url: 'is-partner', title: i18n.t('Global.IsPartner'), dataIndex: 'is_partner' },
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

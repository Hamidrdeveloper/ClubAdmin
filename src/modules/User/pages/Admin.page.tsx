import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { User } from '../model/personalInfo';
import UserModule from '../User.module';

export default function AdminPage(): ReactElement {
  const role = 'admin';
  const userModule = new UserModule(role);

  return (
    <PageLayout<User> module={userModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew newLink={`../manage/${role}`} hasSearch />

        <Panel.ListView
          updateLink={`../manage/${role}`}
          tableScroll={{ x: 1600, y: 750 }}
          module={userModule}
          params={{ role }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

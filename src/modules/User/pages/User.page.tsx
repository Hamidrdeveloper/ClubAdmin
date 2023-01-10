import { PageLayout, Panel } from '@src/shared/components';
import { ApiBuilder } from '@src/shared/utils';
import React, { ReactElement } from 'react';

import { User } from '../model/personalInfo';
import UserModule from '../User.module';

export default function UserPage(): ReactElement {
  // a.k.a - customer
  const role = 'user';

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
          customEntities={{ getAll: new ApiBuilder<User>('customers', userModule.title[0]) }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Role } from '../model/role.entity';
import RoleModule from '../Role.module';

export default function RolePage(): ReactElement {
  const roleModule = new RoleModule();

  return (
    <PageLayout<Role> module={roleModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header />

        <Panel.ListView
          module={roleModule}
          tableScroll={{ x: 992, y: 475 }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
 
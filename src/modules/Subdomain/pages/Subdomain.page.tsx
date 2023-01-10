import { AuthContext } from '@src/core';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Subdomain } from '../model/Subdomain.entity';
import SubdomainModule from '../Subdomain.module';

export default function SubdomainPage(): ReactElement {
  const subdomainModule = new SubdomainModule();

  const { loggedInUserRole } = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <PageLayout<Subdomain> module={subdomainModule}>
      {loggedInUserRole !== 'partner' && <PageLayout.Breadcrumb />}
      <PageLayout.Panel>
        <Panel.Header hasNew={loggedInUserRole !== 'partner'} hasSearch hasDelete noDescription />

        <Panel.ListView
          module={subdomainModule}
          updateLink="/admin/partner/subdomain/upsert"
          togglers={
            // if we the logged in user is partner remove active and approve togglers
            loggedInUserRole !== 'partner'
              ? [
                  {
                    url: 'active',
                    title: t('Global.IsActive'),
                    dataIndex: 'is_active',
                  },
                  {
                    url: 'approved',
                    title: t('Global.IsApproved'),
                    dataIndex: 'is_approved',
                  },
                ]
              : []
          }
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

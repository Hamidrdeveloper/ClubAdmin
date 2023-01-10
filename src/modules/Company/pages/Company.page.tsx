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
import React, { ReactElement, useEffect } from 'react';

import CompanyModule from '../Company.module';
import { CompanyModel } from '../model/company.entity';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CompanyPage(): ReactElement {
  const module = new CompanyModule();
  const location = useLocation();
   useEffect(() => {
    const data = location.state.data;
    console.log(data);
    
   }, [])
  return (
    <PageLayout<CompanyModel> module={module}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew />

        <Panel.ListView
          hasUpdate
          hasDefault
          params={{ isMain: true }}
          module={module}
          togglers={[
            { dataIndex: 'is_active', title: i18n.t('Global.IsActive'), url: 'active' },
            { dataIndex: 'is_main', title: i18n.t('Company.IsMain'), url: 'main' },
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

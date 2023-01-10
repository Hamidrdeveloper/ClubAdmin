import { Subdomain } from '@src/modules/Subdomain';
import SubdomainModule from '@src/modules/Subdomain/Subdomain.module';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

type Props = {
  onNew: () => void;
  onUpdate: (subdomainId: number) => void;
};
export default function SubdomainListPage({ onNew, onUpdate }: Props): ReactElement {
  const subdomainModule = new SubdomainModule();
  const { company_id } = useParams();

  const { t } = useTranslation();

  return (
    <PageLayout<Subdomain> module={subdomainModule}>
      <PageLayout.Panel>
        <Panel.Header onNew={onNew} hasNew hasSearch hasDelete noDescription dontNavigate />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          onUpdate={onUpdate}
          module={subdomainModule}
          params={{ companyId: company_id }}
          togglers={[
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
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

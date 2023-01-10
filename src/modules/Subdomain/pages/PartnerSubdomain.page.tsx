import { AuthContext } from '@src/core';
import { Partner } from '@src/modules/Partner';
import { PageLayout, Panel } from '@src/shared/components';
import { notification } from 'antd';
import axios from 'axios';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PartnerSubdomainModal from '../components/PartnerSubdomainModal';
import { Subdomain } from '../model/Subdomain.entity';
import PartnerSubdomainModule from '../PartnerSubdomain.module';

type props = {
  partner: Partner | undefined;
};
export default function PartnerSubdomainPage({ partner }: props): ReactElement {
  const partnerSubdomainModule = new PartnerSubdomainModule();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [subdomainId, setSubdomainId] = useState<number | undefined>(undefined);
  const [canCreateNew, setCanCreateNew] = useState<boolean>(true);
  const { loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get<{ data: Subdomain[] }>(`/subdomains?partnerId=${partner?.id}`)
      .then((res) => {
        if ((res.data?.data).length >= 1) {
          setCanCreateNew(false);
        }
      })
      .catch((error) => {
        notification.error(error.message);
      });
  });
  const { t } = useTranslation();

  return (
    <PageLayout<Subdomain> module={partnerSubdomainModule}>
      <PageLayout.Panel>
        <Panel.Header
          hasSearch
          dontNavigate
          noDescription
          hasDelete={loggedInUserRole !== 'partner'}
          hasNew={canCreateNew ? loggedInUserRole === 'partner' : loggedInUserRole !== 'partner'}
          onNew={() => {
            setSubdomainId(undefined);
            setModalVisible(true);
          }}
        />

        <Panel.ListView
          dontNavigate
          updateLink=""
          module={partnerSubdomainModule}
          params={{ partnerId: partner?.id }}
          hasUpdate={false}
          onUpdate={(id) => {
            setModalVisible(true);
            setSubdomainId(id);
          }}
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
      {isModalVisible && (
        <PartnerSubdomainModal
          setModalVisible={setModalVisible}
          isModalVisible={isModalVisible}
          subdomainId={subdomainId}
          setCanCreateNew={setCanCreateNew}
        />
      )}
    </PageLayout>
  );
}

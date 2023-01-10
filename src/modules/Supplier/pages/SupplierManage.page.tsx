import { PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import { atom, useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SupplierModule from '../Supplier.module';
import { AddressPage, BankDetailsPage, DocumentsPage, PasswordSettingPage, PersonalInfoPage } from './tabs';
import { Supplier } from '..';

export const userIdAtom = atom<number | undefined>(undefined);

export default function UserManagePage(): ReactElement {
  const { t } = useTranslation();
  const { supplier_id: id } = useParams();
  const supplierModule = new SupplierModule();

  const [activeTab, setActiveTab] = useState('1');
  const [tabsAreDisable, disableTabs] = useState<boolean>(true);

  const [, setUserId] = useAtom(userIdAtom);

  const query = useQuery(`supplier-${id}`, () => (id ? supplierModule.apiService.getOne(+id) : undefined));
  useEffect(() => {
    if (query.isFetched && query.isSuccess) {
      // enable tabs only when supplier is a user
      const isUser = query.data?.is_user;
      disableTabs(!isUser);

      // since in supplier tabs we can not get userId from parameters we are using global state (atoms)
      if (isUser) {
        setUserId(query.data?.people?.user?.id);
      } else setUserId(undefined);
    }
  }, [query]);

  const routes = [
    ...supplierModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${supplierModule.title[0]} - ${id}` : `New ${supplierModule.title[0]}`,
    },
  ];

  return (
    <PageLayout<Supplier> module={supplierModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <TabsContainer>
        <Tabs
          type="card"
          defaultActiveKey="1"
          className="supplier-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <Tabs.TabPane key={'1'} tab={t('Supplier.CompanyInfo.TabTitle')}>
            <PersonalInfoPage queryResult={query} />
          </Tabs.TabPane>

          <Tabs.TabPane key={'2'} tab={t('Supplier.PasswordSetting.TabTitle')} disabled={tabsAreDisable}>
            <PasswordSettingPage queryResult={query} />
          </Tabs.TabPane>

          <Tabs.TabPane key={'3'} tab={t('Supplier.Address.TabTitle')} disabled={!id}>
            <AddressPage queryResult={query} />
          </Tabs.TabPane>

          <Tabs.TabPane key={'4'} tab={t('Supplier.BankDetails.TabTitle')} disabled={tabsAreDisable}>
            <BankDetailsPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'5'} tab={t('Supplier.Documents.TabTitle')} disabled={tabsAreDisable}>
            <DocumentsPage />
          </Tabs.TabPane>

          {/* <Tabs.TabPane key={'6'} tab={t('Supplier.AccountBalance.TabTitle')} disabled></Tabs.TabPane>
          <Tabs.TabPane key={'7'} tab={t('Supplier.Team&Work.TabTitle')} disabled></Tabs.TabPane>
          <Tabs.TabPane key={'8'} tab={t('Supplier.MLMStructure.TabTitle')} disabled></Tabs.TabPane> */}
        </Tabs>
      </TabsContainer>
    </PageLayout>
  );
}

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .user-tabs .ant-tabs-nav-list {
    margin-left: 0;

    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-active {
      background-color: #009ddc;

      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

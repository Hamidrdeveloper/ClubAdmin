import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import PartnerBillsPage from '@src/modules/Bill/pages/PartnerBills.page';
import { CompanyModel } from '@src/modules/Company/model/company.entity';
import PartnerGraph from '@src/modules/Partner/containers/PartnerGraph';
import PartnerSubdomainPage from '@src/modules/Subdomain/pages/PartnerSubdomain.page';
import TransactionHistoryPage from '@src/modules/Wallet/pages/TransactionHistory.page';
import { Loader, PageLayout } from '@src/shared/components';
import { Tabs, notification } from 'antd';
import axios from 'axios';
import { useAtom } from 'jotai';
import queryString from 'query-string';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import CompanyInsertFromPartnerID from '../containers/CompanyInsertFromPartnerID';
import { User } from '../model/personalInfo';
import { isCustomerAtom, isPartnerAtom } from '../services/userStore';
import UserModule from '../User.module';
import { AddressPage, BankDetailsPage, DocumentsPage, PasswordSettingPage, PersonalInfoPage } from './tabs';
import AccountBalanceTab from './tabs/Account.tab';
import PartnerTab from './tabs/Partner.tab';

export default function UserManagePage(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userModule = new UserModule();
  const { user_id: id, role: roleFromParams } = useParams();

  const {
    profile: { roles },
  } = useContext(AuthContext);
  const isEditorPartner = !!roles.find((role) => role.slug === 'partner');

  const { search } = useLocation();
  const pageParams = queryString.parse(search);

  const createMode = !id;
  const [activeTab, setActiveTab] = useState('1');
  const [isPartner, setIsPartner] = useAtom(isPartnerAtom);
  const [isCustomer, setIsCustomer] = useAtom(isCustomerAtom);
  const [partnerCompanyData, setPartnerCompanyData] = useState<CompanyModel | undefined>(undefined);

  useEffect(() => {
    return () => {
      setIsCustomer(undefined);
      setIsPartner(undefined);
      setPartnerCompanyData(undefined);
    };
  }, []);

  const query = useQuery(`user-${id}`, () => (id ? userModule.apiService.getOne(+id) : undefined), {
    onSuccess: (data: User) => {
      if (!id) return;

      const roleSlugs = data?.roles?.map((role) => role.slug);

      const isAdmin = roleSlugs.includes('admin');

      // if its customer only
      const isCustomer = roleSlugs.includes('user') && !isAdmin;
      setIsCustomer(isCustomer);

      const isPartner = roleSlugs.includes('partner');
      setIsPartner(isPartner);
    },
  });

  const routes = [
    ...userModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id
        ? query.isSuccess
          ? `${
              isCustomer || roleFromParams === 'user' ? i18n.t('User.Customer') : userModule.title[0]
            } - ${id} `
          : `${userModule.title[0]} - ${id}`
        : `New ${
            roleFromParams === 'user'
              ? i18n.t('User.Customer')
              : roleFromParams === 'partner'
              ? i18n.t('User.Partner.Title')
              : roleFromParams === 'admin'
              ? i18n.t('User.Field.Admin')
              : roleFromParams === 'employee'
              ? i18n.t('User.Employee')
              : userModule.title[0]
          }`,
    },
  ];

  useEffect(() => {
    if (pageParams.active) {
      setActiveTab(pageParams.active as string);
    }
  }, [pageParams.active]);

  const handleCreateUserForPartner = (data: User) => {
    if (pageParams.mode === 'partner') {
      navigate(`/admin/users/manage/partner/${data.id}?active=7`);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (query?.data?.partner?.company_id) {
      axios
        .get<{ data: CompanyModel }>(`/companies/${query?.data?.partner?.company_id}`)
        .then((response) => {
          setPartnerCompanyData(response?.data?.data);
        })
        .catch((error) => {
          notification.error(error.message);
        });
    } else {
      setPartnerCompanyData(undefined);
    }
  }, [query?.data?.partner?.company_id, activeTab]);

  return (
    <PageLayout<User> module={userModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <TabsContainer>
        <Tabs
          type="card"
          defaultActiveKey="1"
          className="user-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <Tabs.TabPane key={'1'} tab={t('User.PersonalInfo.TabTitle')}>
            <PersonalInfoPage onCallback={handleCreateUserForPartner} queryResult={query} />
          </Tabs.TabPane>

          {!isEditorPartner && (
            <Tabs.TabPane key={'2'} tab={t('User.PasswordSetting.TabTitle')} disabled={createMode}>
              <PasswordSettingPage queryResult={query} />
            </Tabs.TabPane>
          )}

          <Tabs.TabPane key={'3'} tab={t('User.Address.TabTitle')} disabled={createMode}>
            <AddressPage queryResult={query} />
          </Tabs.TabPane>

          <Tabs.TabPane key={'4'} tab={t('User.BankDetails.TabTitle')} disabled={createMode}>
            <BankDetailsPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'5'} tab={t('User.Documents.TabTitle')} disabled={createMode}>
            <DocumentsPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'6'} tab={t('User.AccountBalance.TabTitle')} disabled={createMode}>
            <AccountBalanceTab />
          </Tabs.TabPane>

          {((createMode && roleFromParams === 'partner') || isPartner) && (
            <Tabs.TabPane key={'7'} tab={t('User.Partner.TabTitle')} disabled={createMode}>
              <PartnerTab
                userId={Number(id)}
                sponsorId={query.data?.sponsor_id}
                partnerId={query.data?.partner.id}
              />
            </Tabs.TabPane>
          )}

          {((createMode && roleFromParams === 'partner') || isPartner) && (
            <Tabs.TabPane key={'8'} tab={t('User.Team&Work.TabTitle')}>
              <PartnerGraph partner={query.data?.partner?.id} />
            </Tabs.TabPane>
          )}

          {((createMode && roleFromParams === 'partner') || isPartner) && (
            <Tabs.TabPane key={'9'} tab={t('User.MLMStructure.TabTitle')}>
              <PartnerGraph partner={query.data?.partner?.id} />
            </Tabs.TabPane>
          )}

          {roleFromParams === 'partner' && (
            <Tabs.TabPane key={'10'} tab={t('Dashboards.Partner.Subdomains')}>
              <PartnerSubdomainPage partner={query.data?.partner} />
            </Tabs.TabPane>
          )}

          {roleFromParams === 'partner' && (
            <Tabs.TabPane key={'11'} tab={t('User.Partner.Company')}>
              {query.isLoading ? (
                <Loader />
              ) : (
                <CompanyInsertFromPartnerID
                  isCreateByPartner={false}
                  singleData={partnerCompanyData}
                  partnerId={query?.data?.partner?.id}
                  onCallback={(data) => {
                    query.refetch();
                    setPartnerCompanyData(data);
                  }}
                />
              )}
            </Tabs.TabPane>
          )}

          {!createMode && roleFromParams === 'partner' && (
            <Tabs.TabPane key={'12'} tab={t('Bill.Title_other')}>
              <PartnerBillsPage userId={query.data?.partner?.id ? query.data?.id : undefined} />
            </Tabs.TabPane>
          )}

          {
            <Tabs.TabPane key={'13'} tab={t('User.WalletTransaction.TabTitle')} disabled={createMode}>
              <TransactionHistoryPage userId={query.data?.id} />
            </Tabs.TabPane>
          }
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

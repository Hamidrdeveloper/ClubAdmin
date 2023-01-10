import i18n from '@src/core/i18n/config';
import { Subdomain } from '@src/modules/Subdomain';
import { Loader, PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import CompanyModule from '../Company.module';
import CompanyUpsert from '../container/CompanyUpsert';
import SubdomainTabs from '../container/SubdomainTabs';
import { CompanyModel } from '../model/company.entity';
import SubdomainListPage from './SubdomainsList.page';

interface TabProp {
  key: string;
  title: string;
  subdomainId?: number;
}

const CompanyManagePage = (): ReactElement => {
  const navigate = useNavigate();
  const { company_id: id } = useParams();
  const { t } = useTranslation();
  const [singleData, setSingleData] = useState({} as CompanyModel);
  const [activeTab, setActiveTab] = useState('-2');
  const [isLoading, setIsLoading] = useState(true);
  const [tabs, setTabs] = useState<TabProp[]>([]);
  const companyModule = new CompanyModule();
  const title = companyModule.title[0];

  const routes = [
    ...companyModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    companyModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const handleTabChange = (activeTab: string) => {
    setActiveTab(activeTab);
  };

  const createNewTabForSubdomainCreation = () => {
    const hasCreateTab = tabs.some((tab) => tab.key === '-1');
    if (!hasCreateTab) {
      // if it doesn't have create tab already, make it
      setActiveTab('-1');
      setTabs((prev) => [
        ...prev,
        {
          key: '-1',
          title: 'New Subdomain',
        },
      ]);
    } else {
      // if it has creation tab, set the active to that
      setActiveTab('-1');
    }
  };

  const setActiveTabToSubdomainList = (targetKey: string, action: string) => {
    if (action === 'remove') {
      setActiveTab('-3');
      setTabs((prev) => prev.filter((tab) => tab.key !== targetKey));
    }
  };

  const createNewTabForSubdomainEdit = (subdomainId: number) => {
    const hasATabWithThisSubdomainId = tabs.some((tab) => tab.key === String(subdomainId));
    if (!hasATabWithThisSubdomainId) {
      setActiveTab(String(subdomainId));
      setTabs((prev) => [
        ...prev,
        {
          subdomainId,
          key: String(subdomainId),
          title: String(subdomainId),
        },
      ]);
    } else {
      setActiveTab(String(subdomainId));
    }
  };

  const changeCreationTabToEditTab = (subdomainId: number, createdData: Subdomain) => {
    console.log(subdomainId, createdData);
    if (subdomainId) return;

    const createdSubdomainId = createdData.id;
    setActiveTab(String(createdSubdomainId));
    setTabs((prev) => [
      // remove creation tab
      ...prev.filter((tab) => tab.key !== '-1'),
      // add created tab and activate it
      {
        key: String(createdSubdomainId),
        subdomainId: createdSubdomainId,
        title: String(createdSubdomainId),
      },
    ]);
  };

  return (
    <PageLayout<CompanyModel> module={companyModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <TabsContainer>
        <Tabs
          hideAdd
          type="editable-card"
          activeKey={activeTab}
          destroyInactiveTabPane
          className="company-tabs"
          onChange={handleTabChange}
          defaultActiveKey={activeTab}
          onEdit={setActiveTabToSubdomainList}
        >
          {/* Tabs starting from negative values to stay unique when it comes to loading subdomain update tabs */}
          <Tabs.TabPane key={'-2'} className="single-tab" tab={t('Global.Settings')} closable={false}>
            {isLoading ? <Loader /> : <CompanyUpsert singleData={singleData} onCallback={goBack} />}
          </Tabs.TabPane>

          <Tabs.TabPane
            key={'-3'}
            disabled={!id}
            closable={false}
            className="single-tab"
            tab={t('Company.Tabs.Subdomains')}
          >
            {id && (
              <SubdomainListPage
                onNew={createNewTabForSubdomainCreation}
                onUpdate={createNewTabForSubdomainEdit}
              />
            )}
          </Tabs.TabPane>

          {tabs?.length > 0 &&
            tabs?.map((tab) => (
              <Tabs.TabPane className="single-tab" closable tab={tab.title} key={tab.key} tabKey={tab.key}>
                <SubdomainTabs
                  subdomainId={tab.subdomainId!}
                  onCallback={changeCreationTabToEditTab.bind(null, tab.subdomainId)}
                />
              </Tabs.TabPane>
            ))}
        </Tabs>
      </TabsContainer>
    </PageLayout>
  );
};

export default CompanyManagePage;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .single-tab {
    &.ant-tabs-tab {
      background: #fff;
      border-radius: 4px;
    }

    &.ant-tabs-tab-active {
      background: #009ddc;
      border-radius: 4px;

      & .anticon-close {
        color: #fff;
      }

      & .ant-tabs-tab-btn {
        color: #fff !important;
      }
    }
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

import { AuthContext } from '@src/core';
import { PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CompetitionModule from '../Competition.module';
import { CompetitionModel } from '../model/Competition.entity';
import RulesListPage from './EditTabs/RulesList.page';
import CompetitionListManagePage from './ListManage.page';
import ParticipantsTab from './Tabs/Participants.tab';

const CompetitionManagePage = (): ReactElement => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1');
  const { loggedInUserRole } = useContext(AuthContext);

  return (
    <PageLayout<CompetitionModel> module={new CompetitionModule()}>
      <PageLayout.Breadcrumb />

      <TabsContainer>
        <Tabs
          type="card"
          defaultActiveKey="1"
          className="competition-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <Tabs.TabPane key={'1'} tab={t('Competition.Title', { count: 2 })}>
            <CompetitionListManagePage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'2'} tab={t('Competition.Participant.Title', { count: 2 })} disabled>
            <ParticipantsTab />
          </Tabs.TabPane>

          {(loggedInUserRole === 'admin' || loggedInUserRole === 'employee') && (
            <Tabs.TabPane key={'3'} tab={t('Competition.Rule.Title', { count: 2 })}>
              <RulesListPage />
            </Tabs.TabPane>
          )}
        </Tabs>
      </TabsContainer>
    </PageLayout>
  );
};

export default CompetitionManagePage;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .competition-tabs .ant-tabs-nav-list {
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

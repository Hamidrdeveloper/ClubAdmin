import { AuthContext } from '@src/core';
import { Tabs } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CompetitionListView from './ListView.page';
import NewCompetitionPage from './NewCompetition.page';

const CompetitionListManagePage = (): ReactElement => {
  const { loggedInUserRole } = useContext(AuthContext);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('1');

  return (
    <TabsContainer>
      <Tabs
        type="card"
        defaultActiveKey={activeTab}
        className="competition-list-tabs"
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(activeTab) => setActiveTab(activeTab)}
      >
        <Tabs.TabPane key={'1'} tab={t('Global.Active')}>
          <CompetitionListView activeTab={'active'} />
        </Tabs.TabPane>

        {loggedInUserRole !== 'partner' && (
          <Tabs.TabPane key={'2'} tab={t('Global.InActive')}>
            <CompetitionListView activeTab={'inactive'} />
          </Tabs.TabPane>
        )}

        <Tabs.TabPane key={'3'} tab={t('Competition.Finished')}>
          <CompetitionListView activeTab={'ended'} />
        </Tabs.TabPane>

        {loggedInUserRole !== 'partner' && (
          <Tabs.TabPane key={'4'} tab={t('Competition.NewCompetition')}>
            <NewCompetitionPage />
          </Tabs.TabPane>
        )}
      </Tabs>
    </TabsContainer>
  );
};

export default CompetitionListManagePage;

const TabsContainer = styled.div`
  border-radius: 12px;
  background: #fff;

  & .content {
    padding: 12px 0;
  }

  & .competition-list-tabs .ant-tabs-nav-list {
    margin-left: 0;

    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-active {
      background-color: #309847 !important;

      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

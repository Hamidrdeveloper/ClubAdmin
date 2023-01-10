import { AuthContext } from '@src/core';
import { Tabs } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import EditCompetitionTab from './DetailsTabs/EditCompetition.tab';
import OverviewTab from './DetailsTabs/Overview.tab';
import PublishTab from './DetailsTabs/Publish.tab';
import TopListParticipantsTab from './DetailsTabs/TopListParticipants.tab';

const CompetitionDetailsManagePage = (): ReactElement => {
  const { t } = useTranslation();
  const { loggedInUserRole } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('1');

  return (
    <TabsContainer>
      <Tabs
        type="card"
        defaultActiveKey="1"
        className="competition-details-tabs"
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(activeTab) => setActiveTab(activeTab)}
      >
        <Tabs.TabPane key={'1'} tab={t('Competition.Details.Overview')}>
          <OverviewTab />
        </Tabs.TabPane>

        {loggedInUserRole !== 'partner' && (
          <Tabs.TabPane key={'2'} tab={t('Competition.Details.EditCompetition')}>
            <EditCompetitionTab />
          </Tabs.TabPane>
        )}

        <Tabs.TabPane key={'3'} tab={t('Competition.Details.TopListParticipants')}>
          <TopListParticipantsTab />
        </Tabs.TabPane>

        <Tabs.TabPane key={'4'} tab={t('Competition.Details.Publish')} disabled>
          <PublishTab />
        </Tabs.TabPane>
      </Tabs>
    </TabsContainer>
  );
};

export default CompetitionDetailsManagePage;

const TabsContainer = styled.div`
  & .competition-details-tabs .ant-tabs-nav-list {
    margin-left: 0;

    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-active {
      background-color: #37b052 !important;

      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import RankingListTab from './AttendeesTabs/RankingList.tab';
import UserResultListTab from './AttendeesTabs/UserResultList.tab';
import UserRewardListTab from './AttendeesTabs/UserRewardList.tab';

const AttendeesTab = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <TabsContainer>
      <Tabs type="card" defaultActiveKey="1" className="attendees-tabs">
        <Tabs.TabPane key={'1'} tab={t('Competition.Attendee.UserRewards')}>
          <UserRewardListTab />
        </Tabs.TabPane>

        <Tabs.TabPane key={'2'} tab={t('Competition.Attendee.UserResults')}>
          <UserResultListTab />
        </Tabs.TabPane>

        <Tabs.TabPane key={'3'} tab={t('Competition.Attendee.UserRanking')} disabled>
          <RankingListTab />
        </Tabs.TabPane>
      </Tabs>
    </TabsContainer>
  );
};

export default AttendeesTab;

const TabsContainer = styled.div`
  & .attendees-tabs .ant-tabs-nav-list {
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

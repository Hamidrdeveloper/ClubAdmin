import { AuthContext } from '@src/core';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Fallback from '../../components/Fallback';
import RewardsUpsert from '../../containers/RewardsUpsert';
import { competitionAtom, competitionIdAtom } from '../../service/competitionStore';
import RewardsListPage from './RewardsList.page';

const RewardsManageTab = (): ReactElement => {
  const { t } = useTranslation();

  const [compId] = useAtom(competitionIdAtom);

  if (!compId) return <Fallback title="Competition ID" />;
  const [competition] = useAtom(competitionAtom);
  const { loggedInUserRole } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('1');

  return (
    <TabsContainer>
      <Tabs
        type="card"
        defaultActiveKey="1"
        className="competition-rewards-tabs"
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(activeTab) => setActiveTab(activeTab)}
      >
        <Tabs.TabPane key={'1'} tab={t('Competition.Reward.AllRewards')}>
          <RewardsListPage />
        </Tabs.TabPane>

        {loggedInUserRole !== 'partner' && (
          <Tabs.TabPane
            key={'2'}
            tab={`+ ${t('Competition.Reward.NewReward')}`}
            disabled={!competition?.is_editable}
          >
            <RewardsUpsert competitionId={compId} onCallback={() => setActiveTab('1')} />
          </Tabs.TabPane>
        )}
      </Tabs>
    </TabsContainer>
  );
};

export default RewardsManageTab;

const TabsContainer = styled.div`
  & .competition-rewards-tabs .ant-tabs-nav-list {
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

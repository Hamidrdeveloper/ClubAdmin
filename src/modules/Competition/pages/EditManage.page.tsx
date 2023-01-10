import { AuthContext } from '@src/core';
import { PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import CompetitionModule from '../Competition.module';
import Fallback from '../components/Fallback';
import { CompetitionModel } from '../model/Competition.entity';
import { competitionIdAtom } from '../service/competitionStore';
import AttendeesTab from './EditTabs/Attendees.tab';
import AttendeesDetailTab from './EditTabs/AttendeesDetail.tab';
import CompetitionDetailsManagePage from './EditTabs/DetailsManage.page';
import RewardsManageTab from './EditTabs/RewardsManage.tab';
import RulesManageTab from './EditTabs/RulesManage.tab';

const CompetitionEditManagePage = (): ReactElement => {
  const { t } = useTranslation();
  const { competition_id: id } = useParams();
  if (!id) return <Fallback title="Competition ID" />;

  const [, setCompId] = useAtom(competitionIdAtom);
  useEffect(() => {
    setCompId(+id);
  }, [id]);

  const { loggedInUserRole } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('1');

  return (
    <PageLayout<CompetitionModel> module={new CompetitionModule()}>
      <PageLayout.Breadcrumb
        routes={[
          {
            breadcrumbName: t('Competition.Title', { count: 2 }),
            path: `/admin/competitions/`,
          },
          {
            breadcrumbName: t('Global.Edit'),
            path: `/admin/competitions/manage/${id}`,
          },
        ]}
      />

      <TabsContainer>
        <Tabs
          type="card"
          defaultActiveKey="1"
          className="competition-edit-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <Tabs.TabPane key={'1'} tab={t('Competition.Details.Title', { count: 2 })}>
            <CompetitionDetailsManagePage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'2'} tab={t('Competition.Rule.Title', { count: 2 })}>
            <RulesManageTab />
          </Tabs.TabPane>

          <Tabs.TabPane key={'3'} tab={t('Competition.Reward.Title', { count: 2 })}>
            <RewardsManageTab />
          </Tabs.TabPane>

          {loggedInUserRole !== 'partner' && (
            <Tabs.TabPane key={'4'} tab={t('Competition.Attendee.Title', { count: 2 })}>
              <AttendeesTab />
            </Tabs.TabPane>
          )}

          {loggedInUserRole !== 'partner' && (
            <Tabs.TabPane key={'5'} tab={t('Competition.AttendeesDetail.Title', { count: 2 })} disabled>
              <AttendeesDetailTab />
            </Tabs.TabPane>
          )}
        </Tabs>
      </TabsContainer>
    </PageLayout>
  );
};

export default CompetitionEditManagePage;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .competition-edit-tabs .ant-tabs-nav-list {
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

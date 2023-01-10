import { AuthContext } from '@src/core';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Fallback from '../../components/Fallback';
import NewRulesUpsert from '../../containers/NewRuleUpsert';
import { competitionAtom, competitionIdAtom } from '../../service/competitionStore';
import RulesListPage from './RulesList.page';

const RulesManageTab = (): ReactElement => {
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
        className="competition-rules-tabs"
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(activeTab) => setActiveTab(activeTab)}
      >
        <Tabs.TabPane key={'1'} tab={t('Competition.Rule.AllRules')}>
          <RulesListPage competitionId={compId} />
        </Tabs.TabPane>

        {loggedInUserRole !== 'partner' && (
          <Tabs.TabPane
            key={'2'}
            tab={`+ ${t('Competition.Rule.NewRule')}`}
            disabled={!competition?.is_editable}
          >
            <NewRulesUpsert onCallback={() => setActiveTab('1')} />
          </Tabs.TabPane>
        )}
      </Tabs>
    </TabsContainer>
  );
};

export default RulesManageTab;

const TabsContainer = styled.div`
  & .competition-rules-tabs .ant-tabs-nav-list {
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

import { PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { WalletListModel } from '../model/WalletList.entity';
import WalletModule from '../WalletList.module';
import TransactionListPage from './TransactionList.page';
import WalletListPage from './WalletList.page';

const WalletSettingPage = (): ReactElement => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('1');

  return (
    <PageLayout<WalletListModel> module={new WalletModule()}>
      <PageLayout.Breadcrumb />

      <TabsContainer>
        <Tabs
          type="card"
          defaultActiveKey="1"
          className="wallet-setting-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <Tabs.TabPane key={'1'} tab={t('Wallets.Title', { count: 2 })}>
            <WalletListPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'2'} tab={t('Wallets.Transaction.Title', { count: 2 })}>
            <TransactionListPage />
          </Tabs.TabPane>
        </Tabs>
      </TabsContainer>
    </PageLayout>
  );
};

export default WalletSettingPage;

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

import { PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import { atom, useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import moduleInfo from '../ModuleInfo.json';
import BuildingPage from '../submodules/Building/pages/Building.page';
import FloorPage from '../submodules/Floor/pages/Floor.page';
import RegalPage from '../submodules/Regal/pages/Regal.page';
import ShelfPage from '../submodules/Shelf/pages/Shelf.page';
import ZonePage from '../submodules/Zone/pages/Zone.page';
import { IncomingItemsTab, InventoryTab, SettingTab, StorageVariationTab } from './tabs';

export const warehouseIdAtom = atom<undefined | string>(undefined);

const StockManagePage = (): ReactElement => {
  const { t } = useTranslation();
  const { stock_id: id } = useParams();
  const [warehouseId, setWarehouseId] = useAtom(warehouseIdAtom);

  const navigate = useNavigate();

  useEffect(() => {
    setWarehouseId(id);
  }, [id]);

  const createMode = !warehouseId;

  const breadcrumbItems = [
    {
      breadcrumbName: 'Stocks',
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
    {
      breadcrumbName: 'Stocks Manage',
      path: `/admin${moduleInfo.Route.replace('*', '')}/manage`,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('1');

  return (
    <>
      <PageLayout.Breadcrumb routes={breadcrumbItems} />
      <TabsContainer>
        <Tabs
          type="card"
          className="stock-tabs"
          activeKey={activeTab}
          destroyInactiveTabPane
          onChange={(activeTab) => {
            // in case of ?page=2&per_page=... - removes search params on tab change
            navigate('./', { replace: true });

            setActiveTab(activeTab);
          }}
        >
          <Tabs.TabPane key={'1'} tab={t('Stock.Setting.TabTitle')}>
            <SettingTab />
          </Tabs.TabPane>

          <Tabs.TabPane key={'2'} tab={t('Stock.StorageVariation.TabTitle')} disabled={createMode}>
            <StorageVariationTab />
          </Tabs.TabPane>

          <Tabs.TabPane
            key={'3'}
            tab={t('Stock.SubModules.Building.Title', { count: 2 })}
            disabled={createMode}
          >
            <BuildingPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'4'} tab={t('Stock.SubModules.Floor.Title', { count: 2 })} disabled={createMode}>
            <FloorPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'5'} tab={t('Stock.SubModules.Zone.Title', { count: 2 })} disabled={createMode}>
            <ZonePage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'6'} tab={t('Stock.SubModules.Regal.Title', { count: 2 })} disabled={createMode}>
            <RegalPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'7'} tab={t('Stock.SubModules.Shelf.Title', { count: 2 })} disabled={createMode}>
            <ShelfPage />
          </Tabs.TabPane>

          <Tabs.TabPane key={'8'} tab={t('Stock.IncomingItems.TabTitle')} disabled={createMode}>
            <IncomingItemsTab />
          </Tabs.TabPane>

          <Tabs.TabPane key={'9'} tab={t('Stock.Inventory.TabTitle')} disabled={createMode}>
            <InventoryTab />
          </Tabs.TabPane>
        </Tabs>
      </TabsContainer>
    </>
  );
};

export default StockManagePage;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .stock-tabs .ant-tabs-nav-list {
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

import IncomingItemsUpsert from '@src/modules/Stock/containers/IncomingItemsUpsert';
import { Loader } from '@src/shared/components';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import StockCorrectionUpsert from '../containers/StockCorrectionUpsert';
import StockUpsert from '../containers/StockUpsert';
import { variationIdAtom } from '../services/variationStore';
import StockMovementPage from './StockMovement.page';
import StockSupplyPage from './StockSupply.page';
import Styles from './styles/StockManage.style';

const { TabPane } = Tabs;

const StockManage = (): ReactElement => {
  const [variationId] = useAtom(variationIdAtom);
  const { t } = useTranslation();
  const [isPending] = useState<boolean>(false);

  return (
    <Styles.TabsContainer>
      {isPending ? (
        <Loader />
      ) : (
        <Tabs className="stock-tabs" type="card" defaultActiveKey="1" animated destroyInactiveTabPane>
          <TabPane className="single-tab" tab={t('Product.Stock.Title')} key="1">
            <StockUpsert />
          </TabPane>
          <TabPane className="single-tab" tab={t('Product.Stock.Correction.Title')} key="2">
            <StockCorrectionUpsert />
          </TabPane>
          <TabPane className="single-tab" tab={t('Product.Stock.Movement.Title')} key="3">
            <StockMovementPage />
          </TabPane>
          <TabPane className="single-tab" tab={t('Product.Stock.IncomingItem.Title')} key="5">
            <IncomingItemsUpsert variation={variationId} />
          </TabPane>
          <TabPane className="single-tab" tab={t('Product.Stock.Supply.Title')} key="4" disabled>
            <StockSupplyPage />
          </TabPane>
        </Tabs>
      )}
    </Styles.TabsContainer>
  );
};

export default StockManage;

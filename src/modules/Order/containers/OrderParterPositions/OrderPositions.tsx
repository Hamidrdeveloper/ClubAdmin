import { EditOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Loader } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getPartnerSalePositionsFromPartnerSale } from '../../controllers/partner.controller';
import {
  addPartnerSalePosition,
  editPartnerSalePositions,
  removePartnerSalePosition,
} from '../../services/partner.service';
import {
  EditPartnerOrder,
  OrderDetailTabs,
  OrderSaleType,
  PartnerSalePositionModel,
  PartnerSalePure,
} from '../..';
import { OrderParterAddPosition } from './OrderPositionAdd';
import { OrderPartnerPositionEdit } from './OrderPositionEdit';
import { OrderPositionAll } from './OrderPositionsAll';

const { TabPane } = Tabs;
type Props = {
  orderSale: OrderSaleType;
  updateTab: (type: OrderDetailTabs) => void;
};

const OrderPositions = ({ orderSale, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();
  const [positions, setOrderPositions] = useState<PartnerSalePositionModel[]>([]);

  useEffect(() => {
    if (orderSale) {
      setOrderPositions(getPartnerSalePositionsFromPartnerSale(orderSale as PartnerSalePure));
    }
  }, [orderSale]);

  if (!orderSale) return <Loader title={t('Order.Position.Loader')} />;

  const removeOrderPosition = (orderPositionId: number, onComplete: () => void): void => {
    if (confirm(t('Order.Position.RemoveQuestion'))) {
      removePartnerSalePosition(orderPositionId)
        .then(() => updateTab(OrderDetailTabs.Overview))
        .finally(() => onComplete());
    }
  };

  const addOrderPosition = (position: EditPartnerOrder, onComplete: () => void) => {
    addPartnerSalePosition(orderSale.id, position)
      .then(() => updateTab(OrderDetailTabs.All))
      .finally(() => onComplete());
  };

  const editOrderPosition = (parterSaleId: number, positions: EditPartnerOrder[], onComplete: () => void) => {
    editPartnerSalePositions(parterSaleId, positions)
      .then(() => updateTab(OrderDetailTabs.All))
      .finally(() => onComplete());
  };

  return (
    <PositionTabs>
      <Tabs className="order-tabs" defaultActiveKey="1" type="card">
        <TabPane
          key="1"
          tab={
            <span>
              <SyncOutlined />
              {t('Order.Tab.StockUnit')}
            </span>
          }
        >
          <MainContainer>
            <ListContainer isHeader>
              <OrderPositionAll positions={positions} />
            </ListContainer>
          </MainContainer>
        </TabPane>

        <TabPane
          key="2"
          tab={
            <span>
              <EditOutlined />
              {t('Global.Edit')}
            </span>
          }
        >
          <MainContainer>
            <ListContainer isHeader>
              <OrderPartnerPositionEdit
                symbolName={'EUR'}
                positions={positions}
                orderPartnerId={orderSale.id}
                editOrderSalePosition={editOrderPosition}
                removeOrderSalePosition={removeOrderPosition}
              />
            </ListContainer>
          </MainContainer>
        </TabPane>

        <TabPane
          key="3"
          tab={
            <span>
              <PlusOutlined />
              {t('Global.Add')}
            </span>
          }
        >
          <MainContainer>
            <ListContainer isHeader>
              <OrderParterAddPosition symbolName={'EUR'} addOrderPosition={addOrderPosition} />
            </ListContainer>
          </MainContainer>
        </TabPane>
      </Tabs>
    </PositionTabs>
  );
};

const MainContainer = styled.div`
  padding: 16px 0;

  & .tabs {
    padding-bottom: 16px;

    & button {
      min-width: 200px;
    }
  }

  & .positions {
    width: 100%;
    padding-block: 8px;

    & .ant-space-item {
      &:nth-child(odd) {
        background: #fbfbfb;
      }

      &:nth-child(even) {
        background: #f2f2f2;
      }
    }
  }
`;

const ListContainer = styled.div<{ isHeader?: boolean }>`
  border-radius: 12px;
  background: #fff;

  & .header {
    border-radius: ${(props) => (props.isHeader ? '12px 12px 0 0' : '0')};
    background: #4a5161;
    color: #fff;
    padding: 16px;
    height: 80px;
    font-size: 0.874rem;
    font-weight: 500;

    & .title {
      height: 100%;

      & .ant-row {
        height: 100%;
        padding-inline: 6px;
      }
    }
  }
`;

const PositionTabs = styled.div`
  margin-top: 20px;
  width: 100%;
  & .ant-tabs-nav {
    margin-bottom: 0px;
  }
  & .order-tabs .ant-tabs-nav-list {
    margin-left: 0;
    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-btn {
      padding: 0px 28px;
      min-width: 18vh;
      text-align: center;
      font-weight: 500;
    }
    & .ant-tabs-tab-active {
      background-color: #009ddc;
      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

export default OrderPositions;

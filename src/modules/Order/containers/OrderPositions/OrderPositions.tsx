import { EditOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import {
  PurchaseSalePositionModel,
  PurchaseSalePositionPure,
  PurchaseSalePure,
  SubscriptionSalePositionPure,
  SubscriptionSalePure,
} from '@modules/Order';
import { AuthContext } from '@src/core';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { Loader, PageLayout, Panel } from '@src/shared/components';
import { Tabs, message, notification } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getCreditSalePositionsFromCreditSale } from '../../controllers/credit.controller';
import { editPositions, getOrderSalePositionsFromOrderSale } from '../../controllers/order.controller';
import { getPurchaseSalePositionsFromPurchaseSale } from '../../controllers/purchase.controller';
import { getSubscriptionSalePositionsFromSubscriptionSale } from '../../controllers/subscription.controller';
import { OrderPositionAddModule } from '../../Order.module';
import { removeCreditSalePosition } from '../../services/credit.service';
import {
  addOrderSalePosition,
  disconnectOrderSalePosition,
  removeOrderSalePosition,
} from '../../services/order.service';
import { addPurchaseSalePosition, removePurchaseSalePosition } from '../../services/purchase.service';
import {
  addSubscriptionSalePosition,
  removeSubscriptionSalePosition,
} from '../../services/subscription.service';
import {
  CreditSalePositionModel,
  CreditSalePure,
  EditOrder,
  OrderDetailTabs,
  OrderModuleType,
  OrderPositionsModelType,
  OrderSalePositionModel,
  OrderSalePositionPure,
  OrderSalePure,
  OrderSaleType,
  PartnerSalePure,
  SubscriptionSalePositionModel,
} from '../..';
import { OrderSalePositionAll } from './OrderPositionAll';
import { OrderSalePositionEdit } from './OrderPositionEdit';

const { TabPane } = Tabs;
type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};

const OrderPositions = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles, partner },
    role,
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const navigate = useNavigate();

  const productModule = new OrderPositionAddModule((productVariationId, quantity, onComplete) =>
    addOrderPosition(productVariationId, quantity, orderSale?.id ?? -1, onComplete),
  );

  const [positions, setOrderPositions] = useState<OrderPositionsModelType>([]);

  useEffect(() => {
    if (!orderSale) return;
    setOrderPositions(
      {
        'order-sale': getOrderSalePositionsFromOrderSale(orderSale as OrderSalePure),
        credit: getCreditSalePositionsFromCreditSale(orderSale as CreditSalePure),
        subscription: getSubscriptionSalePositionsFromSubscriptionSale(orderSale as SubscriptionSalePure),
        purchase: getPurchaseSalePositionsFromPurchaseSale(orderSale as PurchaseSalePure),
      }[moduleType],
    );
  }, [orderSale]);

  if (!orderSale) return <Loader title={t('Order.Position.Loader')} />;

  const order = {
    'order-sale': orderSale as OrderSalePure,
    credit: (orderSale as CreditSalePure).order,
    subscription: orderSale as SubscriptionSalePure,
    purchase: orderSale as PurchaseSalePure,
    partner: orderSale as PartnerSalePure,
  }[moduleType];

  const orderSalePositions = {
    credit: (orderSale as CreditSalePure).orderCreditNotePositions,
    'order-sale': (orderSale as OrderSalePure).orderSalePositions,
    subscription: (orderSale as SubscriptionSalePure).positions,
    purchase: (orderSale as PurchaseSalePure).orderPurchasePositions,
  }[moduleType];

  const removeOrderPosition = (orderPositionId, onComplete: () => void): void => {
    if (moduleType === 'credit') {
      if (
        ((orderSalePositions.length ?? 0) >= 2 &&
          moduleType === 'credit' &&
          (orderSale as CreditSalePure).isEditable) ||
        orderSale?.['is_editable']
      ) {
        if (confirm(t('Order.Position.RemoveQuestion'))) {
          removeCreditSalePosition(orderPositionId)
            .then(() => updateTab(OrderDetailTabs.Overview))
            .finally(() => onComplete());
        }
      } else {
        message.error(t('Order.Position.RemoveError'));
        onComplete();
      }
    } else if (moduleType === 'order-sale') {
      if (
        orderSale?.['is_editable'] &&
        ((orderSalePositions as OrderSalePositionPure[]).filter(
          (pos) => pos.productVariation && pos.orderPositionType?.id !== 3,
        ).length ?? 0) >= 2
      ) {
        if (confirm(t('Order.Position.RemoveQuestion'))) {
          removeOrderSalePosition(orderPositionId)
            .then(() => updateTab(OrderDetailTabs.Overview))
            .finally(() => onComplete());
        }
      } else {
        message.error(t('Order.Position.RemoveError'));
        onComplete();
      }
    } else if (moduleType === 'purchase') {
      if (
        orderSale?.['is_editable'] &&
        ((orderSalePositions as PurchaseSalePositionPure[]).filter(
          (pos) => pos.productVariation && pos.orderPositionType?.id !== 3,
        ).length ?? 0) >= 2
      ) {
        if (confirm(t('Order.Position.RemoveQuestion'))) {
          removePurchaseSalePosition(orderPositionId)
            .then(() => updateTab(OrderDetailTabs.Overview))
            .finally(() => onComplete());
        }
      } else {
        message.error(t('Order.Position.RemoveError'));
        onComplete();
      }
    } else if (moduleType === 'subscription') {
      if (
        orderSale?.['is_editable'] &&
        ((orderSalePositions as SubscriptionSalePositionPure[]).filter(
          (pos) => pos.productVariation && pos.orderPositionType?.id !== 3,
        ).length ?? 0) >= 2
      ) {
        if (confirm(t('Order.Position.RemoveQuestion'))) {
          removeSubscriptionSalePosition(orderPositionId)
            .then(() => updateTab(OrderDetailTabs.Overview))
            .finally(() => onComplete());
        }
      } else {
        message.error(t('Order.Position.RemoveError'));
        onComplete();
      }
    }
  };

  const disconnectOrderPosition = (orderPositionId, onComplete: () => void): void => {
    if (orderSale?.['is_editable'] && (orderSalePositions.length ?? 0) >= 2) {
      if (confirm(t('Order.Position.DisconnectQuestion'))) {
        disconnectOrderSalePosition(orderPositionId)
          .then(() => updateTab(OrderDetailTabs.Overview))
          .catch((error) => {
            notification.error(error?.message);
            onComplete();
          })
          .finally(() => onComplete());
      } else {
        onComplete();
      }
    } else {
      message.error(t('Order.Position.RemoveError'));
      onComplete();
    }
  };

  const addOrderPosition = (productVariationId, quantity, orderSaleId, onComplete: () => void) => {
    if (orderSale?.['is_editable']) {
      if (moduleType === 'purchase') {
        addPurchaseSalePosition(orderSaleId, { product_variation_id: productVariationId, quantity })
          .then(() => updateTab(OrderDetailTabs.Overview))
          .finally(() => onComplete());
      } else if (moduleType === 'order-sale') {
        addOrderSalePosition(orderSaleId, { product_variation_id: productVariationId, quantity })
          .then(() => updateTab(OrderDetailTabs.Overview))
          .finally(() => onComplete());
      } else if (moduleType === 'subscription') {
        addSubscriptionSalePosition(orderSaleId, { product_variation_id: productVariationId, quantity })
          .then(() => updateTab(OrderDetailTabs.Overview))
          .finally(() => onComplete());
      }
    } else {
      message.error(t('Order.Position.AddError'));
      onComplete();
    }
  };

  const editOrderPosition = (orderSaleId: number, positions: EditOrder[], onComplete: () => void) => {
    if ((moduleType === 'credit' && (orderSale as CreditSalePure).isEditable) || orderSale?.['is_editable']) {
      editPositions(
        {
          id: orderSaleId,
          positions: positions.map((pos) => ({
            ...pos,
            estimate_delivery_date: pos.estimate_delivery_date
              ? new Date(pos.estimate_delivery_date).toISOString().split('T')[0]
              : '',
          })),
        },
        moduleType,
      )
        .then(() => updateTab(OrderDetailTabs.All))
        .finally(() => onComplete());
    } else {
      message.error(t('Order.Position.EditError'));
      onComplete();
    }
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
              <OrderSalePositionAll
                orderId={orderSale?.id}
                positions={poses({ positions })[moduleType]}
                moduleType={moduleType}
                updateTab={updateTab}
              />
            </ListContainer>
          </MainContainer>
        </TabPane>
        {!isOrderReadOnly && (
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
                <OrderSalePositionEdit
                  moduleType={moduleType}
                  symbolName={order.currency?.name ?? ' - '}
                  orderSaleId={moduleType === 'credit' ? orderSale.id : order.id}
                  positions={poses({ positions })[moduleType]}
                  editOrderSalePosition={editOrderPosition}
                  removeOrderSalePosition={removeOrderPosition}
                  disconnectOrderSalePosition={disconnectOrderPosition}
                />
              </ListContainer>
            </MainContainer>
          </TabPane>
        )}
        {role !== 'partner' &&
          moduleType !== 'credit' &&
          (!isOrderReadOnly || order?.partner_id === partner.id) && (
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
                <PageLayout<ProductVariation> module={productModule}>
                  <PageLayout.Panel>
                    <Panel.Header hasSearch noDescription noListView dontNavigate />

                    <Panel.ListView
                      dontNavigate
                      params={{
                        isActive: true,
                        supplierId:
                          moduleType === 'purchase'
                            ? (orderSale as PurchaseSalePure)?.supplier?.id ?? undefined
                            : undefined,
                      }}
                      tableScroll={{ y: 640, x: 'max-content' }}
                      module={productModule}
                      hasUpdate={false}
                      onUpdate={(id, data: ProductVariation) => {
                        navigate('/admin/products/manage/' + data.product.id + '/' + id);
                      }}
                    />
                  </PageLayout.Panel>
                </PageLayout>
              </MainContainer>
            </TabPane>
          )}
      </Tabs>
    </PositionTabs>
  );
};

const poses = ({ positions }) => ({
  credit: positions as CreditSalePositionModel[],
  'order-sale': positions as OrderSalePositionModel[],
  purchase: positions as PurchaseSalePositionModel[],
  subscription: positions as SubscriptionSalePositionModel[],
});
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

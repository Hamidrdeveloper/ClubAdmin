import { OrderModuleType } from '@modules/Order';
import { AuthContext } from '@src/core';
import { Loader } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import OrderCustomer from './OrderCustomer/OrderCustomer';
import OrderDelivery from './OrderDelivery/OrderDelivery';
import OrderEmail from './OrderEmail/OrderEmail';
import Order from './OrderOrders/Orders';
import OrderOverview from './OrderOverview/OrderOverview';
import OrderPartnerPositions from './OrderParterPositions/OrderPositions';
import OrderPayments from './OrderPayments/OrderPayments';
import OrderPositions from './OrderPositions/OrderPositions';
import OrderReceipts from './OrderReceipts/OrderReceipts';
import OrderSettings from './OrderSettings/OrderSettings';
import { OrderDetailTabs, OrderDocumentType, OrderPaymentType, OrderSalePure, OrderSaleType } from '..';

const { TabPane } = Tabs;

type Props = {
  moduleType: OrderModuleType;
  activeTab: OrderDetailTabs;
  orderSale: OrderSaleType;
  orderDocument: OrderDocumentType;
  orderPayments: OrderPaymentType;
  setActiveTab: (type: OrderDetailTabs) => void;
  updateTab: (type: OrderDetailTabs) => void;
};
export const OrderTabs = ({
  moduleType,
  activeTab,
  orderSale,
  orderDocument,
  orderPayments,
  setActiveTab,
  updateTab,
}: Props): ReactElement => {
  const { t } = useTranslation();

  if (!orderSale) return <Loader />;

  const order_id = {
    'order-sale': orderSale?.id,
    credit: orderSale?.id,
    subscription: orderSale?.id,
    purchase: orderSale?.id,
    partner: orderSale.id,
  }[moduleType];

  return (
    <>
      <TabsContainer>
        <Tabs
          type="card"
          className="order-tabs"
          activeKey={activeTab}
          onChange={(activeTab) => setActiveTab(activeTab as OrderDetailTabs)}
        >
          {_Tabs({
            orderDocument,
            orderPayments,
            orderSale: Object(orderSale),
            order_id,
            moduleType,
            updateTab,
            t,
          })[moduleType]()}
        </Tabs>
      </TabsContainer>

      {activeTab === OrderDetailTabs.Overview &&
        (moduleType === 'partner' ? (
          <OrderPartnerPositions orderSale={orderSale} updateTab={updateTab} />
        ) : (
          <OrderPositions orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        ))}
    </>
  );
};

const _Tabs = ({ orderSale, moduleType, updateTab, orderPayments, t, order_id, orderDocument }) => {
  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  return {
    'order-sale': () => (
      <>
        <TabPane key={OrderDetailTabs.Overview} tab={t('Order.Tab.Overview')}>
          <OrderOverview orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Settings} tab={t('Order.Tab.Settings')}>
          <OrderSettings orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Payment} tab={t('Order.Tab.Payment')}>
          <OrderPayments
            orderSale={orderSale}
            paymentData={orderPayments}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        {!isOrderReadOnly && (
          <TabPane key={OrderDetailTabs.Email} tab={t('Order.Tab.Email')}>
            <OrderEmail orderId={Number(order_id)} moduleType={moduleType} />
          </TabPane>
        )}

        <TabPane key={OrderDetailTabs.Receipt} tab={t('Order.Tab.Receipts')}>
          <OrderReceipts
            receipt={orderDocument}
            orderSaleId={Number(order_id)}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        <TabPane key={OrderDetailTabs.Customer} tab={t('Order.Tab.Customer')}>
          <OrderCustomer orderSale={orderSale} moduleType={moduleType} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Tickets} tab={t('Order.Tab.Tickets')} disabled />

        <TabPane key={OrderDetailTabs.Orders} tab={t('Order.Tab.Orders')}>
          <Order orderSale={orderSale} moduleType={moduleType} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Stock} tab={t('Order.Tab.Stock')} disabled />

        <TabPane key={OrderDetailTabs.ReOrder} tab={t('Order.Tab.ReOrder')} disabled />

        <TabPane key={OrderDetailTabs.Properties} tab={t('Order.Tab.Properties')} disabled />

        <TabPane key={OrderDetailTabs.Delivery} tab={t('Order.Tab.Delivery')} disabled>
          <OrderDelivery
            orderSaleId={orderSale?.id ?? null}
            orderSalePositions={(orderSale as OrderSalePure)?.orderSalePositions.filter(
              (pos) => pos.productVariation,
            )}
            updateTab={updateTab}
          />
        </TabPane>
      </>
    ),
    credit: () => (
      <>
        <TabPane key={OrderDetailTabs.Overview} tab={t('Order.Tab.Overview')}>
          <OrderOverview orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Settings} tab={t('Order.Tab.Settings')}>
          <OrderSettings orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Payment} tab={t('Order.Tab.Payment')}>
          <OrderPayments
            orderSale={orderSale}
            paymentData={orderPayments}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        {!isOrderReadOnly && (
          <TabPane key={OrderDetailTabs.Email} tab={t('Order.Tab.Email')}>
            <OrderEmail orderId={Number(order_id)} moduleType={moduleType} />
          </TabPane>
        )}

        <TabPane key={OrderDetailTabs.Receipt} tab={t('Order.Tab.Receipts')}>
          <OrderReceipts
            receipt={orderDocument}
            orderSaleId={Number(order_id)}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        <TabPane key={OrderDetailTabs.Customer} tab={t('Order.Tab.Customer')}>
          <OrderCustomer orderSale={orderSale} moduleType={moduleType} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Tickets} tab={t('Order.Tab.Tickets')} disabled />

        <TabPane key={OrderDetailTabs.Orders} tab={t('Order.Tab.Orders')}>
          <Order orderSale={orderSale} moduleType={moduleType} />
        </TabPane>
      </>
    ),
    subscription: () => (
      <>
        <TabPane key={OrderDetailTabs.Overview} tab={t('Order.Tab.Overview')}>
          <OrderOverview orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Settings} tab={t('Order.Tab.Settings')}>
          <OrderSettings orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        {!isOrderReadOnly && (
          <TabPane key={OrderDetailTabs.Email} tab={t('Order.Tab.Email')}>
            <OrderEmail orderId={Number(order_id)} moduleType={moduleType} />
          </TabPane>
        )}

        <TabPane key={OrderDetailTabs.Receipt} tab={t('Order.Tab.Receipts')}>
          <OrderReceipts
            receipt={orderDocument}
            orderSaleId={Number(order_id)}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        <TabPane key={OrderDetailTabs.Customer} tab={t('Order.Tab.Customer')}>
          <OrderCustomer orderSale={orderSale} moduleType={moduleType} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Orders} tab={t('Order.Tab.Orders')}>
          <Order orderSale={orderSale} moduleType={moduleType} />
        </TabPane>
      </>
    ),
    purchase: () => (
      <>
        <TabPane key={OrderDetailTabs.Overview} tab={t('Order.Tab.Overview')}>
          <OrderOverview orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Settings} tab={t('Order.Tab.Settings')}>
          <OrderSettings orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Payment} tab={t('Order.Tab.Payment')}>
          <OrderPayments
            orderSale={orderSale}
            paymentData={orderPayments}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        {!isOrderReadOnly && (
          <TabPane key={OrderDetailTabs.Email} tab={t('Order.Tab.Email')}>
            <OrderEmail orderId={Number(order_id)} moduleType={moduleType} />
          </TabPane>
        )}

        <TabPane key={OrderDetailTabs.Receipt} tab={t('Order.Tab.Receipts')}>
          <OrderReceipts
            receipt={orderDocument}
            orderSaleId={Number(order_id)}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>

        <TabPane key={OrderDetailTabs.Customer} tab={t('Order.Tab.Supplier')}>
          <OrderCustomer orderSale={orderSale} moduleType={moduleType} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Tickets} tab={t('Order.Tab.Tickets')} disabled />

        <TabPane key={OrderDetailTabs.Orders} tab={t('Order.Tab.Orders')}>
          <Order orderSale={orderSale} moduleType={moduleType} />
        </TabPane>
      </>
    ),
    partner: () => (
      <>
        <TabPane key={OrderDetailTabs.Overview} tab={t('Order.Tab.Overview')}>
          <OrderOverview orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </TabPane>

        <TabPane key={OrderDetailTabs.Receipt} tab={t('Order.Tab.Receipts')}>
          <OrderReceipts
            receipt={orderDocument}
            orderSaleId={Number(order_id)}
            moduleType={moduleType}
            updateTab={updateTab}
          />
        </TabPane>
      </>
    ),
  };
};

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .order-tabs .ant-tabs-nav-list {
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

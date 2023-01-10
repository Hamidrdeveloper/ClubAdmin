import { Loader, PageLayout } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { OrderTabs } from '../../containers/OrderTabs';
import { getCreditDocuments, getCreditSaleDetails } from '../../controllers/credit.controller';
import { getOrderDocuments, getOrderSaleDetails } from '../../controllers/order.controller';
import { getPartnerDocuments, getPartnerSaleDetails } from '../../controllers/partner.controller';
import { getPurchaseDocuments, getPurchaseSaleDetails } from '../../controllers/purchase.controller';
import {
  getSubscriptionDocuments,
  getSubscriptionSaleDetails,
} from '../../controllers/subscription.controller';
import CreditModule from '../../Credit.module';
import { OrderModuleType } from '../../model/order.entity';
import OrderModule from '../../Order.module';
import PartnerModule from '../../Partner.module';
import PurchaseModule from '../../Purchase.module';
import { getAllCreditPayments } from '../../services/credit.service';
import { getAllPayments } from '../../services/order.service';
import { getAllPurchasePayments } from '../../services/purchase.service';
import SubscriptionModule from '../../Subscription.module';
import { OrderDetailTabs, OrderDocumentType, OrderPaymentType, OrderSaleType } from '../..';

type Props = { moduleType?: OrderModuleType; id?: number | null };
export default function OrderDetailsPage({ moduleType = 'order-sale', id = null }: Props): ReactElement {
  const module = {
    'order-sale': new OrderModule(),
    credit: new CreditModule(),
    subscription: new SubscriptionModule(),
    purchase: new PurchaseModule(),
    partner: new PartnerModule(),
  };

  const navigate = useNavigate();

  const orderId = id ?? (useParams()['order_id'] || -1);

  if (orderId === -1) {
    navigate(
      {
        'order-sale': '/orders/order-sale',
        credit: '/orders/credit',
        subscription: '/orders/subscription',
        purchase: '/orders/purchase',
        partner: '/orders/partner',
      }[moduleType],
    );
  }

  const routes = [
    ...module[moduleType].breadcrumbItems,
    {
      path: '',
      breadcrumbName: orderId
        ? `${module[moduleType].title[0]} - ${orderId}`
        : `New ${module[moduleType].title[0]}`,
    },
  ];

  const [orderSale, setOrderSale] = useState<OrderSaleType>(null);
  const [orderDocument, setOrderDocument] = useState<OrderDocumentType>(null);
  const [orderPayments, setOrderPayments] = useState<OrderPaymentType>([]);

  // Why this state is in detail? good question, answer for re-rendering reasons!
  const [activeTab, setActiveTab] = useState<OrderDetailTabs>(OrderDetailTabs.Overview);

  useEffect(() => {
    updateTab(OrderDetailTabs.All);
  }, [orderId]);

  const updateTab = (name: OrderDetailTabs) => {
    if (moduleType === 'credit') {
      switch (name) {
        case OrderDetailTabs.Overview:
        case OrderDetailTabs.Settings:
        case OrderDetailTabs.Email:
        case OrderDetailTabs.Customer:
        case OrderDetailTabs.Delivery:
        case OrderDetailTabs.Orders:
        case OrderDetailTabs.Properties:
        case OrderDetailTabs.ReOrder:
        case OrderDetailTabs.Stock:
        case OrderDetailTabs.Tickets:
          setOrderSale(null);
          getCreditSaleDetails(Number(orderId)).then((order) => setOrderSale(order));
          break;
        case OrderDetailTabs.Receipt:
          setOrderDocument(null);
          getCreditDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        case OrderDetailTabs.Payment:
          setOrderSale(null);
          getCreditSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderPayments([]);
          getAllCreditPayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        case OrderDetailTabs.All: {
          setOrderSale(null);
          getCreditSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderDocument(null);
          getCreditDocuments(Number(orderId)).then((document) => setOrderDocument(document));

          setOrderPayments([]);
          getAllCreditPayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        }
      }
    } else if (moduleType === 'subscription') {
      switch (name) {
        case OrderDetailTabs.Overview:
        case OrderDetailTabs.Settings:
        case OrderDetailTabs.Email:
        case OrderDetailTabs.Customer:
        case OrderDetailTabs.Orders:
          setOrderSale(null);
          getSubscriptionSaleDetails(Number(orderId)).then((order) => setOrderSale(order));
          break;
        case OrderDetailTabs.Receipt:
          setOrderDocument(null);
          getSubscriptionDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        case OrderDetailTabs.All: {
          setOrderSale(null);
          getSubscriptionSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderDocument(null);
          getSubscriptionDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        }
      }
    } else if (moduleType === 'purchase') {
      switch (name) {
        case OrderDetailTabs.Overview:
        case OrderDetailTabs.Settings:
        case OrderDetailTabs.Email:
        case OrderDetailTabs.Customer:
        case OrderDetailTabs.Orders:
        case OrderDetailTabs.Tickets:
          setOrderSale(null);
          getPurchaseSaleDetails(Number(orderId)).then((order) => setOrderSale(order));
          break;
        case OrderDetailTabs.Receipt:
          setOrderDocument(null);
          getPurchaseDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        case OrderDetailTabs.Payment:
          setOrderSale(null);
          getPurchaseSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderPayments([]);
          getAllPurchasePayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        case OrderDetailTabs.All: {
          setOrderSale(null);
          getPurchaseSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderDocument(null);
          getPurchaseDocuments(Number(orderId)).then((document) => setOrderDocument(document));

          setOrderPayments([]);
          getAllPurchasePayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        }
      }
    } else if (moduleType === 'partner') {
      switch (name) {
        case OrderDetailTabs.Payment:
        case OrderDetailTabs.Overview:
        case OrderDetailTabs.Settings:
        case OrderDetailTabs.Email:
        case OrderDetailTabs.Customer:
        case OrderDetailTabs.Orders:
        case OrderDetailTabs.Tickets:
          setOrderSale(null);
          getPartnerSaleDetails(Number(orderId)).then((order) => setOrderSale(order));
          break;
        case OrderDetailTabs.Receipt:
          setOrderDocument(null);
          getPartnerDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        case OrderDetailTabs.All: {
          setOrderSale(null);
          getPartnerSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderDocument(null);
          getPartnerDocuments(Number(orderId)).then((document) => setOrderDocument(document));

          break;
        }
      }
    } else if (moduleType === 'order-sale') {
      switch (name) {
        case OrderDetailTabs.Overview:
        case OrderDetailTabs.Settings:
        case OrderDetailTabs.Email:
        case OrderDetailTabs.Customer:
        case OrderDetailTabs.Delivery:
        case OrderDetailTabs.Orders:
        case OrderDetailTabs.Properties:
        case OrderDetailTabs.ReOrder:
        case OrderDetailTabs.Stock:
        case OrderDetailTabs.Tickets:
          setOrderSale(null);
          getOrderSaleDetails(Number(orderId)).then((order) => setOrderSale(order));
          break;
        case OrderDetailTabs.Receipt:
          setOrderDocument(null);
          getOrderDocuments(Number(orderId)).then((document) => setOrderDocument(document));
          break;
        case OrderDetailTabs.Payment:
          setOrderSale(null);
          getOrderSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderPayments([]);
          getAllPayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        case OrderDetailTabs.All: {
          setOrderSale(null);
          getOrderSaleDetails(Number(orderId)).then((order) => setOrderSale(order));

          setOrderDocument(null);
          getOrderDocuments(Number(orderId)).then((document) => setOrderDocument(document));

          setOrderPayments([]);
          getAllPayments(Number(orderId)).then((payments) => setOrderPayments(payments));
          break;
        }
      }
    }
    setActiveTab(name === OrderDetailTabs.All ? activeTab : name);
  };

  if (!orderSale) return <Loader />;

  return (
    <PageLayout<unknown> module={module[moduleType]}>
      <PageLayout.Breadcrumb routes={routes} />

      <OrderTabs
        orderSale={orderSale}
        orderDocument={orderDocument}
        orderPayments={orderPayments}
        activeTab={activeTab}
        moduleType={moduleType}
        setActiveTab={setActiveTab}
        updateTab={updateTab}
      />
    </PageLayout>
  );
}

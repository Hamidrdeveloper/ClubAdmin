import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { ReactNode } from 'react';

import { Flag } from '../Flag/model/flag.entity';
import { User } from '../User';
import {
  CustomerNameRenderer,
  DateRenderer,
  DescriptionDateRenderer,
  DetailCustomerNameRenderer,
  DetailsAddress,
  DetailsOrderStatusRenderer,
  DetailsPaymentMethodRenderer,
  DetailsPaymentStatusRenderer,
  DetailsShippingProfileRenderer,
  EstimatedDeliveryDateRenderer,
  OrderFlagsRenderer,
  OrderStatusRenderer,
  PaidCreditRenderer,
  PaymentMethodRenderer,
  PaymentStatusRenderer,
  ShippingProfileRenderer,
  TotalPaymentCreditRenderer,
} from './components';
import ModuleInfo from './ModuleInfo.json';
import { CreditSalePure, OrderStatus } from '.';

export default class CreditModule implements FactoryModule<CreditSalePure> {
  public entity = '/order-credit-notes';
  public title = [i18n.t('Order.Credit.Title'), i18n.t('Order.Credit.Title', { count: 2 })];
  public apiService = new ApiBuilder<CreditSalePure>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route_Credit}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'orderStatus',
      label: i18n.t('Order.Field.OrderStatus'),
      render: DetailsOrderStatusRenderer,
    },
    {
      key: 'order_date',
      label: i18n.t('Order.Field.OrderDate'),
      render: DescriptionDateRenderer,
    },
    {
      key: ['order', 'user'],
      label: i18n.t('Order.Field.CustomerName'),
      render: DetailCustomerNameRenderer,
    },
    {
      key: ['order', 'invoiceContactGroup'],
      label: i18n.t('Order.Field.FullAddress'),
      render: DetailsAddress,
    },
    {
      key: ['order', 'deliveryContactGroup'],
      label: i18n.t('Order.Field.DeliveryAddress'),
      render: DetailsAddress,
    },
    {
      key: 'paymentMethod',
      label: i18n.t('Order.Field.PaymentMethod'),
      render: DetailsPaymentMethodRenderer,
    },
    {
      key: 'payment_status',
      label: i18n.t('Order.Field.PaymentStatus'),
      render: DetailsPaymentStatusRenderer,
    },
    {
      key: ['order', 'shippingProfile'],
      label: i18n.t('Order.Field.ShippingProfile'),
      render: DetailsShippingProfileRenderer,
    },
  ];

  public tableColumns: TableColumnsType<CreditSalePure> = [
    {
      width: 120,
      key: 'OrderDate',
      className: 'number',
      render: DateRenderer,
      dataIndex: 'order_date',
      title: i18n.t('Order.Field.OrderDate'),
    },
    {
      key: 'CustomerName',
      title: i18n.t('Order.Field.CustomerName'),
      dataIndex: ['order', 'user'],
      width: 200,
      render: (user: User): ReactNode => CustomerNameRenderer({ user }),
    },
    {
      key: 'PaymentMethod',
      title: i18n.t('Order.Field.PaymentMethod'),
      dataIndex: 'paymentMethod',
      width: 200,
      render: (payment_method: { name: string }): ReactNode => PaymentMethodRenderer({ payment_method }),
    },
    {
      key: 'ShippingProfile',
      title: i18n.t('Order.Field.ShippingProfile'),
      dataIndex: ['order', 'shippingProfile'],
      width: 200,
      render: (shipping_profile: { name: string }): ReactNode =>
        ShippingProfileRenderer({ shipping_profile }),
    },
    {
      key: 'TotalPayment',
      title: i18n.t('Order.Field.TotalPayment'),
      dataIndex: 'total_gross_amount',
      className: 'number',
      width: 100,
      render: (total_price: number, data: CreditSalePure): ReactNode =>
        TotalPaymentCreditRenderer({ total_price, data }),
    },
    {
      key: 'Paid',
      title: i18n.t('Order.Field.Paid'),
      dataIndex: 'total_payment',
      className: 'number',
      width: 100,
      render: (total_payment: number, data: CreditSalePure): ReactNode =>
        PaidCreditRenderer({ total_payment, data }),
    },
    {
      key: 'PaymentStatus',
      title: i18n.t('Order.Field.PaymentStatus'),
      dataIndex: 'payment_status',
      width: 140,
      render: (payment_status: string): ReactNode => PaymentStatusRenderer({ payment_status }),
    },

    {
      key: 'OrderStatus',
      title: i18n.t('Order.Field.OrderStatus'),
      dataIndex: 'orderStatus',
      width: 120,
      render: (orderStatus: OrderStatus): ReactNode => OrderStatusRenderer({ orderStatus }),
    },
    {
      key: 'id',
      dataIndex: ['flags'],
      width: 120,
      title: i18n.t('Order.OrderFlag'),
      align: 'center',
      render: (flags: Flag[], order: CreditSalePure): ReactNode => OrderFlagsRenderer(flags, 'credit', order),
    },

    {
      width: 200,
      className: 'number',
      key: 'EstimatedDeliveryDate',
      dataIndex: ['order', 'estimate_delivery_date'],
      title: i18n.t('Order.Field.EstimatedDeliveryDate'),
      render: (date: Date): ReactNode => EstimatedDeliveryDateRenderer({ date }),
    },
  ];
}

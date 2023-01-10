import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { ReactNode, lazy } from 'react';

import { Flag } from '../Flag/model/flag.entity';
import { User } from '../User';
import {
  CustomerNameRenderer,
  DateRenderer,
  EstimatedDeliveryDateRenderer,
  OrderFlagsRenderer,
  OrderStatusRenderer,
  PaymentMethodRenderer,
  ShippingProfileRenderer,
  TotalPaymentRenderer,
} from './components';
import ModuleInfo from './ModuleInfo.json';
import { OrderStatus, SubscriptionSalePure } from '.';

export default class SubscriptionModule implements FactoryModule<SubscriptionSalePure> {
  public entity = '/order-subscriptions';
  public title = [i18n.t('Order.Subscription.Title'), i18n.t('Order.Subscription.Title', { count: 2 })];
  public apiService = new ApiBuilder<SubscriptionSalePure>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route_Subscription}`,
    },
  ];

  UpsertComponent = lazy(() => import('./containers/OrderSubUpsert'));

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'owner_id',
      label: i18n.t('Order.Field.OwnerId'),
    },
    {
      key: 'number',
      label: i18n.t('Global.Number'),
    },
    {
      key: 'payment_status',
      label: i18n.t('Order.Field.PaymentStatus'),
    },
    {
      key: 'total_gross_amount',
      label: i18n.t('Order.Field.TotalGrossAmount'),
    },
    {
      key: 'total_net_amount',
      label: i18n.t('Order.Field.TotalNetAmount'),
    },
    {
      key: 'total_vat_amount',
      label: i18n.t('Order.Field.TotalVatAmount'),
    },
    {
      key: 'gross_shipping_cost',
      label: i18n.t('Order.Field.GrossShippingCost'),
    },
    {
      key: 'return_on_sale',
      label: i18n.t('Order.Field.ReturnOnSale'),
    },
    {
      key: 'is_editable',
      label: i18n.t('Order.Field.IsEditable'),
    },
    {
      key: 'early_payment_discount',
      label: i18n.t('Order.Field.EarlyPaymentDiscount'),
    },
  ];

  public tableColumns: TableColumnsType<SubscriptionSalePure> = [
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
      dataIndex: 'user',
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
      dataIndex: 'shippingProfile',
      width: 200,
      render: (shipping_profile: { name: string }): ReactNode =>
        ShippingProfileRenderer({ shipping_profile }),
    },
    {
      key: 'TotalPayment',
      title: i18n.t('Order.Field.TotalPayment'),
      dataIndex: 'total_price',
      className: 'number',
      width: 100,
      render: (total_price: number, data: SubscriptionSalePure): ReactNode =>
        TotalPaymentRenderer({ total_price, data: data as any }),
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
      render: (flags: Flag[], order: SubscriptionSalePure): ReactNode =>
        OrderFlagsRenderer(flags, 'subscription', order),
    },

    {
      width: 200,
      className: 'number',
      key: 'EstimatedDeliveryDate',
      dataIndex: 'next_order_sale_date',
      title: i18n.t('Order.Field.EstimatedDeliveryDate'),
      render: (date: Date): ReactNode => EstimatedDeliveryDateRenderer({ date }),
    },
  ];
}

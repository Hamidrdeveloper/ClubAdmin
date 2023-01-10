import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { OrderOffer } from './model/orderOffer.entity';
import ModuleInfo from './ModuleInfo.json';

export default class OrderOfferModule implements FactoryModule<OrderOffer> {
  public entity = '/order-offer';
  public title = [i18n.t('OrderOffer.Title'), i18n.t('OrderOffer.Title', { count: 2 })];
  public apiService = new ApiBuilder<OrderOffer>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/OrderOfferUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'user_id',
      label: i18n.t('OrderOffer.Field.UserId'),
    },
    {
      key: 'number',
      label: i18n.t('OrderOffer.Field.Number'),
    },
    {
      key: 'customer_reference',
      label: i18n.t('OrderOffer.Field.CustomerReference'),
    },
    {
      key: 'invoice_contact_group_id',
      label: i18n.t('OrderOffer.Field.InvoiceContactGroupId'),
    },
    {
      key: 'delivery_contact_group_id',
      label: i18n.t('OrderOffer.Field.DeliveryContactGroupId'),
    },
    {
      key: 'description',
      label: i18n.t('OrderOffer.Field.Description'),
    },
    {
      key: 'order_date',
      label: i18n.t('OrderOffer.Field.OrderDate'),
    },
    {
      key: 'payment_method_id',
      label: i18n.t('OrderOffer.Field.PaymentMethodId'),
    },
    {
      key: 'payment_term_id',
      label: i18n.t('OrderOffer.Field.PaymentTermId'),
    },
    {
      key: 'estimate_delivery_date',
      label: i18n.t('OrderOffer.Field.DelivaeryDate'),
    },
    {
      key: 'valid_until',
      label: i18n.t('OrderOffer.Field.ValidUntil'),
    },
    {
      key: 'estimate_payment_date',
      label: i18n.t('OrderOffer.Field.EstimatePaymentDate'),
    },
    {
      key: 'early_payment_discount_days',
      label: i18n.t('OrderOffer.Field.EarlyPaymentDiscountPercentage'),
    },
    {
      key: 'early_payment_discount_percentage',
      label: i18n.t('OrderOffer.Field.EarlyPaymentDiscountDays'),
    },
    {
      key: 'language_id',
      label: i18n.t('OrderOffer.Field.languageId'),
    },
  ];

  public tableColumns = [
    {
      width: 100,
      key: 'user_id',
      dataIndex: 'user_id',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.UserId'),
    },
    {
      width: 100,
      key: 'number',
      dataIndex: 'number',
      className: 'number hasTile',
      title: i18n.t('OrderOffer.Field.Number'),
    },
    {
      width: 250,
      key: 'customer_reference',
      dataIndex: 'customer_reference',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.CustomerReference'),
    },
    {
      width: 250,
      key: 'invoice_contact_group_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.InvoiceContactGroupId'),
    },
    {
      width: 250,
      key: 'delivery_contact_group_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.DeliveryContactGroupId'),
    },
    {
      width: 150,
      key: 'description',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.Description'),
    },
    {
      width: 150,
      key: 'order_date',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.OrderDate'),
    },
    {
      width: 150,
      key: 'payment_method_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.PaymentMethodId'),
    },
    {
      width: 150,
      key: 'payment_method_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.PaymentMethodId'),
    },
    {
      width: 150,
      key: 'payment_term_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.PaymentTermId'),
    },
    {
      width: 250,
      key: 'estimate_delivery_date',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.DelivaeryDate'),
    },
    {
      width: 150,
      key: 'valid_until',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.ValidUntil'),
    },
    {
      width: 250,
      key: 'estimate_payment_date',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.EstimatePaymentDate'),
    },
    {
      width: 250,
      key: 'early_payment_discount_days',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.EarlyPaymentDiscountPercentage'),
    },
    {
      width: 250,
      key: 'early_payment_discount_percentage',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.EarlyPaymentDiscountDays'),
    },
    {
      width: 150,
      key: 'language_id',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('OrderOffer.Field.languageId'),
    },
  ];
}

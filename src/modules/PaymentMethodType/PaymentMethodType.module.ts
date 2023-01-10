import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { PaymentMethodType } from './model/paymentMethodType.entity';
import moduleInfo from './ModuleInfo.json';

export default class PaymentMethodTypeModule implements FactoryModule<PaymentMethodType> {
  public entity = '/payment-method-types';
  public title = [i18n.t('PaymentMethodType.Title'), i18n.t('PaymentMethodType.Title', { count: 2 })];
  public apiService = new ApiBuilder<PaymentMethodType>(this.entity, this.title[0]);
  public UpsertComponent = lazy(() => import('./containers/PaymentMethodTypeUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: i18n.t('Global.Title'),
    },
  ];
  public tableColumns = [
    {
      width: 150,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Title'),
    },
  ];
}

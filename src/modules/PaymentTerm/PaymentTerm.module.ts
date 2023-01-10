import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { DetailsPercentRenderer, PercentRenderer } from './components/TableComponents';
import { PaymentTerm } from './model/paymentTerm.entity';
import moduleInfo from './ModuleInfo.json';

export default class PaymentTermModule implements FactoryModule<PaymentTerm> {
  public entity = '/payment-terms';
  public title = [i18n.t('PaymentTerm.Title'), i18n.t('PaymentTerm.Title', { count: 2 })];
  public apiService = new ApiBuilder<PaymentTerm>(this.entity, this.title[0]);
  public UpsertComponent = lazy(() => import('./containers/PaymentTermUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'due_days',
      label: i18n.t('PaymentTerm.Field.DueDays'),
    },
    {
      key: 'discount_percentage',
      render: DetailsPercentRenderer,
      label: i18n.t('PaymentTerm.Field.DiscountPercentage'),
    },
    {
      key: 'description',
      label: i18n.t('PaymentTerm.Field.Description'),
    },
  ];
  public tableColumns = [
    {
      width: 150,
      key: 'due_days',
      dataIndex: 'due_days',
      className: 'number hasTile',
      title: i18n.t('PaymentTerm.Field.DueDays'),
    },
    {
      width: 150,
      render: PercentRenderer,
      key: 'discount_percentage',
      className: 'number hasTile',
      dataIndex: 'discount_percentage',
      title: i18n.t('PaymentTerm.Field.DiscountPercentage'),
    },
    {
      width: 150,
      key: 'description',
      className: 'hasTile',
      dataIndex: 'description',
      title: i18n.t('PaymentTerm.Field.Description'),
    },
  ];
}

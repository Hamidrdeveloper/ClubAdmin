import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { CustomerStepModel } from './model/CustomerStep.entity';
import ModuleInfo from './ModuleInfo.json';

export default class CustomerStepModule implements FactoryModule<CustomerStepModel> {
  public entity = '/customer-steps';
  public title = [i18n.t('CustomerStep.Title_other'), i18n.t('CustomerStep.Title_other', { count: 2 })];
  public apiService = new ApiBuilder<CustomerStepModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./container/CustomerStepUpsert'));
  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'frontline',
      label: i18n.t('CustomerStep.Field.Frontline'),
    },
    {
      key: 'voucher_level',
      label: i18n.t('CustomerStep.Field.VoucherLevel'),
    },
    {
      key: 'id_account_minus_value',
      label: i18n.t('CustomerStep.Field.AccountMinusValue'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
      dataIndex: 'name',
    },
    {
      key: 'frontline',
      className: 'hasTile',
      title: i18n.t('CustomerStep.Field.Frontline'),
      dataIndex: 'frontline',
    },

    {
      key: 'voucher_level',
      className: 'hasTile',
      title: i18n.t('CustomerStep.Field.VoucherLevel'),
      dataIndex: 'voucher_level',
    },
    {
      key: 'id_account_minus_value',
      className: 'hasTile',
      title: i18n.t('CustomerStep.Field.AccountMinusValue'),
      dataIndex: 'id_account_minus_value',
    },
  ];
}

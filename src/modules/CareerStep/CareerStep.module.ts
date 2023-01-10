import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { CareerStep } from './model/careerstep.entity';
import ModuleInfo from './ModuleInfo.json';

export default class CareerStepModule implements FactoryModule<CareerStep> {
  public entity = '/career-steps';
  public title = [i18n.t('CareerStep.Title_other'), i18n.t('CareerStep.Title_other', { count: 2 })];
  public apiService = new ApiBuilder<CareerStep>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin/${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'slug',
      label: i18n.t('CareerStep.Slug'),
    },
    {
      key: 'min_point',
      label: i18n.t('CareerStep.MinPoint'),
    },
    {
      key: 'is_generation',
      label: i18n.t('CareerStep.Generation'),
    },
    {
      key: 'voucher_level',
      label: i18n.t('CareerStep.VoucherLevel'),
    },
    {
      key: 'id_account_minus_value',
      label: i18n.t('CareerStep.AccountMinusValue'),
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'discount_percentage',
      label: i18n.t('CareerStep.BonusValue'),
    },
    {
      key: 'frontline',
      label: i18n.t('CareerStep.FrontLine'),
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
      key: 'slug',
      className: 'hasTile',
      title: i18n.t('CareerStep.Slug'),
      dataIndex: 'slug',
    },
    {
      key: 'min_point',
      className: 'hasTile',
      title: i18n.t('CareerStep.MinPoint'),
      dataIndex: 'min_point',
    },
    {
      key: 'is_generation',
      className: 'hasTile',
      title: i18n.t('CareerStep.Generation'),
      dataIndex: 'is_generation',
    },
    {
      key: 'voucher_level',
      className: 'hasTile',
      title: i18n.t('CareerStep.VoucherLevel'),
      dataIndex: 'voucher_level',
    },
    {
      key: 'discount_percentage',
      className: 'hasTile',
      title: i18n.t('CareerStep.BonusValue'),
      dataIndex: 'discount_percentage',
    },
    {
      key: 'frontline',
      className: 'hasTile',
      title: i18n.t('CareerStep.FrontLine'),
      dataIndex: 'frontline',
    },
  ];
}

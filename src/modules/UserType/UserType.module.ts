import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { lazy } from 'react';

import { TranslateRenderer } from './components';
import { UserType } from './model/userType.entity';
import moduleInfo from './ModuleInfo.json';

export default class UserTypeModule implements FactoryModule<UserType> {
  public entity = '/user-types';
  public title = [i18n.t('UserType.Title'), i18n.t('UserType.Title', { count: 2 })];
  public apiService = new ApiBuilder<UserType>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/UserTypeUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'bonus_type',
      label: i18n.t('UserType.Field.BonusType'),
    },
    {
      key: 'min_point',
      label: i18n.t('UserType.Field.MinPoint'),
    },
    {
      key: 'min_period',
      label: i18n.t('UserType.Field.MinPeriod'),
    },
    {
      key: 'is_partner',
      label: i18n.t('Global.IsPartner'),
    },
    {
      key: 'is_generation',
      label: i18n.t('Global.IsGeneration'),
    },
  ];

  public tableColumns: ColumnsType<UserType> = [
    {
      key: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
      dataIndex: 'name',
    },
    {
      key: 'translate',
      className: 'hasTile',
      dataIndex: 'translate',
      render: TranslateRenderer,
      title: i18n.t('UserType.Field.Language'),
    },
    {
      key: 'discount_percentage',
      className: 'number hasTile',
      dataIndex: 'discount_percentage',
      title: i18n.t('UserType.Field.DiscountPercentage'),
    },
    {
      key: 'min_point',
      title: i18n.t('UserType.Field.MinPoint'),
      dataIndex: 'min_point',
      className: 'number',
    },
    {
      key: 'bonus_type',
      className: 'hasTile',
      dataIndex: 'bonus_type',
      title: i18n.t('UserType.Field.BonusType'),
    },
    {
      key: 'bonus_value',
      dataIndex: 'bonus_value',
      title: i18n.t('UserType.Field.BonusValue'),
    },
    {
      key: 'period_type',
      className: 'hasTile',
      dataIndex: 'period_type',
      title: i18n.t('UserType.Field.PeriodType'),
    },
    {
      key: 'min_period',
      dataIndex: 'min_period',
      className: 'number hasTile',
      title: i18n.t('UserType.Field.MinPeriod'),
    },
    {
      width: 150,
      key: 'with_number_of_generations',
      title: i18n.t('UserType.Field.WithNumberOfGenerations'),
      dataIndex: 'with_number_of_generations',
      className: 'number',
    },
  ];

  public UserTypeBonusTypes = [
    { label: i18n.t('UserType.Field.Point'), value: 'point' },
    { label: i18n.t('UserType.Field.Percentage'), value: 'percentage' },
  ];

  public UserTypeMinPeriodTypes = [
    { label: i18n.t('UserType.Field.Day'), value: 'day' },
    { label: i18n.t('UserType.Field.Month'), value: 'month' },
    { label: i18n.t('UserType.Field.Year'), value: 'year' },
  ];
}

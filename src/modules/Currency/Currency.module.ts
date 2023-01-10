import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { Currency } from './model/currency.entity';
import ModuleInfo from './ModuleInfo.json';

export default class CurrencyModule implements FactoryModule<Currency> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChant_Light';
  public title = [i18n.t('Currency.Title'), i18n.t('Currency.Title', { count: 2 })];
  public apiService = new ApiBuilder<Currency>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/CurrencyUpsert'));

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
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'iso3',
      label: i18n.t('Currency.Field.Iso'),
    },
    {
      key: 'symbol',
      label: i18n.t('Currency.Field.Symbol'),
    },
    {
      key: 'ratio',
      label: i18n.t('Currency.Field.Ratio'),
    },
    {
      key: 'is_active',
      label: i18n.t('Global.IsActive'),
    },
    {
      key: 'is_default',
      label: i18n.t('Global.IsDefault'),
    },
  ];

  public tableColumns = [
    {
      width: 150,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 150,
      key: 'ratio',
      dataIndex: 'ratio',
      className: 'number hasTile',
      title: i18n.t('Currency.Field.Ratio'),
    },
    {
      width: 150,
      key: 'iso3',
      dataIndex: 'iso3',
      className: 'hasTile',
      title: i18n.t('Currency.Field.Iso'),
    },
    {
      width: 150,
      key: 'symbol',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('Currency.Field.Symbol'),
    },
  ];
}

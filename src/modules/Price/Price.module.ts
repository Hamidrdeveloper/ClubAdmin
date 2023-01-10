import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React, { lazy } from 'react';

import { NameRenderer } from './components/TableComponents';
import { Price } from './model/price.entity';
import moduleInfo from './ModuleInfo.json';

export default class PriceModule implements FactoryModule<Price> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetEventStatus';
  public title = [i18n.t('Price.Title'), i18n.t('Price.Title', { count: 2 })];
  public apiService = new ApiBuilder<Price>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/PriceUpsert'));

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
      key: 'interval',
      label: i18n.t('Price.Field.Interval'),
    },
    {
      key: 'display_for_new_item',
      label: i18n.t('Price.Field.DisplayForNewItem'),
    },
    {
      key: 'min_quantity',
      label: i18n.t('Price.Field.MinQuantity'),
    },
    {
      key: ['currency', 'name'],
      label: i18n.t('Price.Field.CurrencyName'),
    },
    {
      key: ['priceType', 'name'],
      label: i18n.t('Price.Field.PriceType'),
    },
  ];

  public tableColumns = [
    {
      width: 120,
      key: 'name',
      dataIndex: 'name',
      render: NameRenderer,
      className: 'hasTile',
      title: i18n.t('Global.Name'),
      ellipsis: { showTitle: false },
    },
    {
      width: 120,
      key: 'interval',
      dataIndex: 'interval',
      className: ' hasTile',
      title: i18n.t('Price.Field.Interval'),
    },
    {
      width: 180,
      key: 'min_quantity',
      dataIndex: 'min_quantity',
      className: 'number hasTile',
      title: i18n.t('Price.Field.MinQuantity'),
    },
    {
      width: 120,
      key: 'unit_price',
      dataIndex: 'unit_price',
      className: 'number hasTile',
      title: i18n.t('Price.Field.UnitPrice'),
    },
    {
      width: 150,
      key: 'currency_name',
      className: 'hasTile',
      dataIndex: ['currency', 'name'],
      title: i18n.t('Price.Field.CurrencyName'),
    },
    {
      key: 'price_type',
      className: 'hasTile',
      dataIndex: ['priceType', 'name'],
      title: i18n.t('Price.Field.PriceType'),
    },
  ];

  public PriceIntervalTypes: { label: string; value: string }[] = [
    { label: 'None', value: 'none' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Half-Year', value: 'half-year' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
  ];
}

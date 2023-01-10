import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { DetailsToolTipRenderer, TaxRenderer, ToolTipRenderer } from './components/TableComponents';
import { Country } from './model/country.entity';
import moduleInfo from './ModuleInfo.json';

export default class CountryModule implements FactoryModule<Country> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChant_Vibrate';
  public title = [i18n.t('Country.Title'), i18n.t('Country.Title', { count: 2 })];
  public apiService = new ApiBuilder<Country>(this.entity, this.title[0]);

  public UpsertComponent: FC = lazy(() => import('./containers/CountryUpsert'));

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
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'iso2',
      label: i18n.t('Country.Field.Iso2'),
    },
    {
      key: 'iso3',
      label: i18n.t('Country.Field.Iso3'),
    },
    {
      key: ['currency', 'name'],
      label: i18n.t('Country.Field.CurrencyName'),
      render: DetailsToolTipRenderer,
    },
    {
      key: 'default_warranty_days',
      label: i18n.t('Country.Field.DefaultWarrantyDays'),
    },
    {
      key: 'max_tax_free_trade',
      label: i18n.t('Country.Field.MaxTaxFreeTrade'),
    },
    {
      key: 'max_small_business_trade',
      label: i18n.t('Country.Field.MaxSmallBusinessTrade'),
    },
  ];

  public tableColumns = [
    {
      width: 140,
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
      render: ToolTipRenderer,
    },
    {
      width: 80,
      key: 'iso3',
      dataIndex: 'iso3',
      className: 'hasTile',
      title: i18n.t('Country.Field.Iso3'),
    },
    {
      width: 80,
      key: 'iso2',
      dataIndex: 'iso2',
      className: 'hasTile',
      title: i18n.t('Country.Field.Iso2'),
    },
    {
      width: 120,
      key: 'currencyName',
      ellipsis: {
        showTitle: false,
      },
      className: 'hasTile',
      render: ToolTipRenderer,
      dataIndex: ['currency', 'name'],
      title: i18n.t('Country.Field.CurrencyName'),
    },
    {
      width: 160,
      key: 'critic_type',
      className: 'number hasTile',
      dataIndex: 'default_warranty_days',
      title: i18n.t('Country.Field.DefaultWarrantyDays'),
    },
    {
      width: 150,
      render: TaxRenderer,
      key: 'max_tax_free_trade',
      className: 'number hasTile',
      dataIndex: 'max_tax_free_trade',
      title: i18n.t('Country.Field.MaxTaxFreeTrade'),
    },
    {
      width: 200,
      render: TaxRenderer,
      className: 'number hasTile',
      key: 'max_small_business_trade',
      dataIndex: 'max_small_business_trade',
      title: i18n.t('Country.Field.MaxSmallBusinessTrade'),
    },
  ];
}

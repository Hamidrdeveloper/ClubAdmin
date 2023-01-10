import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { TransportationRule } from './model/transportationrule.entity';
import ModuleInfo from './ModuleInfo.json';

export default class TransportationRuleModule implements FactoryModule<TransportationRule> {
  public entity = '/transportation-rules';
  public title = [i18n.t('TransportationRule.Title'), i18n.t('TransportationRule.Title', { count: 2 })];
  public apiService = new ApiBuilder<TransportationRule>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/TransportationRuleUpsert'));

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
      key: 'country_id',
      label: i18n.t('TransportationRule.Field.CountryId'),
    },
    {
      key: 'min_partner_amount',
      label: i18n.t('TransportationRule.Field.MinPartnerAmountGross'),
    },
    {
      key: 'partner_cost',
      label: i18n.t('TransportationRule.Field.PartnerCostNet'),
    },
    {
      key: 'min_customer_amount',
      label: i18n.t('TransportationRule.Field.MinCustomerAmount'),
    },
    {
      key: 'customer_cost',
      label: i18n.t('TransportationRule.Field.CustomerCost'),
    },
  ];

  public tableColumns = [
    {
      key: 'countryName',
      className: 'hasTile',
      title: i18n.t('TransportationRule.Field.CountryName'),
      dataIndex: ['country', 'name'],
    },
    {
      key: 'min_partner_amount',
      className: 'hasTile number',
      dataIndex: 'min_partner_amount',
      title: i18n.t('TransportationRule.Field.MinPartnerAmountGross'),
    },
    {
      key: 'partner_cost',
      dataIndex: 'partner_cost',
      className: 'hasTile number',
      title: i18n.t('TransportationRule.Field.PartnerCostNet'),
    },
    {
      key: 'min_customer_amount',
      className: 'hasTile number',
      dataIndex: 'min_customer_amount',
      title: i18n.t('TransportationRule.Field.MinCustomerAmount'),
    },
    {
      key: 'customer_cost',
      dataIndex: 'customer_cost',
      className: 'hasTile number',
      title: i18n.t('TransportationRule.Field.CustomerCost'),
    },
  ];
}

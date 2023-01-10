import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactElement, lazy } from 'react';

import { TreeLink } from './components/TableComponents';
import { Partner } from './model/partner.entity';
import moduleInfo from './ModuleInfo.json';

export default class PartnerModule implements FactoryModule<Partner> {
  public entity = '/partners';
  public title = [i18n.t('Partner.Title'), i18n.t('Partner.Title', { count: 2 })];
  public apiService = new ApiBuilder<Partner>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/PartnerUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'bank_name',
      label: i18n.t('Partner.Field.BankName'),
    },
    {
      key: 'transportation_ratio_percentage',
      label: i18n.t('Partner.Field.TransportationRatioPercentage'),
    },
    {
      key: 'warranty_days',
      label: i18n.t('Partner.Field.WarrantyDays'),
    },
    {
      key: 'max_client_root',
      label: i18n.t('Partner.Field.MaxClientRoot'),
    },
    {
      key: 'is_active',
      label: i18n.t('Global.IsActive'),
    },
    {
      key: 'has_delivery ',
      label: i18n.t('Partner.Field.HasDelivery'),
    },
    {
      key: 'has_warehouse',
      label: i18n.t('Partner.Field.HasWarehouse'),
    },
    {
      key: 'post_delivery_factor ',
      label: i18n.t('Partner.Field.PostDeliveryFactor'),
    },
    {
      key: 'inhouse_sale',
      label: i18n.t('Partner.Field.InHouseSale'),
    },
    {
      key: 'can_see_down_line',
      label: i18n.t('Partner.Field.CanSeeDowLine'),
    },
    {
      key: 'over_personal_turnover',
      label: i18n.t('Partner.Field.OverPersonalTurnover'),
    },
    {
      key: 'is_approved',
      label: i18n.t('Global.IsApproved'),
    },
    {
      key: 'send_vat_responsible',
      label: i18n.t('Partner.Field.SendVatResponsible'),
    },
    {
      key: 'receive_vat_responsible',
      label: i18n.t('Partner.Field.ReceiveVat'),
    },
    {
      key: 'can_buy',
      label: i18n.t('Partner.Field.CanBuy'),
    },
    {
      key: 'receive_commission',
      label: i18n.t('Partner.Field.ReceiveCommission'),
    },
    {
      key: 'active_training_bonus',
      label: i18n.t('Partner.Field.ActiveTrainingBonus'),
    },
    {
      key: 'active_auto_bonus',
      label: i18n.t('Partner.Field.ActiveAutoBonus'),
    },
  ];

  public tableColumns: ColumnsType<Partner> = [
    {
      key: 'user',
      title: i18n.t('Partner.Field.User'),
      dataIndex: ['user', 'person', 'full_name'],
      width: 250,
      className: 'hasTile',
    },
    {
      width: 100,
      key: 'user_id',
      dataIndex: 'user_id',
      className: 'hasTile',
      title: i18n.t('Partner.Field.Action'),
      render: (_: number, data: Partner): ReactElement => TreeLink(data.id),
    },
  ];
}

import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { FC, lazy } from 'react';

import { CodesRenderer, DateRenderer, DescriptionRenderer } from './components/TableComponents';
import { Coupon } from './model/coupon.entity';
import moduleInfo from './ModuleInfo.json';

export default class CouponModule implements FactoryModule<Coupon> {
  public entity = '/coupons';
  public title = [i18n.t('Coupon.Title'), i18n.t('Coupon.Title', { count: 2 })];
  public apiService = new ApiBuilder<Coupon>(this.entity, this.title[0]);

  public UpsertComponent: FC = lazy(() => import('./container/CouponUpsert'));

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
      key: ['partner', 'fullname'],
      label: i18n.t('Global.Partner'),
    },
    {
      key: 'amount',
      label: i18n.t('Global.Amount'),
    },
    {
      key: 'available_until',
      render: DateRenderer,
      label: i18n.t('Coupon.Field.AvailableUntil'),
    },
    {
      key: 'max_quantity_each_user',
      label: i18n.t('Coupon.Field.MaxQuantityEachUser'),
    },
    {
      key: 'quantity',
      label: i18n.t('Global.Quantity'),
    },
    {
      key: 'type',
      label: i18n.t('Global.Type'),
    },
    {
      key: 'used_quantity',
      label: i18n.t('Coupon.Field.UsedQuantity'),
    },
    {
      key: 'is_active',
      label: i18n.t('Global.IsActive'),
    },
    {
      key: 'release_date',
      render: DateRenderer,
      label: i18n.t('Coupon.Field.ReleaseDate'),
    },
    {
      key: 'first_order',
      label: i18n.t('Coupon.Field.FirstOrder'),
    },
    {
      key: 'description',
      render: DescriptionRenderer,
      label: i18n.t('Global.Description'),
    },
  ];

  public tableColumns: TableColumnsType = [
    {
      width: 150,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 150,
      key: 'partner',
      dataIndex: ['partner', 'fullname'],
      className: 'hasTile',
      title: i18n.t('Global.Partner'),
    },
    {
      width: 150,
      key: 'amount',
      dataIndex: 'amount',
      className: 'number hasTile',
      title: i18n.t('Global.Amount'),
      align: 'center',
    },
    {
      width: 150,
      key: 'used_quantity',
      dataIndex: 'used_quantity',
      className: 'number hasTile',
      title: i18n.t('Coupon.Field.UsedQuantity'),
      align: 'center',
    },
    {
      width: 100,
      key: 'quantity',
      dataIndex: 'quantity',
      className: 'hasTile',
      title: i18n.t('Global.Quantity'),
      align: 'center',
    },
    {
      width: 180,
      key: 'couponCodes',
      render: CodesRenderer,
      dataIndex: 'couponCodes',
      className: 'hasTile',
      title: i18n.t('Coupon.Field.Codes'),
      align: 'center',
    },
  ];
}

import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React, { lazy } from 'react';

import {
  DateRenderer,
  DetailDateRenderer,
  DetailImageRenderer,
  ImageRenderer,
  NullRenderer,
} from './components/TableComponents';
import { Product } from './model/Product.entity';
import moduleInfo from './ModuleInfo.json';

export default class ProductModule implements FactoryModule<Product> {
  public entity = '/products';
  public title = [i18n.t('Product.Title'), i18n.t('Product.Title', { count: 2 })];
  public apiService = new ApiBuilder<Product>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/ProductUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'file',
      label: i18n.t('Product.Field.Image'),
      render: DetailImageRenderer,
    },

    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'number',
      label: i18n.t('Global.Number'),
    },
    {
      key: 'maximum_sale_for_each_user',
      label: i18n.t('Product.Field.MaxSaleForEachUser'),
    },
    {
      key: 'default_vat',
      label: i18n.t('Product.Field.DefaultVat'),
    },
    {
      key: 'interval_order_quantity',
      label: i18n.t('Product.Field.IntervalOrderQuantity'),
    },
    {
      key: 'max_order_quantity',
      label: i18n.t('Product.Field.MaxOrderQuantity'),
    },
    {
      key: 'release_date',
      render: DetailDateRenderer,
      label: i18n.t('Product.Field.ReleaseDate'),
    },
    {
      key: 'available_until',
      render: DetailDateRenderer,
      label: i18n.t('Product.Field.AvailableUntil'),
    },
    {
      key: 'price_visible',
      label: i18n.t('Product.Field.PriceVisible'),
    },
    {
      key: 'auto_active_net_stock',
      label: i18n.t('Product.Field.AutoActiveNetStock'),
    },
    {
      key: 'auto_deactive_net_stock',
      label: i18n.t('Product.Field.AutoDeactiveNetStock'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      title: i18n.t('Global.Name'),
      dataIndex: 'name',
      width: 250,
      className: 'hasTile',
    },
    {
      width: 50,
      key: 'file',
      dataIndex: 'file',
      className: 'hasTile mainImage',
      render: ImageRenderer,
      title: i18n.t('Product.Field.Image'),
    },
    {
      sorter: true,
      key: 'number',
      title: i18n.t('Global.Number'),
      dataIndex: 'number',
      className: 'hasTile',
      width: 100,
    },
    {
      className: 'hasTile',
      render: NullRenderer,
      key: 'min_order_quantity',
      dataIndex: 'min_order_quantity',
      title: i18n.t('Product.Field.MinOrderQuantity'),
    },
    {
      className: 'hasTile',
      render: NullRenderer,
      key: 'max_order_quantity',
      dataIndex: 'max_order_quantity',
      title: i18n.t('Product.Field.MaxOrderQuantity'),
    },
    {
      render: DateRenderer,
      className: 'hasTile',
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Product.Field.AvailableUntil'),
    },
    {
      key: 'release_date',
      render: DateRenderer,
      className: 'hasTile',
      dataIndex: 'release_date',
      title: i18n.t('Product.Field.ReleaseDate'),
    },
  ];
}

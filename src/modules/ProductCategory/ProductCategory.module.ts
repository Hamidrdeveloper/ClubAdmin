import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React, { lazy } from 'react';

import { ProductCategory } from './model/productCategory.entity';
import moduleInfo from './ModuleInfo.json';

export default class ProductCategoryModule implements FactoryModule<ProductCategory> {
  public entity = '/product-categories';
  public title = [i18n.t('ProductCategory.Title'), i18n.t('ProductCategory.Title', { count: 2 })];
  public apiService = new ApiBuilder<ProductCategory>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/ProductCategoryUpsert'));

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
      key: ['parent', 'name'],
      label: i18n.t('ProductCategory.Field.Parent'),
    },
  ];

  public tableColumns = [
    {
      width: 280,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 100,
      key: 'parent',
      className: 'hasTile',
      dataIndex: ['parent', 'name'],
      title: i18n.t('ProductCategory.Field.Parent'),
    },
    {
      width: 100,
      key: 'sort',
      dataIndex: 'sort',
      className: 'hasTile',
      title: i18n.t('ProductCategory.Field.Order'),
    },
  ];
}

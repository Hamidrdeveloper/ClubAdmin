import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import React, { lazy } from 'react';

import { ProductVariation } from './model/ProductVariation.entity';
import { TooltipRenderer } from './VariationList/components/TableComponents';

export default class VariationModule implements FactoryModule<ProductVariation> {
  public entity = '/product-variations';
  public title = [i18n.t('Product.Variation.Title'), i18n.t('Product.Variation.Title', { count: 2 })];
  public apiService = new ApiBuilder<ProductVariation>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/ProductUpsert'));

  breadcrumbItems = [];
  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  public tableColumns: ColumnsType = [
    {
      width: 200,
      key: 'number',
      dataIndex: 'number',
      className: 'number hasTile',
      title: i18n.t('Product.Variation.Field.Number'),
      align: 'center',
    },
    {
      width: 250,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      ellipsis: {
        showTitle: false,
      },
      render: TooltipRenderer,
      title: i18n.t('Global.Name'),
    },
  ];
}

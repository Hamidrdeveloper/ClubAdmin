import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer, PointRenderer, TooltipRenderer } from './components/TableComponents';
import { Variation } from './model/variationList.entity';

export default class VariationListModule implements FactoryModule<Variation> {
  public entity;
  public apiService;

  public title = [i18n.t('Product.Variation.Title'), i18n.t('Product.Variation.Title', { count: 2 })];

  constructor(productId: number | null) {
    if (productId) {
      this.entity = `/product-variations?productId=${productId}`;
      this.apiService = new ApiBuilder<Variation>(this.entity, this.title[0]);
    }
  }

  public breadcrumbItems = [];
  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  public tableColumns = [
    {
      width: 140,
      key: 'number',
      dataIndex: 'number',
      className: 'number hasTile',
      title: i18n.t('Product.Variation.Field.Number'),
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
    {
      width: 120,
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
    {
      width: 100,
      key: 'quantity',
      dataIndex: 'quantity',
      className: 'number hasTile',
      title: i18n.t('Product.Variation.Field.Quantity'),
    },
    {
      width: 100,
      key: 'point',
      dataIndex: 'point',
      render: PointRenderer,
      className: 'number hasTile',
      title: i18n.t('Product.Variation.Field.Point'),
    },
    {
      width: 170,
      key: 'release_date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'release_date',
      title: i18n.t('Product.Variation.Field.ReleaseDate'),
    },
    {
      width: 150,
      className: 'hasTile',
      render: DateRenderer,
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Product.Variation.Field.AvailableUntil'),
    },
  ];
}

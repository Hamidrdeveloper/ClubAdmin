import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { weightFormatter } from '@src/shared/utils/engine.service';
import { lazy } from 'react';

import { dimensionFormatter } from './../../shared/utils/engine.service';
import { Package } from './model/package.entity';
import ModuleInfo from './ModuleInfo.json';

export default class PackageModule implements FactoryModule<Package> {
  public entity = '/packages';
  public title = [i18n.t('Package.Title'), i18n.t('Package.Title', { count: 2 })];
  public apiService = new ApiBuilder<Package>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/PackageUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: ['packingType', 'name'],
      label: i18n.t('Package.Field.PackingType'),
    },
    {
      key: 'length',
      label: i18n.t('Package.Field.Length'),
    },
    {
      key: 'width',
      label: i18n.t('Package.Field.Width'),
    },
    {
      key: 'height',
      label: i18n.t('Package.Field.Height'),
    },
    {
      key: 'net_weight',
      label: i18n.t('Package.Field.NetWeight'),
    },
    {
      key: 'gross_weight',
      label: i18n.t('Package.Field.GrossWeight'),
    },
  ];

  public tableColumns = [
    {
      key: 'length',
      title: i18n.t('Package.Field.Length'),
      dataIndex: 'length',
      className: 'number hasTile',
      width: 120,
      render: (length: number): string => dimensionFormatter(length),
    },
    {
      key: 'width',
      title: i18n.t('Package.Field.Width'),
      dataIndex: 'width',
      className: 'number hasTile',
      width: 120,
      render: (width: number): string => dimensionFormatter(width),
    },
    {
      key: 'height',
      title: i18n.t('Package.Field.Height'),
      dataIndex: 'height',
      className: 'number hasTile',
      width: 120,
      render: (height: number): string => dimensionFormatter(height),
    },
    {
      key: 'net_weight',
      title: i18n.t('Package.Field.NetWeight'),
      dataIndex: 'net_weight',
      className: 'number hasTile',
      width: 120,
      render: (net_weight: number): string => weightFormatter(net_weight),
    },
    {
      key: 'gross_weight',
      title: i18n.t('Package.Field.GrossWeight'),
      dataIndex: 'gross_weight',
      className: 'number hasTile',
      width: 120,
      render: (gross_weight: number): string => weightFormatter(gross_weight),
    },
    {
      key: 'packing_type_id',
      title: i18n.t('Package.Field.PackingType'),
      dataIndex: ['packingType', 'name'],
      className: 'hasTile',
    },
  ];
}

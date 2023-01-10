import i18n from '@core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React, { lazy } from 'react';

import { PackingType } from './model/packingType.entity';
import moduleInfo from './ModuleInfo.json';

export default class PackingTypeModule implements FactoryModule<PackingType> {
  public entity = '/packing-types';
  public title = [i18n.t('PackingType.Title'), i18n.t('PackingType.Title', { count: 2 })];
  public apiService = new ApiBuilder<PackingType>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/PackingTypeUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns: DetailColumnTypes[] = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      title: i18n.t('Global.Name'),
      dataIndex: 'name',
      className: 'hasTile',
    },
  ];
}

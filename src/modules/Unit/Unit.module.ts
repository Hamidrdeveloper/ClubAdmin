import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React, { lazy } from 'react';

import { Unit } from './model/unit.entity';
import moduleInfo from './ModuleInfo.json';

export default class UnitModule implements FactoryModule<Unit> {
  public entity = '/units';
  public title = [i18n.t('Unit.Title'), i18n.t('Unit.Title', { count: 2 })];
  public apiService = new ApiBuilder<Unit>(this.entity, this.title[0]);

  public UpsertComponent: React.FC = lazy(() => import('./containers/UnitUpsert'));

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
      key: 'slug',
      label: i18n.t('Unit.Field.Slug'),
    },
    {
      key: 'symbol',
      label: i18n.t('Unit.Field.Symbol'),
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
      width: 150,
      key: 'slug',
      dataIndex: 'slug',
      className: 'hasTile',
      title: i18n.t('Unit.Field.Slug'),
    },
    {
      width: 100,
      key: 'symbol',
      dataIndex: 'symbol',
      className: 'hasTile',
      title: i18n.t('Unit.Field.Symbol'),
    },
  ];
}

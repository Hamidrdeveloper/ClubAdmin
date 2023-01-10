import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Regal } from './model/Regal';

export default class RegalModule implements FactoryModule<Regal> {
  public entity = '/regals';
  public title = [
    i18n.t('Stock.SubModules.Regal.Title'),
    i18n.t('Stock.SubModules.Regal.Title', { count: 2 }),
  ];

  public apiService;
  public UpsertComponent: FC = lazy(() => import('./containers/RegalUpsert'));

  constructor(warehouseId?: string) {
    if (warehouseId) this.entity += `?warehouseId=${warehouseId}`;
    this.apiService = new ApiBuilder<Regal>(this.entity, this.title[0]);
  }

  breadcrumbItems = [];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  public tableColumns = [
    {
      width: 140,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
  ];
}

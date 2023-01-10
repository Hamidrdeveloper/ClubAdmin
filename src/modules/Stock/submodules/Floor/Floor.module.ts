import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Floor } from './model/floor';

export default class FloorModule implements FactoryModule<Floor> {
  public entity = '/floors';
  public title = [
    i18n.t('Stock.SubModules.Floor.Title'),
    i18n.t('Stock.SubModules.Floor.Title', { count: 2 }),
  ];
  public apiService;
  public UpsertComponent: FC = lazy(() => import('./containers/FloorUpsert'));
  constructor(warehouseId?: string) {
    if (warehouseId) this.entity += `?warehouseId=${warehouseId}`;

    this.apiService = new ApiBuilder<Floor>(this.entity, this.title[0]);
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

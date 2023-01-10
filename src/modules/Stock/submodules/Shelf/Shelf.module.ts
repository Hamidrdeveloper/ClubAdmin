import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Shelf } from './model/shelf';

export default class ShelfModule implements FactoryModule<Shelf> {
  public entity = '/shelves';
  public title = [
    i18n.t('Stock.SubModules.Shelf.Title'),
    i18n.t('Stock.SubModules.Shelf.Title', { count: 2 }),
  ];

  public apiService = new ApiBuilder<Shelf>(this.entity, this.title[0]);
  public UpsertComponent: FC = lazy(() => import('./containers/ShelfUpsert'));

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

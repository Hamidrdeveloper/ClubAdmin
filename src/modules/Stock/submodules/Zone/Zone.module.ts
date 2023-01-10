import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Zone } from './model/zone';

export default class ZoneModule implements FactoryModule<Zone> {
  public entity = '/zones';
  public title = [i18n.t('Stock.SubModules.Zone.Title'), i18n.t('Stock.SubModules.Zone.Title', { count: 2 })];

  public apiService = new ApiBuilder<Zone>(this.entity, this.title[0]);
  public UpsertComponent: FC = lazy(() => import('./containers/ZoneUpsert'));

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

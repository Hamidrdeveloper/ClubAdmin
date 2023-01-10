import i18n from '@src/core/i18n/config';
import DateRenderer from '@src/shared/components/Date/DateRenderer';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Building } from './model/Building';

export default class BuildingModule implements FactoryModule<Building> {
  breadcrumbItems = [];
  public entity = '/buildings';
  public title = [
    i18n.t('Stock.SubModules.Building.Title'),
    i18n.t('Stock.SubModules.Building.Title', { count: 2 }),
  ];
  public apiService = new ApiBuilder<Building>(this.entity, this.title[0]);

  public UpsertComponent: FC = lazy(() => import('./containers/BuildingUpsert'));

  detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  tableColumns = [
    {
      width: 150,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'updated_at',
      render: DateRenderer,
      dataIndex: 'updated_at',
      title: i18n.t('Stock.SubModules.Building.UpdatedAt'),
    },
    {
      key: 'created_at',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Stock.SubModules.Building.CreatedAt'),
    },
  ];
}

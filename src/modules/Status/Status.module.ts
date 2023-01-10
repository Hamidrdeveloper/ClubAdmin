import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { RenderColor } from './components/TableComponents';
import { Status } from './model/status.entity';
import moduleInfo from './ModuleInfo.json';

export default class StatusModule implements FactoryModule<Status> {
  public entity = '/order-statuses';
  public title = [i18n.t('Status.Title'), i18n.t('Status.Title', { count: 2 })];
  public apiService = new ApiBuilder<Status>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/StatusUpsert'));

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
      key: 'number',
      label: i18n.t('Status.Field.Number'),
    },
    {
      key: 'color',
      label: i18n.t('Status.Field.Color'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      width: 200,
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'number',
      width: 100,
      dataIndex: 'number',
      className: 'hasTile',
      title: i18n.t('Status.Field.Number'),
    },
    {
      width: 90,
      key: 'color',
      dataIndex: 'color',
      render: RenderColor,
      className: 'hasTile',
      title: i18n.t('Status.Field.Color'),
    },
  ];
}

import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ReactElement } from 'react';

import { DateRenderer, DetailDateRenderer, EventLink } from './components/TableComponents';
import { Calendar } from './model/calendar.entity';
import moduleInfo from './ModuleInfo.json';

export default class CalendarModule implements FactoryModule<Calendar> {
  public entity = '/calendars';
  public title = [i18n.t('Calendar.Title'), i18n.t('Calendar.Title', { count: 2 })];
  public apiService = new ApiBuilder<Calendar>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'created_at',
      render: DetailDateRenderer,
      label: i18n.t('Calendar.CreatedAt'),
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
    {
      width: 140,
      className: 'hasTile',
      key: 'created_at',
      dataIndex: 'created_at',
      render: DateRenderer,
      title: i18n.t('Calendar.CreatedAt'),
    },
    {
      key: 'user_id',
      title: 'Action',
      dataIndex: 'user_id',
      className: 'hasTile',
      width: 100,
      render: (_: number, data: Calendar): ReactElement => EventLink(data.id),
    },
  ];
}

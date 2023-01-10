import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer } from './components/TableComponents';
import { CalendarCategory } from './model/calendar.entity';
import moduleInfo from './ModuleInfo.json';

export default class CalendarCategoryModule implements FactoryModule<CalendarCategory> {
  public entity = '/calendar-categories';
  public title = [i18n.t('Calendar.Category.Title'), i18n.t('Calendar.Category.Title', { count: 2 })];
  public apiService = new ApiBuilder<CalendarCategory>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}category`,
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
      key: 'slug',
      dataIndex: 'slug',
      className: 'hasTile',
      title: i18n.t('Calendar.Category.Field.Slug'),
    },
    {
      width: 140,
      key: 'parent',
      dataIndex: ['parent', 'name'],
      className: 'hasTile',
      title: i18n.t('Calendar.Category.Field.Parent'),
    },
    {
      width: 140,
      className: 'hasTile',
      key: 'created_at',
      dataIndex: 'created_at',
      render: DateRenderer,
      title: i18n.t('Calendar.CreatedAt'),
    },
  ];
}

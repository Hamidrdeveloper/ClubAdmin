import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer } from './components/TableComponents';
import { LoginLogs } from './model/loginLogs.entity';
import moduleInfo from './ModuleInfo.json';

export default class LoginLogsModule implements FactoryModule<LoginLogs> {
  public entity = '/login-logs';
  public title = [i18n.t('LoginLogs.Title'), i18n.t('LoginLogs.Title', { count: 2 })];
  public apiService = new ApiBuilder<LoginLogs>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns;

  public tableColumns = [
    {
      key: 'provider',
      dataIndex: 'provider',
      title: i18n.t('LoginLogs.Field.Provider'),
    },
    {
      key: 'ip',
      dataIndex: 'ip',
      title: i18n.t('Global.IP'),
    },
    {
      key: 'created_at',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
    },
    {
      key: 'user_agent',
      dataIndex: 'user_agent',
      title: i18n.t('LoginLogs.Field.UserAgent'),
    },
  ];
}

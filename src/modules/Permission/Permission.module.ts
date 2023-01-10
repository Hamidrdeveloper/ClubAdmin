import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { Permission } from './model/permission.entity';
import ModuleInfo from './ModuleInfo.json';

export default class PermissionModule implements FactoryModule<Permission> {
  public entity = '/permissions';
  public title = [i18n.t('Permission.Title'), i18n.t('Permission.Title', { count: 2 })];
  public apiService = new ApiBuilder<Permission>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [];

  public tableColumns = [];
}

import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';

import { DHLModel } from './model/dhl.entity';
import moduleInfo from './ModuleInfo.json';

export default class DHLModule implements FactoryModule<DHLModel> {
  public entity;
  public title = [i18n.t('DHL.Title'), i18n.t('DHL.Title', { count: 2 })];
  public apiService;

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns;
  public tableColumns;
}

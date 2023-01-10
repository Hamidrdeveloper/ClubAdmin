import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';

import { DPDModel } from './model/dpd.entity';
import moduleInfo from './ModuleInfo.json';

export default class DPDModule implements FactoryModule<DPDModel> {
  public entity;
  public title = [i18n.t('DPD.Title'), i18n.t('DPD.Title', { count: 2 })];
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

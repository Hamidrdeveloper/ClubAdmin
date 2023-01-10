import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { ShippingMethod } from './model/shippingMethod.entity';
import moduleInfo from './ModuleInfo.json';

export default class ShippingMethodModule implements FactoryModule<ShippingMethod> {
  public entity = '/shipping-methods';
  public title = [i18n.t('ShippingMethod.Title'), i18n.t('ShippingMethod.Title', { count: 2 })];
  public apiService = new ApiBuilder<ShippingMethod>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [];

  public tableColumns = [];
}

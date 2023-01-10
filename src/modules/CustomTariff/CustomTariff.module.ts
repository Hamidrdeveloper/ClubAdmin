import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { CustomTariff } from './model/customTariff.entity';
import ModuleInfo from './ModuleInfo.json';

export default class CustomTariffModule implements FactoryModule<CustomTariff> {
  public entity = '/custom-tariffs';
  public title = [i18n.t('CustomTariff.Title'), i18n.t('CustomTariff.Title', { count: 2 })];
  public apiService = new ApiBuilder<CustomTariff>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/CustomTariffUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'number',
      label: 'Number',
    },
    {
      key: 'value',
      label: i18n.t('Global.Value'),
    },
  ];

  public tableColumns = [
    {
      key: 'number',
      title: i18n.t('CustomTariff.Field.Number'),
      dataIndex: 'number',
      className: 'hasTile',
      width: 140,
    },

    {
      key: 'value',
      title: i18n.t('CustomTariff.Field.Value'),
      dataIndex: 'value',
      className: 'hasTile',
    },
  ];
}

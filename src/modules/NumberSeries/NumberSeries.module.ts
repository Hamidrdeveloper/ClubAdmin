import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { NumberSeries, NumberSeriesType } from './model/numberSeries.entity';
import ModuleInfo from './ModuleInfo.json';

export default class NumberSeriesModule implements FactoryModule<NumberSeries> {
  public entity = '/number-series';
  public title = [i18n.t('NumberSeries.Title'), i18n.t('NumberSeries.Title', { count: 2 })];
  public apiService = new ApiBuilder<NumberSeries>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/NumberSeriesUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('NumberSeries.Field.Name'),
    },

    {
      key: 'active_manual',
      label: i18n.t('NumberSeries.Field.ActiveManual'),
    },
    {
      key: 'date_order',
      label: i18n.t('NumberSeries.Field.DateOrder'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      width: 90,
      title: i18n.t('Global.Name'),
      className: 'hasTile ',
      dataIndex: 'name',
    },

    {
      key: 'slug',
      width: 180,
      title: i18n.t('NumberSeries.Field.Type'),
      dataIndex: ['numberSeriesType', 'slug'],
    },
  ];
}

export class NumberSeriesTypeModule implements FactoryModule<NumberSeriesType>{
  public entity = '/number-series-types';
  public title = [i18n.t('NumberSeries.Field.Type'), i18n.t('NumberSeries.Field.Type', { count: 2 })];
  public apiService = new ApiBuilder<NumberSeriesType>(this.entity, this.title[0]);
  breadcrumbItems;
  public detailColumns;
  public tableColumns;
}

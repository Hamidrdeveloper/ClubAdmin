import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { RenderTranslate } from './components/TableComponents';
import { VariationCategory } from './model/variationCategory.entity';
import moduleInfo from './ModuleInfo.json';

export default class VariationCategoryModule implements FactoryModule<VariationCategory> {
  public entity = '/product-variation-categories';
  public title = [i18n.t('VariationCategory.Title'), i18n.t('VariationCategory.Title', { count: 2 })];
  public apiService = new ApiBuilder<VariationCategory>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/VariationCategoryUpsert'));

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
  ];

  public tableColumns = [
    {
      width: 280,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 280,
      key: 'translate',
      dataIndex: 'translate',
      render: RenderTranslate,
      title: i18n.t('VariationCategory.Field.Language'),
    },
  ];
}

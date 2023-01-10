import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { Template } from './model/template.entity';
import moduleInfo from './ModuleInfo.json';

export default class TemplateModule implements FactoryModule<Template> {
  public entity = '/templates';
  public title = [i18n.t('Template.Title'), i18n.t('Template.Title', { count: 2 })];
  public apiService = new ApiBuilder<Template>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/TemplateUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public tableColumns = [
    {
      width: 140,
      key: 'slug',
      dataIndex: 'slug',
      className: 'hasTile',
      title: i18n.t('Template.Field.Slug'),
    },
    {
      width: 200,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Title'),
    },

    // {
    //   width: 150,
    //   key: 'body',
    //   dataIndex: 'body',
    //   className: 'hasTile',
    //   render: BodyRenderer,
    //   title: i18n.t('Template.Field.Body'),
    // },
    // {
    //   width: 200,
    //   key: 'summary',
    //   dataIndex: 'summary',
    //   title: i18n.t('Template.Field.Summary'),
    // },
  ];

  public detailColumns = [
    {
      key: 'slug',
      label: i18n.t('Template.Field.Slug'),
    },
    {
      key: 'title',
      label: i18n.t('Global.Title'),
    },
    // {
    //   key: 'body',
    //   render: DetailsBodyRenderer,
    //   label: i18n.t('Template.Field.Body'),
    // },
    // {
    //   key: 'summary',
    //   label: i18n.t('Template.Field.Summary'),
    // },
  ];
}

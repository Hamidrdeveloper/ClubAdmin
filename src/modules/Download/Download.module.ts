import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { lazy } from 'react';

import { DateRenderer, ImageRenderer } from './components/TableComponents';
import { DownloadCategoryModel } from './model/DownloadCategory.entity';
import moduleInfo from './ModuleInfo.json';

export default class DownloadCategoryModule implements FactoryModule<DownloadCategoryModel> {
  public entity = '/download-categories';
  public detailColumns: DetailColumnTypes[];
  public title = [i18n.t('Download.Category.Title'), i18n.t('Download.Category.Title', { count: 2 })];
  public apiService = new ApiBuilder<DownloadCategoryModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./container/DownloadCategoryUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public tableColumns: ColumnsType<DownloadCategoryModel> = [
    {
      key: 'slug',
      dataIndex: 'slug',
      className: 'hasTile',
      title: i18n.t('Download.Category.Slug'),
    },
    {
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'created_at',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
    },
    {
      key: 'file_path',
      render: ImageRenderer,
      dataIndex: 'file_path',
      title: i18n.t('Global.Image'),
      className: 'hasTile mainImage',
    },
  ];
}

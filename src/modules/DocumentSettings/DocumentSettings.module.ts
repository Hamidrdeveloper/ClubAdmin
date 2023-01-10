import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { PreviewButtonRenderer, ResetToDefaultButtonRenderer } from './components/TableComponents';
import { DocumentSettingsModel } from './model/DocumentSettings.entity';
import moduleInfo from './ModuleInfo.json';

export default class DocumentSettingsModule implements FactoryModule<DocumentSettingsModel> {
  public entity = '/document-setting-templates';
  public title = [i18n.t('DocumentSettings.Title'), i18n.t('DocumentSettings.Title', { count: 2 })];
  public apiService = new ApiBuilder<DocumentSettingsModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./container/DocumentSettings.upsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
      dataIndex: ['translate', '0', 'name'],
    },
    {
      key: 'document_type',
      className: 'hasTile',
      dataIndex: ['documentType', 'name'],
      title: i18n.t('DocumentSettings.DocumentTypeName'),
    },
    {
      dataIndex: 'id',
      key: 'preview-btn',
      className: 'hasTile',
      render: PreviewButtonRenderer,
      title: i18n.t('DocumentSettings.Preview'),
    },
    {
      dataIndex: 'id',
      key: 'preview-btn',
      className: 'hasTile',
      render: ResetToDefaultButtonRenderer,
      title: i18n.t('DocumentSettings.ResetToDefault'),
    },
  ];
}

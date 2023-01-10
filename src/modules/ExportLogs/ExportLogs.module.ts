import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import {
  DateRenderer,
  FileExtensionRenderer,
  FileNameRenderer,
  PreviewButtonRenderer,
} from './component/TableComponents';
import { ExportLogsModel } from './model/ExportLogs.entity';
import moduleInfo from './ModuleInfo.json';

export default class ExportLogsModule implements FactoryModule<ExportLogsModel> {
  public entity = '/export-data-logs';
  public title = [i18n.t('ExportLogs.Title'), i18n.t('ExportLogs.Title', { count: 2 })];
  public apiService = new ApiBuilder<ExportLogsModel>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'created_by',
      label: i18n.t('ExportLogs.ExportedByID'),
    },
    {
      key: 'export_data_setting_id',
      label: i18n.t('ExportLogs.ExportDataSettingID'),
    },
    {
      key: 'file',
      render: FileNameRenderer,
      label: i18n.t('ExportLogs.FileName'),
    },
    {
      key: 'file',
      render: FileExtensionRenderer,
      label: i18n.t('ExportLogs.FileExtension'),
    },
  ];

  public tableColumns = [
    {
      key: 'created_by',
      className: 'hasTile',
      title: i18n.t('ExportLogs.ExportedBy'),
      dataIndex: ['createdBy', 'person', 'full_name'],
    },
    {
      key: 'create_at',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
    },
    {
      className: 'hasTile',
      key: 'export_data_setting_name',
      dataIndex: ['exportDataSetting', 'name'],
      title: i18n.t('ExportLogs.ExportDataSettingName'),
    },
    {
      key: 'file_path',
      className: 'hasTile',
      dataIndex: 'file_path',
      render: PreviewButtonRenderer,
      title: i18n.t('ExportLogs.Preview'),
    },
  ];
}

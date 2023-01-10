import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import {
  DateRenderer,
  ExportDataTypeNameRenderer,
  FilterKeysRenderer,
} from '../ExportTypes/component/TableComponents';
import moduleInfo from '../ExportTypes/ModuleInfo.json';
import { ExportBtn } from './components/TableComponents';
import { ExportSettingModel } from './model/ExportsSettings.entity';

export default class ExportSettingModule implements FactoryModule<ExportSettingModel> {
  public entity = '/export-data-settings';
  public title = [i18n.t('ExportSettings.Title'), i18n.t('ExportSettings.Title', { count: 2 })];
  public apiService = new ApiBuilder<ExportSettingModel>(this.entity, this.title[0]);

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
  ];

  public tableColumns = [
    {
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'data',
      dataIndex: 'data',
      className: 'hasTile',
      render: FilterKeysRenderer,
      title: i18n.t('Global.Data'),
    },
    {
      className: 'hasTile',
      key: 'exportDataType',
      dataIndex: 'exportDataType',
      render: ExportDataTypeNameRenderer,
      title: i18n.t('ExportSettings.ExportDataTypeName'),
    },
    {
      key: 'created_at',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
    },
    {
      dataIndex: 'id',
      key: 'export-btn',
      render: ExportBtn,
      className: 'hasTile',
      title: i18n.t('ExportSettings.Export'),
    },
  ];
}

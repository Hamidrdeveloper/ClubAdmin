import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer, FilterKeysRenderer, TagRenderer } from './component/TableComponents';
import { ExportTypeModel } from './model/ExportsTypes.entity';
import moduleInfo from './ModuleInfo.json';

export default class ExportTypeModule implements FactoryModule<ExportTypeModel> {
  public entity = '/export-data-types';
  public title = [i18n.t('ExportTypes.Title'), i18n.t('ExportTypes.Title', { count: 2 })];
  public apiService = new ApiBuilder<ExportTypeModel>(this.entity, this.title[0]);

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
      key: 'filters',
      dataIndex: 'filters',
      className: 'hasTile',
      render: FilterKeysRenderer,
      title: i18n.t('ExportTypes.Filters'),
    },
    {
      key: 'headers',
      render: TagRenderer,
      dataIndex: 'headers',
      className: 'hasTile',
      title: i18n.t('ExportTypes.Headers'),
    },
    {
      key: 'created_at',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.CreatedAt'),
    },
  ];
}

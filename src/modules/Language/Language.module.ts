import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { Language } from './model/language.entity';
import moduleInfo from './ModuleInfo.json';

export default class LanguageModule implements FactoryModule<Language> {
  public entity = '/languages';
  public title = [i18n.t('Language.Title'), i18n.t('Language.Title', { count: 2 })];
  public apiService = new ApiBuilder<Language>(this.entity, this.title[0]);

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
      key: 'title',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'is_active',
      label: i18n.t('Global.IsActive'),
    },
    {
      key: 'is_default',
      label: i18n.t('Global.IsDefault'),
    },
    {
      key: 'locale',
      label: i18n.t('Language.Field.Locale'),
    },
  ];

  public tableColumns = [
    {
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Title'),
    },
    {
      key: 'locale',
      dataIndex: 'locale',
      className: 'hasTile',
      title: i18n.t('Language.Field.Locale'),
    },
  ];
}

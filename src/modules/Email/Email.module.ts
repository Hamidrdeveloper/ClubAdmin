import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { EmailTemplates } from './model/email.entity';
import ModuleInfo from './ModuleInfo.json';

export default class TemplateModule implements FactoryModule<EmailTemplates> {
  public entity = '/notice-template';
  public title = [i18n.t('Email.Title'), i18n.t('Email.Title', { count: 2 })];
  public apiService = new ApiBuilder<EmailTemplates>(this.entity, this.title[0]);

  public breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'name',
      label: i18n.t('Email.Field.Name'),
    },
  ];

  public tableColumns = [
    {
      width: 250,
      key: 'name',
      dataIndex: 'name',
      title: i18n.t('Global.Name'),
    },
    {
      width: 180,
      key: 'type',
      dataIndex: 'type',
      title: i18n.t('Global.Type'),
    },
  ];
}

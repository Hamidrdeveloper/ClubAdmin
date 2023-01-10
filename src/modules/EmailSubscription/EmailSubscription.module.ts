import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { UnsubscribeButtonRenderer } from './component/TableComponents';
import { EmailSubscriptionModel } from './model/emailSubscription.entity';
import moduleInfo from './ModuleInfo.json';

export default class EmailSubscriptionModule implements FactoryModule<EmailSubscriptionModel> {
  public entity = '/subscribe';
  public title = [i18n.t('EmailSubscription.Title'), i18n.t('EmailSubscription.Title', { count: 2 })];
  public apiService = new ApiBuilder<EmailSubscriptionModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./container/EmailSubscriptionUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns: DetailColumnTypes[];

  public tableColumns = [
    {
      key: 'email',
      dataIndex: 'email',
      className: 'hasTile',
      title: i18n.t('Global.Email'),
    },
    {
      width: 200,
      key: 'unsubscribe',
      dataIndex: 'email',
      className: 'hasTile',
      render: UnsubscribeButtonRenderer,
      title: i18n.t('EmailSubscription.Unsubscribe'),
    },
  ];
}

import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';
import { ImageRenderer } from '../Product/components/TableComponents';

import { PaymentMethod } from './model/paymentMethod.entity';
import ModuleInfo from './ModuleInfo.json';

export default class PaymentMethodModule implements FactoryModule<PaymentMethod> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllTeams';
  public title = [i18n.t('PaymentMethod.Title'), i18n.t('PaymentMethod.Title', { count: 2 })];
  public apiService = new ApiBuilder<PaymentMethod>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/PaymentMethodUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: ['paymentMethodType', 'title'],
      label: i18n.t('PaymentMethod.Field.CreatedAt'),
    },
    {
      key: 'price_id',
      label: i18n.t('PaymentMethod.Field.TeamLogo'),
      render: ImageRenderer
    },
    {
      key: 'payment_cost',
      label: i18n.t('PaymentMethod.Field.Action'),
    }
  ];

  public tableColumns = [
    {
      key: 'name',
      title: i18n.t('Global.Name'),
      dataIndex: 'name',
      className: 'hasTile',
      width: 150,
    },
    {
      key: 'cityName',
      title:'City Name',
      className: 'hasTile',
      dataIndex: 'cityName',
      width: 200,
    },
    {
      width: 180,
      key: 'logoUrl',
      className: 'hasTile',
      dataIndex: 'logoUrl',
      title: "Team Logo",
      render: ImageRenderer,
    },

  ];
}

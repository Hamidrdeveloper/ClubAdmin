import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { AdditionalBonus } from './model/additionalBonus.entity';
import ModuleInfo from './ModuleInfo.json';

export default class AdditionalBonusModule implements FactoryModule<AdditionalBonus> {
  public entity = '/additional-bonuses';
  public title = [i18n.t('AdditionalBonus.Title'), i18n.t('AdditionalBonus.Title', { count: 2 })];
  public apiService = new ApiBuilder<AdditionalBonus>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/AdditionalBonusUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];
  public detailColumns = [
    {
      key: 'critic_type',
      label: i18n.t('AdditionalBonus.Field.CriticType'),
    },
    {
      key: 'critic_value',
      label: i18n.t('AdditionalBonus.Field.CriticValue'),
    },
    {
      key: 'min_point',
      label: i18n.t('AdditionalBonus.Field.MinPoint'),
    },
    {
      key: 'time_period',
      label: i18n.t('AdditionalBonus.Field.TimePeriod'),
    },
  ];

  public tableColumns = [
    {
      key: 'critic_type',
      title: i18n.t('AdditionalBonus.Field.CriticType'),
      dataIndex: 'critic_type',
      className: 'hasTile ',
      width: 120,
    },
    {
      key: 'critic_value',
      title: i18n.t('AdditionalBonus.Field.CriticValue'),
      dataIndex: 'critic_value',
      className: 'hasTile number',
      width: 110,
    },
    {
      key: 'min_point',
      title: i18n.t('AdditionalBonus.Field.MinPoint'),
      dataIndex: 'min_point',
      className: 'hasTile number',
      width: 110,
    },
    {
      key: 'time_period',
      title: i18n.t('AdditionalBonus.Field.TimePeriod'),
      dataIndex: 'time_period',
      className: 'hasTile number',
      width: 110,
    },
    {
      key: 'user_type_id',
      title: i18n.t('AdditionalBonus.Field.UserType'),
      dataIndex: ['userType', 'name'],
      className: 'hasTile ',
    },
  ];
}

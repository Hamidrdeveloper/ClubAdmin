import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { lazy } from 'react';

import { DescriptionRenderer } from './components/TableComponents';
import { RewardModel } from './model/Reward.entity';

export default class RewardModule implements FactoryModule<RewardModel> {
  breadcrumbItems;
  public entity = '/competition-rewards';
  public title = [i18n.t('Competition.Reward.Title'), i18n.t('Competition.Reward.Title', { count: 2 })];

  public apiService = new ApiBuilder<RewardModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/RewardsUpsert'));

  public detailColumns: DetailColumnTypes[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'competition_id',
      label: i18n.t('Competition.CompetitionId'),
    },
    {
      key: 'description',
      label: i18n.t('Global.Description'),
    },
    {
      key: 'points',
      label: i18n.t('Competition.Reward.Points'),
    },
    {
      key: 'type',
      label: i18n.t('Competition.Reward.RewardType'),
    },
    {
      key: 'amount',
      label: i18n.t('Global.Amount'),
    },
  ];

  public tableColumns: ColumnsType<RewardModel> = [
    {
      key: 'points',
      className: 'number',
      dataIndex: 'points',
      title: i18n.t('Competition.Reward.Points'),
    },
    {
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
    {
      width: 200,
      key: 'description',
      dataIndex: 'description',
      render: DescriptionRenderer,
      title: i18n.t('Global.Description'),
    },
  ];
}

import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { UserRewardModel } from '../model/Reward.entity';

export default class UserRewardListModule implements FactoryModule<UserRewardModel> {
  // ...
  public entity;
  public apiService;
  public title = [
    i18n.t('Competition.Attendee.UserRewards'),
    i18n.t('Competition.Attendee.UserRewards', { count: 2 }),
  ];

  constructor(competitionID: number) {
    this.entity = `competitions/${competitionID}/competition-rewards/users`;
    this.apiService = new ApiBuilder(this.entity, this.title[0]);
  }

  public breadcrumbItems;
  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'username',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'type',
      label: i18n.t('Competition.Attendee.RewardType'),
    },
    {
      key: 'points',
      label: i18n.t('Competition.Reward.Points'),
    },
  ];
  public tableColumns = [
    {
      key: 'user_id',
      dataIndex: 'user_id',
      title: i18n.t('Competition.TopParticipant.UserID'),
      className: 'hasTile',
    },
    {
      key: 'username',
      title: i18n.t('Global.Name'),
      dataIndex: ['user', 'person', 'full_name'],
      className: 'hasTile',
    },
    {
      key: 'type',
      title: i18n.t('Competition.Reward.RewardType'),
      dataIndex: ['competitionReward', 'type'],
      className: 'hasTile',
    },
    {
      key: 'points',
      title: i18n.t('Competition.Reward.Points'),
      dataIndex: ['competitionReward', 'points'],
      className: 'hasTile',
    },
  ];
}

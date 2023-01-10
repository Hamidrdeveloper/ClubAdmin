import i18n from '@core/i18n/config';
import { PartnerLink } from '@src/modules/CompetitionResult/component/TableComponents';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';

import { NavigateToUserResult } from '../components/TableComponents';
import { CompetitionUserResultModel } from '../model/userResult.entity';

export default class UserResultListModule implements FactoryModule<CompetitionUserResultModel> {
  public entity;
  public apiService;
  public title = [
    i18n.t('Competition.Attendee.UserResults'),
    i18n.t('Competition.Attendee.UserResults', { count: 2 }),
  ];

  constructor(competitionID: number) {
    this.entity = `competitions/${competitionID}/competition-results/users`;
    this.apiService = new ApiBuilder<CompetitionUserResultModel>(this.entity, this.title[0]);
  }

  public breadcrumbItems;
  public detailColumns = [
    {
      key: 'user_id',
      label: i18n.t('Global.UserId'),
    },
    {
      key: 'full_name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'total_points',
      label: i18n.t('Competition.Reward.Points'),
    },
    {
      key: 'possible_reward',
      label: i18n.t('Competition.PossibleRewards'),
    },
  ];
  public tableColumns: TableColumnsType = [
    {
      key: 'user_id',
      dataIndex: 'user_id',
      render: NavigateToUserResult,
      title: i18n.t('CompetitionResult.UserId'),
    },
    {
      key: 'partner_id',
      render: PartnerLink,
      className: 'hasTile',
      dataIndex: 'partner_id',
      title: i18n.t('CompetitionResult.PartnerId'),
    },
    {
      key: 'full_name',
      title: i18n.t('Global.Name'),
      dataIndex: 'full_name',
      className: 'hasTile',
    },
    {
      align: 'center',
      key: 'total_points',
      className: 'hasTile',
      dataIndex: 'total_points',
      title: i18n.t('Competition.Reward.TotalPoints'),
    },
    {
      align: 'center',
      className: 'hasTile',
      key: 'possible_reward',
      dataIndex: 'possible_reward',
      title: i18n.t('Competition.PossibleRewards'),
    },
  ];
}

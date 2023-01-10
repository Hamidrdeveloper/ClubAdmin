import i18n from '@core/i18n/config';
import { CompetitionResultModel } from '@src/modules/CompetitionResult/model/competitionResult.entity';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';

import moduleInfo from './ModuleInfo.json';
export default class UserCompetitionListModule implements FactoryModule<CompetitionResultModel> {
  public entity;
  public apiService;
  public title = [
    i18n.t('Competition.Attendee.UserResults'),
    i18n.t('Competition.Attendee.UserResults', { count: 2 }),
  ];

  constructor(competitionID: number, user_id: number) {
    this.entity = `competitions/${competitionID}/competition-results/users/${user_id}`;
    this.apiService = new ApiBuilder(this.entity, this.title[0]);
  }

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'full_name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'points',
      label: i18n.t('Competition.Reward.Points'),
    },
  ];
  public tableColumns: TableColumnsType = [
    {
      key: 'full_name',
      title: i18n.t('Global.Name'),
      dataIndex: ['user', 'person', 'full_name'],
      className: 'hasTile',
    },
    {
      key: 'user_id',
      dataIndex: 'user_id',
      title: i18n.t('CompetitionResult.UserId'),
      className: 'hasTile number',
    },
    {
      key: 'partner_id',
      title: i18n.t('CompetitionResult.PartnerId'),
      dataIndex: ['user', 'partner_id'],
      className: 'hasTile number',
    },

    {
      key: 'points',
      title: i18n.t('Competition.Reward.Points'),
      dataIndex: 'points',
      align: 'center',
      className: 'hasTile number',
    },
  ];
}

import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer, PartnerLink, UserLink } from './component/TableComponents';
import { CompetitionResultModel } from './model/competitionResult.entity';
import moduleInfo from './ModuleInfo.json';

export default class CompetitionResultModule implements FactoryModule<CompetitionResultModel> {
  public entity = '/competition-results';
  public title = [i18n.t('CompetitionResult.Title'), i18n.t('CompetitionResult.Title', { count: 2 })];
  public apiService = new ApiBuilder<CompetitionResultModel>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [];

  public tableColumns = [
    {
      key: 'user',
      className: 'hasTile',
      dataIndex: ['user', 'person', 'full_name'],
      title: i18n.t('CompetitionResult.UserFullName'),
    },
    {
      key: 'user_id',
      render: UserLink,
      dataIndex: 'user_id',
      className: 'hasTile number',
      title: i18n.t('CompetitionResult.UserId'),
    },
    {
      key: 'partner_id',
      render: PartnerLink,
      className: 'hasTile number',
      dataIndex: ['user', 'partner_id'],
      title: i18n.t('CompetitionResult.PartnerId'),
    },
    {
      className: 'hasTile',
      key: 'competition_rule_name',
      dataIndex: ['competitionRule', 'title'],
      title: i18n.t('CompetitionResult.CompetitionRuleTitle'),
    },
    {
      className: 'hasTile',
      key: 'competition_name',
      title: i18n.t('CompetitionResult.CompetitionName'),
      dataIndex: ['competitionRule', 'competition', 'title'],
    },
    {
      key: 'points',
      className: 'number hasTile',
      dataIndex: 'points',
      title: i18n.t('CompetitionResult.Points'),
    },

    {
      key: 'created_at',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('CompetitionResult.CreatedAt'),
    },
  ];
}

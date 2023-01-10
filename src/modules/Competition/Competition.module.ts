import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';

import {
  CalculateBtnRenderer,
  CancelParticipationRenderer,
  CopyCompetitionBtnRenderer,
  DateRenderer,
  RedeemRewardBtnRenderer,
} from './components/TableComponents';
import { CompetitionModel } from './model/Competition.entity';
import moduleInfo from './ModuleInfo.json';

export default class CompetitionModule implements FactoryModule<CompetitionModel> {
  public entity = '/competitions';
  public title = [i18n.t('Competition.Title'), i18n.t('Competition.Title', { count: 2 })];

  public apiService = new ApiBuilder<CompetitionModel>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns: DetailColumnTypes[] = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: i18n.t('Global.Title'),
    },
    {
      key: 'description',
      label: i18n.t('Global.Description'),
    },
    {
      key: 'is_active',
      label: i18n.t('Global.IsActive'),
    },
    {
      key: 'is_editable',
      label: i18n.t('Competition.isEditable'),
    },
    {
      key: 'activable',
      label: i18n.t('Competition.Activable'),
    },
  ];

  public tableColumns: ColumnsType = [
    {
      width: 140,
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'release_date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'release_date',
      title: i18n.t('Competition.StartDate'),
    },
    {
      className: 'hasTile',
      render: DateRenderer,
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Competition.EndDate'),
    },
    {
      width: 140,
      key: 'calculate',
      className: 'hasTile',
      render: CalculateBtnRenderer,
      title: i18n.t('Competition.Calculate'),
    },
    {
      width: 140,
      key: 'redeem',
      dataIndex: '',
      className: 'hasTile',
      render: RedeemRewardBtnRenderer,
      title: i18n.t('Competition.RedeemRewards'),
    },
    {
      key: 'id',
      dataIndex: '',
      align: 'center',
      render: CopyCompetitionBtnRenderer,
      title: i18n.t('Competition.CopyCompetitionToolTip'),
    },
    {
      dataIndex: '',
      className: 'hasTile',
      key: 'cancel-participation',
      render: CancelParticipationRenderer,
      title: i18n.t('Competition.CancelParticipation'),
    },
  ];
}

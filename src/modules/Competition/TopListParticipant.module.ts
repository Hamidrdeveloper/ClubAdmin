import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

import { NavigateToUserRenderer } from './components/TableComponents';
import { TopParticipantModel } from './model/TopParticipant.entity';

export default class TopListParticipantModule implements FactoryModule<TopParticipantModel> {
  breadcrumbItems: Route[];
  public entity: string;
  public apiService: ApiBuilder<TopParticipantModel>;
  constructor(compId: number | undefined) {
    if (!compId) return;

    this.entity = `competitions/${compId}/top-users`;
    this.apiService = new ApiBuilder(this.entity, this.title[0]);
  }

  public title = [
    i18n.t('Competition.TopParticipant.Title'),
    i18n.t('Competition.TopParticipant.Title', { count: 2 }),
  ];
  public tableColumns: TableColumnsType<unknown> = [
    {
      key: 'user',
      dataIndex: 'user',
      className: 'hasTile',
      render: NavigateToUserRenderer,
      title: i18n.t('Competition.TopParticipant.FullName'),
    },
    {
      key: 'user_id',
      className: 'hasTile number',
      dataIndex: 'user_id',
      title: i18n.t('Competition.TopParticipant.UserID'),
    },
    {
      key: 'points',
      dataIndex: 'points',
      className: 'hasTile number',
      title: i18n.t('Competition.TopParticipant.Points'),
    },
  ];
  public detailColumns: DetailColumnTypes[];
}

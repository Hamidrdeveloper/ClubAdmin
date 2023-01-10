import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';

import { DateRenderer } from './components/TableComponents';
import { SpecialConditionCareerStepModel } from './model/SpecialConditionCareerStep.entity';
import ModuleInfo from './ModuleInfo.json';

export default class SpecialConditionCareerStepModule
  implements FactoryModule<SpecialConditionCareerStepModel>
{
  public entity = 'career-step-special-conditions';
  public title = [
    i18n.t('SpecialConditionCareerStep.Title'),
    i18n.t('SpecialConditionCareerStep.Title', { count: 2 }),
  ];
  public apiService = new ApiBuilder<SpecialConditionCareerStepModel>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin/${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
  ];

  public tableColumns: ColumnsType = [
    {
      key: 'careerStepName',
      dataIndex: ['careerStep', 'name'],
      title: i18n.t('SpecialConditionCareerStep.CareerStepName'),
    },
    {
      key: 'points',
      dataIndex: 'points',
      className: 'number hasTile',
      title: i18n.t('SpecialConditionCareerStep.Points'),
    },
    {
      key: 'from',
      dataIndex: 'from',
      className: 'hasTile',
      render: DateRenderer,
      title: i18n.t('Global.From'),
    },
    {
      key: 'to',
      dataIndex: 'to',
      className: 'hasTile',
      render: DateRenderer,
      title: i18n.t('Global.To'),
    },
  ];
}

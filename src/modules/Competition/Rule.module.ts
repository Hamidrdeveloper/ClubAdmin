import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { lazy } from 'react';

import { PV_Renderer } from './components/TableComponents';
import { RuleModel } from './model/Rule.entity';
import { RuleTypeModel } from './model/RulesType.entity';

export default class RuleModule implements FactoryModule<RuleModel> {
  breadcrumbItems;
  public entity = '/competition-rules';
  public title = [i18n.t('Competition.Rule.Title'), i18n.t('Competition.Rule.Title', { count: 2 })];

  public apiService = new ApiBuilder<RuleModel>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/NewRuleUpsert'));

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
      key: 'competition_name',
      label: i18n.t('Competition.CompetitionName'),
    },
    {
      key: 'description',
      label: i18n.t('Global.Description'),
    },
    {
      key: 'is_editable',
      label: i18n.t('Competition.isEditable'),
    },
    {
      key: 'points',
      label: i18n.t('Competition.Reward.Points'),
    },
  ];
  public tableColumns: ColumnsType<RuleModel> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: i18n.t('Competition.Rule.RuleName'),
    },
    {
      key: 'competition_title',
      dataIndex: ['competition', 'title'],
      title: i18n.t('Competition.CompetitionName'),
    },
    {
      className: 'hasTile',
      key: 'ruleType_title',
      dataIndex: ['competitionRuleType', 'slug'],
      title: i18n.t('Competition.Rule.RuleType'),
    },
    {
      key: 'achieve_career_step',
      dataIndex: ['achieveCareerStep', 'name'],
      title: i18n.t('Competition.Rule.CareerLevel'),
    },
    {
      render: PV_Renderer,
      key: 'product_variation',
      dataIndex: 'productVariations',
      title: i18n.t('Competition.Rule.ProductVariation'),
    },
    {
      key: 'points',
      dataIndex: 'points',
      title: i18n.t('Competition.Rule.Point'),
    },
    {
      key: 'min_amount',
      className: 'number',
      dataIndex: 'min_amount',
      title: i18n.t('Competition.Rule.MinimumOrderValue'),
    },
  ];
}

export class CompetitionRuleTypeModule implements FactoryModule<RuleTypeModel> {
  breadcrumbItems;
  public entity = '/competition-rule-types';
  public title = [i18n.t('Competition.Rule.RuleType'), i18n.t('Competition.Rule.RuleType', { count: 2 })];

  public apiService = new ApiBuilder<RuleTypeModel>(this.entity, this.title[0]);

  public UpsertComponent;

  public detailColumns;
  public tableColumns;
}

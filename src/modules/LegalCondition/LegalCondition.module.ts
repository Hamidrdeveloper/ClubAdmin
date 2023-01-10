import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import React, { lazy } from 'react';

import { DateRenderer, NameRenderer, RolesNameRenderer } from './components';
import { LegalCondition } from './model/legalCondition.entity';
import moduleInfo from './ModuleInfo.json';

export default class LegalConditionModule implements FactoryModule<LegalCondition> {
  #titles = {
    legal_disclosure: i18n.t('LegalCondition.PluralTitle.LegalDisclosure'),
    privacy_policy: i18n.t('LegalCondition.PluralTitle.PrivacyPolicy'),
    return_forms: i18n.t('LegalCondition.PluralTitle.ReturnForms'),
    returns_and_replacements: i18n.t('LegalCondition.PluralTitle.ReturnsAndReplacements'),
    term_conditions: i18n.t('LegalCondition.PluralTitle.TermConditions'),
    use_cookies: i18n.t('LegalCondition.PluralTitle.UseCookies'),
    delivery_policy: i18n.t('LegalCondition.PluralTitle.DeliveryPolicy'),
    payment_policy: i18n.t('LegalCondition.PluralTitle.PaymentPolicy'),
  };

  public name = '';
  public entity: string;
  public title: string[];
  public apiService: ApiBuilder<LegalCondition>;
  breadcrumbItems: Route[] = [];

  //TODO: Please remove isUpsert immediately
  constructor(name: string, isUpsert = false) {
    this.name = name;
    this.entity = isUpsert ? '/legals/' + this.name : '/legals/index/' + this.name;
    this.title = [this.#titles[this.name], this.#titles[this.name]];
    this.apiService = new ApiBuilder<LegalCondition>(this.entity, this.title[0]);
    this.breadcrumbItems = [
      {
        breadcrumbName: `${i18n.t('LegalCondition.Title')} - ${this.#titles[this.name]}`,
        path: `/admin${moduleInfo.Route.replace(':name/*', `${this.name}`)}`,
      },
    ];

    this.tableColumns = [
      {
        key: 'name',
        dataIndex: 'id',
        title: i18n.t('Global.Name'),
        render: (id) => NameRenderer({ id, name: this.#titles[this.name] }),
      },
      {
        key: 'create_date',
        dataIndex: 'created_at',
        className: 'hasTile',
        title: i18n.t('Global.CreatedAt'),
        render: (date) => DateRenderer({ date }),
      },
      {
        key: 'company_name',
        dataIndex: ['company', 'name'],
        title: i18n.t('LegalCondition.Field.CompanyName'),
      },
      {
        key: 'rolesName',
        dataIndex: 'roles',
        render: RolesNameRenderer,
        title: i18n.t('LegalCondition.Field.RolesName'),
      },
    ];
  }

  public UpsertComponent: React.FC = lazy(() => import('./containers/LegalConditionUpsert'));

  public detailColumns = [
    {
      key: 'description',
      label: i18n.t('LegalCondition.Field.Description'),
    },
  ];

  public tableColumns;

  public PriceIntervalTypes: { label: string; value: string }[] = [
    { label: i18n.t('LegalCondition.PriceIntervalTypes.None'), value: 'none' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.Yearly'), value: 'yearly' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.HalfYear'), value: 'half-year' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.Quarterly'), value: 'quarterly' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.Monthly'), value: 'monthly' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.Weekly'), value: 'weekly' },
    { label: i18n.t('LegalCondition.PriceIntervalTypes.Daily'), value: 'daily' },
  ];
}

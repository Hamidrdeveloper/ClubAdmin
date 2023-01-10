/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { CountryNameRenderer, CurrencyNameRenderer } from './components/TableComponents';
import { CompanyModel } from './model/company.entity';
import moduleInfo from './ModuleInfo.json';

export default class CompanyModule implements FactoryModule<CompanyModel> {
  public entity: string;
  public apiService: ApiBuilder<CompanyModel>;
  public title = [i18n.t('Company.Title'), i18n.t('Company.Title', { count: 2 })];

  constructor() {
   

    this.entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChant_Lyric';
   
    const values: CompanyModel = {
      clubId: 1,
      adminId: 12,
      ChantId:2,
    };

    this.apiService = new ApiBuilder(this.entity, this.title[0],{test:"string"});
  }

  public UpsertComponent = lazy(() => import('./container/CompanyUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'tax_number',
      label: i18n.t('Company.TaxNumber'),
    },
    {
      key: 'iban',
      label: i18n.t('Company.IBAN'),
    },
    {
      key: 'swift',
      label: i18n.t('Company.Swift'),
    },
    {
      key: 'chief_name',
      label: i18n.t('Company.ChiefName'),
    },
    {
      key: 'bank_name',
      label: i18n.t('Company.BankName'),
    },
    {
      key: 'bic',
      label: i18n.t('Company.BIC'),
    },
    {
      key: 'vat_number',
      label: i18n.t('Company.VATNumber'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
  
    {
      key: 'bank_name',
      dataIndex: 'bank_name',
      className: 'hasTile',
      title: i18n.t('Company.BankName'),
    },
    {
      key: 'chief_name',
      className: 'hasTile',
      dataIndex: 'chief_name',
      title: i18n.t('Company.ChiefName'),
    },
  ];
}

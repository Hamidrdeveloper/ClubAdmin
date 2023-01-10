import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnsType } from 'antd/lib/table';
import { lazy } from 'react';

import { AddressRenderer } from '../User/components';
import { Address } from '../User/model/address';
import { Supplier } from './model/supplier.entity';
import ModuleInfo from './ModuleInfo.json';

export default class SupplierModule implements FactoryModule<Supplier> {
  public entity = '/suppliers';
  public title = [i18n.t('Supplier.Title'), i18n.t('Supplier.Title', { count: 2 })];
  public apiService = new ApiBuilder<Supplier>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: ['people', 'full_name'],
      label: i18n.t('Global.Name'),
    },
    {
      key: 'tax_number',
      label: i18n.t('Supplier.Field.TaxNumber'),
    },
    {
      key: 'vat_number',
      label: i18n.t('Global.VatNumber'),
    },
    {
      key: 'credit_limit',
      label: i18n.t('Supplier.Field.CreditLimit'),
    },
    {
      key: 'use_gln_indocuments',
      label: i18n.t('Supplier.Field.UseGlnInDocuments'),
    },
  ];

  public tableColumns: ColumnsType<Supplier> = [
    {
      key: 'name',
      className: 'hasTile',
      dataIndex: ['people', 'full_name'],
      title: i18n.t('Global.Name'),
    },
    {
      width: 150,
      key: 'company_name',
      className: 'hasTile',
      dataIndex: ['people', 'company_name'],
      title: i18n.t('Supplier.Field.Company'),
    },
    {
      width: 150,
      key: 'country_name',
      className: 'hasTile',
      title: i18n.t('Supplier.Field.Country'),
      dataIndex: ['people', 'contactGroups', '0', 'address', 'country', 'name'],
    },
    {
      key: 'payment_term',
      className: 'hasTile',
      dataIndex: ['paymentTerm', 'description'],
      title: i18n.t('Supplier.Field.PaymentTermDescription'),
    },
    {
      key: 'shipping_method',
      className: 'hasTile',
      dataIndex: ['shippingMethod', 'name'],
      title: i18n.t('Supplier.Field.ShippingMethod'),
    },
  ];

  public SupplierGenderTypes: { label: string; value: string }[] = [
    {
      label: i18n.t('Global.Male'),
      value: 'male',
    },
    {
      label: i18n.t('Global.Female'),
      value: 'female',
    },
    {
      label: i18n.t('Global.Other'),
      value: 'none',
    },
  ];
}

export class AddressModule implements FactoryModule<Address> {
  public entity;
  breadcrumbItems;
  public apiService;

  public detailColumns = [
    {
      key: 'title',
      label: 'title',
    },
  ];

  public title = [i18n.t('Supplier.Address.Title'), i18n.t('Supplier.Address.Title', { count: 2 })];

  constructor(supplier_id: string) {
    this.entity = `/suppliers/${supplier_id}/contact-groups`;
    this.apiService = new ApiBuilder<Address>(this.entity, this.title[0]);
  }

  public UpsertComponent: React.FC = lazy(() => import('./containers/AddressUpsert'));

  public tableColumns = [
    {
      width: 170,
      key: 'title',
      dataIndex: 'title',
      title: i18n.t('Global.Title'),
    },
    {
      width: 170,
      key: 'address',
      dataIndex: 'address',
      render: AddressRenderer,
      className: 'noListView hasTile',
      title: i18n.t('User.Address.Title'),
    },
    {
      width: 150,
      key: 'email',
      title: i18n.t('Global.Email'),
      dataIndex: ['emails', '0', 'email'],
    },
    {
      width: 150,
      key: 'website',
      dataIndex: ['websites', '0', 'url'],
      title: i18n.t('User.Address.Website'),
    },
    {
      width: 150,
      key: 'phone',
      className: 'number',
      dataIndex: ['phones', '0', 'number'],
      title: i18n.t('User.Address.Phone'),
    },
  ];

  public listHeader = {
    dataIndex: [
      ['0', 'address', 'city'],
      ['0', 'address', 'state'],
      ['0', 'address', 'address1'],
    ],
  };
}

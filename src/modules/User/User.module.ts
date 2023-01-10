import i18n from '@core/i18n/config';
import { DetailColumnTypes, FactoryChild, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import React, { ReactNode, lazy } from 'react';

import {
  AddressRenderer,
  AvatarRenderer,
  DetailsAddressRenderer,
  FileRenderer,
  MailRenderer,
  SponsorRenderer,
} from './components';
import { Address } from './model/address';
import { BankDetailPure } from './model/bankDetails';
import { UserDocs } from './model/document';
import { User } from './model/personalInfo';
import moduleInfo from './ModuleInfo.json';

export default class UserModule implements FactoryModule<User> {
  public entity = '/users';
  public title: string[];
  public apiService: ApiBuilder<User>;
  breadcrumbItems;

  constructor(role?: string) {
    switch (role) {
      case 'user':
        this.title = [i18n.t('User.Customer'), i18n.t('User.Customer', { count: 2 })];
        break;
      case 'admin':
        this.title = [i18n.t('User.Admin'), i18n.t('User.Admin', { count: 2 })];
        break;
      case 'partner':
        this.title = [i18n.t('User.Partner.Title'), i18n.t('User.Partner.Title', { count: 2 })];
        break;
      case 'employee':
        this.title = [i18n.t('User.Employee'), i18n.t('User.Employee', { count: 2 })];
        break;
      default:
        this.title = [i18n.t('User.Title'), i18n.t('User.Title', { count: 2 })];
        break;
    }

    this.apiService = new ApiBuilder<User>(this.entity, this.title[0]);

    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${moduleInfo.Route.replace('*', '')}`,
      },
    ];
  }

  public UpsertComponent = lazy(() => import('./containers/PersonalInfoUpsert'));

  public detailColumns = [
    {
      key: 'username',
      label: i18n.t('Global.Username'),
    },
    {
      key: 'email',
      render: MailRenderer,
      label: i18n.t('User.Field.Email'),
    },
    {
      key: 'telephone_number',
      label: i18n.t('User.Field.TelephoneNumber'),
    },
    {
      key: ['sponsor', 'user_id'],
      render: SponsorRenderer,
      label: i18n.t('User.Field.Sponsor'),
    },
    {
      key: 'is_vat_valid',
      label: i18n.t('User.Field.IsVatValid'),
    },
    {
      key: 'discount_ratio',
      label: i18n.t('User.Field.UserDiscount'),
    },
  ];

  public tableColumns = [
    {
      width: 180,
      key: 'avatar',
      dataIndex: 'avatar',
      className: 'hasTile mainImage',
      title: i18n.t('Global.Username'),
      render: (avatar: string, record: User): ReactNode => AvatarRenderer({ avatar, record }),
    },
    {
      key: 'email',
      title: i18n.t('User.Field.Email'),
      dataIndex: 'email',
      className: 'hasTile',
      width: 120,
    },
    {
      width: 140,
      key: 'first_name',
      className: 'hasTile',
      title: i18n.t('Global.FirstName'),
      dataIndex: ['person', 'first_name'],
    },
    {
      width: 140,
      key: 'last_name',
      className: 'hasTile',
      title: i18n.t('Global.LastName'),
      dataIndex: ['person', 'last_name'],
    },
    {
      key: 'city',
      className: 'hasTile',
      title: i18n.t('User.Field.City'),
      dataIndex: ['invoiceContactGroup', 'address', 'city'],
    },
    {
      key: 'microsoft_id',
      dataIndex: 'microsoft_id',
      className: 'hasTile number',
      title: i18n.t('User.Field.MicrosoftID'),
    },
  ];

  public UserIntervalTypes: { label: string; value: string }[] = [
    { label: 'None', value: 'none' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Half-Year', value: 'half-year' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
  ];
}

export class AddressModule implements FactoryModule<Address> {
  public entity;
  public title = [i18n.t('User.Address.Title'), i18n.t('User.Address.Title', { count: 2 })];
  public apiService;
  public UpsertComponent: React.FC = lazy(() => import('./containers/AddressUpsert'));
  breadcrumbItems: Route[];
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
      title: i18n.t('User.Address.Title'),
      className: 'noListView hasTile flexGrow',
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
  public detailColumns = [
    {
      key: 'title',
      label: 'title',
    },
    {
      label: 'Complete Address',
      render: DetailsAddressRenderer,
      key: ['address', 'address_complete'],
    },
    {
      key: ['country', 'name'],
      label: 'Country Name',
    },
    {
      key: 'country_id',
      label: 'Country ID',
    },
  ];
  public listHeader = {
    dataIndex: [
      ['0', 'address', 'city'],
      ['0', 'address', 'state'],
      ['0', 'address', 'address1'],
    ],
  };

  constructor(user_id: number) {
    this.entity = `/user/${user_id}/contact-groups`;
    this.apiService = new ApiBuilder<Address>(this.entity, this.title[0]);
  }
}

export class BankDetailsModule implements FactoryModule<BankDetailPure> {
  breadcrumbItems: Route[];
  public detailColumns: DetailColumnTypes[];
  public tableColumns: TableColumnsType<BankDetailPure>;

  public title = [i18n.t('User.BankDetails.Title'), i18n.t('User.BankDetails.Title', { count: 2 })];

  // TODO: remove this module (we are using api builder only)
  public entity = `user-banks`;
  public apiService = new ApiBuilder<BankDetailPure>(this.entity, this.title[0]);
}

export class DocumentModule implements FactoryModule<UserDocs> {
  breadcrumbItems;
  public apiService;
  public entity: string;
  public title = [i18n.t('User.Documents.Title'), i18n.t('User.Documents.Title', { count: 2 })];
  public detailColumns: DetailColumnTypes[] = [
    {
      key: 'created_by_fullname',
      label: i18n.t('User.Documents.CreatedBy'),
    },
    {
      key: 'number',
      label: i18n.t('Global.Number'),
    },
    {
      key: 'order_type',
      label: i18n.t('User.Documents.OrderType'),
    },
    {
      key: 'order_id',
      label: i18n.t('User.Documents.OrderID'),
    },
    {
      key: 'document_type_id',
      label: i18n.t('User.Documents.DocumentTypeID'),
    },
  ];
  public tableColumns = [
    {
      key: 'document_name',
      className: 'hasTile',
      dataIndex: ['documentType', 'name'],
      title: i18n.t('User.Documents.DocumentName'),
    },
    {
      key: 'number',
      className: 'hasTile',
      dataIndex: 'number',
      title: 'Nummer',
    },
    {
      width: 180,
      key: 'link',
      className: 'hasTile',
      render: FileRenderer,
      dataIndex: 'link',
      title: i18n.t('User.Documents.DocumentFile'),
    },
  ];

  constructor(userId: number) {
    this.entity = `users/${userId}/documents`;
    this.apiService = new ApiBuilder<UserDocs>(this.entity, this.title[0]);
  }
}

export class UserPartnerModule implements FactoryChild<User> {
  breadcrumbItems;
  public entity = `partners/users-of-first-level`;
  public title = [i18n.t('Partner.Title'), i18n.t('Partner.Title', { count: 2 })];
  public detailColumns;
  public apiService = new ApiBuilder<User>(this.entity, this.title[0]);
  public tableColumns;
}

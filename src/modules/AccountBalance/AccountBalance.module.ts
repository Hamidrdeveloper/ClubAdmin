import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

import { AccountBalanceModel } from '../User/model/accountBalance';
import {
  AccountableTypeIDRenderer,
  AmountRenderer,
  DateRenderer,
  NavigateToUserRenderer,
  PaymentMethodRenderer,
  TotalAmountRenderer,
} from './components/TableComponents';
import moduleInfo from './ModuleInfo.json';

export class AccountBalanceModule implements FactoryModule<AccountBalanceModel> {
  public apiService: ApiBuilder<AccountBalanceModel>;
  public entity: string;
  detailColumns: DetailColumnTypes[];
  public title = [i18n.t('AccountBalance.Title'), i18n.t('AccountBalance.Title', { count: 2 })];
  breadcrumbItems: Route[] = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public tableColumns: TableColumnsType<AccountBalanceModel> = [
    {
      key: 'user',
      dataIndex: 'user',
      className: 'hasTile',
      render: NavigateToUserRenderer,
      title: i18n.t('AccountBalance.User'),
    },
    {
      className: 'hasTile',
      key: 'created_at',
      dataIndex: 'created_at',
      render: DateRenderer,
      title: i18n.t('AccountBalance.CreatedAt'),
    },
    {
      className: 'hasTile',
      key: 'description',
      dataIndex: 'description',
      title: i18n.t('Global.Description'),
    },
    {
      className: 'hasTile',
      key: 'accountable_id',
      dataIndex: 'accountable_id',
      render: AccountableTypeIDRenderer,
      title: i18n.t('AccountBalance.AccountableID'),
    },
    {
      className: 'hasTile',
      key: 'accountable_type',
      dataIndex: 'accountable_type',
      title: i18n.t('AccountBalance.AccountableType'),
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      render: AmountRenderer,
      className: 'number hasTile',
      title: i18n.t('Global.Amount'),
    },
    {
      key: 'total_amount',
      dataIndex: 'total_amount',
      render: TotalAmountRenderer,
      className: 'number hasTile',
      title: i18n.t('AccountBalance.TotalAmount'),
    },
    {
      key: 'payment_method',
      dataIndex: 'paymentMethod',
      render: PaymentMethodRenderer,
      title: i18n.t('AccountBalance.PaymentMethod'),
    },
  ];

  constructor(userId?: string) {
    if (userId) {
      // if it already has userId it means that we are viewing table from userManage account & Balance tab - so its unnecessary to show userID
      const userColumnIndex = this.tableColumns.findIndex((column) => column.key === 'user');
      this.tableColumns.splice(userColumnIndex, 1);
    }

    this.entity = userId ? `accounts?userId=${userId}` : `accounts`;
    this.apiService = new ApiBuilder<AccountBalanceModel>(this.entity, this.title[0]);
  }
}

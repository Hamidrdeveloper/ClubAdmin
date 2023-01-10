import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

import { DateRenderer, NavigateToUserRenderer } from './components/TableComponents';
import { TransactionModel } from './model/Transaction.entity';

export default class TransactionModule implements FactoryModule<TransactionModel> {
  public entity = '/wallet-transactions';
  public title = [i18n.t('Wallets.Transaction.Title'), i18n.t('Wallets.Transaction.Title', { count: 2 })];
  public apiService = new ApiBuilder<TransactionModel>(this.entity, this.title[0]);

  breadcrumbItems = [];

  public detailColumns = [];

  public tableColumns = [
    {
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
    {
      key: 'user',
      dataIndex: ['wallet', 'user'],
      render: NavigateToUserRenderer,
      title: i18n.t('Wallets.FullName'),
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      className: 'hasTile number',
      title: i18n.t('Global.Amount'),
    },
    {
      key: 'date',
      dataIndex: 'date',
      className: 'hasTile',
      render: DateRenderer,
      title: i18n.t('Global.Date'),
    },
    {
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
  ];
}

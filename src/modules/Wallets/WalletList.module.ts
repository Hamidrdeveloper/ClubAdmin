import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ReactNode } from 'react';

import { DateRenderer, NavigateToUserRenderer, NavigateToWalletRenderer } from './components/TableComponents';
import { WalletListModel } from './model/WalletList.entity';
import moduleInfo from './ModuleInfo.json';

export default class WalletModule implements FactoryModule<WalletListModel> {
  public entity = '/wallets';
  public title = [i18n.t('Wallets.Title'), i18n.t('Wallets.Title', { count: 2 })];
  public apiService = new ApiBuilder<WalletListModel>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [];

  public tableColumns = [
    {
      // NOTE: walletId and userId are the same
      key: 'user-id',
      dataIndex: ['user', 'id'],
      title: i18n.t('Global.ID'),
      render: (userId: number, allData: WalletListModel): ReactNode =>
        NavigateToWalletRenderer(userId, allData.id),
    },
    {
      key: 'uuid',
      dataIndex: 'uuid',
      className: 'hasTile',
      title: i18n.t('Wallets.UUID'),
    },
    {
      key: 'balance',
      dataIndex: 'balance',
      className: 'hasTile number',
      title: i18n.t('Wallets.Balance'),
    },
    {
      key: 'user',
      dataIndex: 'user',
      className: 'hasTile',
      render: NavigateToUserRenderer,
      title: i18n.t('Wallets.FullName'),
    },
    {
      key: 'created_at',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Wallets.CreatedAt'),
    },
  ];
}

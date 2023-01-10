import { User as UserAuthenticationModel } from '@src/core/Authentication/model';
import { User } from '@src/modules/User';
import WalletModuleInfo from '@src/modules/Wallet/ModuleInfo.json';
import { generateUserManageLinkBaseOnRole } from '@src/shared/utils/engine.service';
import moment from 'moment';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { WalletListModel } from '../model/WalletList.entity';

export const DateRenderer: FC<string> = (date) => {
  return <span>{date ? moment(date).format('DD.MM.yyyy') : '-'}</span>;
};

export const NavigateToWalletRenderer: FC<number> = (userId: number, walletId: number) => {
  return <Link to={`/admin${WalletModuleInfo.Route.replace('*', '')}${userId}`}>{walletId}</Link>;
};

export const NavigateToUserRenderer: FC<User> = (user, data: WalletListModel) => {
  const userRole = user?.roles.map((role) => role.slug)[0];

  const manageLink = generateUserManageLinkBaseOnRole({
    role: userRole,
    profile: user as unknown as UserAuthenticationModel,
  });

  // NOTE: walletId and userId are the same
  return <Link to={manageLink}>{user ? user?.person?.full_name : data.id}</Link>;
};

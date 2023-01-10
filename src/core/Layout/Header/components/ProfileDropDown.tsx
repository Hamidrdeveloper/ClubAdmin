/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LoadingOutlined, LoginOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { AuthContext, Env } from '@src/core';
import { generateUserManageLinkBaseOnRole } from '@src/shared/utils/engine.service';
import { Avatar } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Styles from './styles/ProfileDropDown.style';

export default function ProfileDropDown({
  onLogout,
  isPending,
}: {
  isPending: boolean;
  onLogout?: () => void;
}): ReactElement {
  const { profile, loggedInUserRole } = useContext(AuthContext);
  const { t } = useTranslation();

  const Menus = [
    {
      icon: <UserOutlined />,
      title: t('ProfileDropdown.EditProfile'),
      link: generateUserManageLinkBaseOnRole({ role: loggedInUserRole, profile }),
    },
  ];

  const PartnerOnlyMenus = [
    {
      icon: <WalletOutlined />,
      title: t('ProfileDropdown.Wallet'),
      link: `/admin/wallet/${profile.id}`,
    },
  ];

  if (loggedInUserRole === 'partner') {
    Menus.push(...PartnerOnlyMenus);
  }

  return (
    <Styles.MainContainer>

<ul className="menus">

<li className="menu-item log-out">
  <a onClick={onLogout}>
    {isPending ? <LoadingOutlined /> : <LoginOutlined />}

    <label>{t('Global.SignOut')}</label>
  </a>
</li>
</ul>
    </Styles.MainContainer>
  );
}

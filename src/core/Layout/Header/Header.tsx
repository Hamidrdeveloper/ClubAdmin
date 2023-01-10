/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { BellOutlined, CaretDownOutlined, TranslationOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext, Env } from '@src/core';
import { ConfigData } from '@src/modules/General/model/general.entity';
import { generalAtom } from '@src/modules/General/service/generalStore';
import { Avatar, Drawer, Dropdown, Menu, message } from 'antd';
import { useAtom } from 'jotai';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ProfileDropDown } from './components';
import Styles from './Header.style';

const Header: React.FC = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { onLogout, profile, permissions, loggedInUserRole } = useContext(AuthContext);

  const [config] = useAtom<ConfigData>(generalAtom);

  const [isOpen, setOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  const [activeKey, setActiveKey] = useState<string>();
  const [notificationOpen, setNotificationOpen] = useState(false);

  // note: Last id is 21, make sure its unique
  const menus = [
    
  ];

  if (loggedInUserRole === 'partner') {
    menus.push(...partnerOnlyHeaders);
  }

  const LanguagesMenus = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => handleChangeLang('en')}>{t('Global.English')}</span>
      </Menu.Item>

      <Menu.Item key="1">
        <span onClick={() => handleChangeLang('de')}>{t('Global.Germany')}</span>
      </Menu.Item>

      <Menu.Item key="2">
        <span onClick={() => handleChangeLang('tr')}>{t('Global.Turkish')}</span>
      </Menu.Item>
    </Menu>
  );

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (pathname) {
      const foundMenu = menus.find((menu) => pathname.includes(menu.link));

      setActiveKey(foundMenu ? String(foundMenu.id) : undefined);
    }
  }, [pathname]);

  const handleLogout = () => {
    setPending(true);
    onLogout().then(() => {
      setPending(false);
      message.success(t('Global.LoggedOutOfAccount'));
    });
  };

  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    navigator(0);
  };

  return (
    <Styles.MainContainer>
      <div className="inner">
       

        <Styles.MenuContainer>
          <Menu mode="horizontal" theme="light" className="menu" activeKey={activeKey}>
            {menus
              .filter((sub) =>
                // if one of its children has the permission, then show the menu (parent menu)
                (permissions || []).some((permission) =>
                  sub.children.length > 0
                    ? sub.children.some((child) => child.permission === permission)
                    : sub.permission === permission,
                ),
              )
              .map((menu) =>
                menu.children.length > 0 ? (
                  <Menu.SubMenu
                    onTitleClick={() => {
                      if (menu.clickable) {
                        setActiveKey(String(menu.id));
                        navigator(menu.link);
                      }
                    }}
                    key={String(menu.id)}
                    title={menu.title}
                    popupClassName="header-menu-popup"
                  >
                    {menu.children
                      .filter((sub) => (permissions || []).includes(sub.permission))
                      .map((subMenu) => (
                        <Menu.Item key={String(subMenu.id)}>
                          <Link to={subMenu.link}>{subMenu.title}</Link>
                        </Menu.Item>
                      ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={String(menu.id)}>
                    <Link to={menu.link}>{menu.title}</Link>
                  </Menu.Item>
                ),
              )}
          </Menu>

          {/* <ul className="menu">
            {menus.map((menu, index) => (
              <li
                key={`menu-${index}`}
                className={cn('single', { 'is-active': pathname.includes(menu.link) })}
              >
                <Link to={menu.link}>{menu.title}</Link>
              </li>
            ))}
          </ul> */}
        </Styles.MenuContainer>

        <Styles.ActionsContainer>
          {/* <div className="icons">
            <div className="single-menu">
              <Dropdown overlay={LanguagesMenus} trigger={['click']}>
                <TranslationOutlined />
              </Dropdown>
            </div>
          </div> */}

          {/* <div className="icons">
            <div className="single-menu">
              <BellOutlined onClick={() => setNotificationOpen(true)} />
            </div>
          </div> */}
        </Styles.ActionsContainer>

        <Drawer
          placement="right"
          title="Ihre Mitteilungen"
          visible={notificationOpen}
          onClose={() => setNotificationOpen(false)}
        >
          <p>Club Admin</p>
        </Drawer>
      </div>

      <Styles.ProfileContainer ref={menuRef}>
        {/* <div className="user-dropdown" onClick={() => setOpen(true)}>
          <div className="avatar">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={profile?.avatar ? Env.PURE_URL + profile.avatar : undefined}
            />
          </div>

          <div className="username">
            <div className="status">
              <span>Verified</span>
            </div>
            <div className="name">
              <span>{profile?.person?.first_name + ' ' + profile?.person?.last_name}</span>
              <CaretDownOutlined />
            </div>
          </div>
        </div> */}

        <ProfileDropDown isPending={isPending} onLogout={handleLogout} />
      </Styles.ProfileContainer>
    </Styles.MainContainer>
  );
};

export default Header;

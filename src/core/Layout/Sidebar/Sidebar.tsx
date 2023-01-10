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
import { SearchOutlined } from '@ant-design/icons';
import { InlineSvg } from '@shared/components';
import { AuthContext } from '@src/core/Authentication';
import { Collapse, Input, Space, Typography } from 'antd';
import cn from 'classnames';
import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { SidebarChildMenu, SidebarMenus, SidebarProps } from '../types/Layout';
import Menu from './Menu.json';
import Styles from './Sidebar.style';

export default function Sidebar({ collapsed, toggleCollapsed }: SidebarProps): ReactElement {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [search, setSearch] = useState('');
  const [menus, setMenus] = useState<SidebarMenus[]>([]);
  const [activeKey, setActiveKey] = useState<string[]>();

  const { permissions, loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (pathname) {
      handleSearch(search, false);
    }
  }, [pathname]);

  const handleSearch = (inputValue: string, isFromInput: boolean) => {
    const value = inputValue.toLowerCase();
    setSearch(value);

    if (value === '' && !value) {
      const activeMenu = Menu.menus.find((menu) => pathname.includes(menu.linkPath));
      setActiveKey(activeMenu?.id ? [activeMenu.id] : ['0']);
      setMenus(Menu.menus.map((menu) => ({ ...menu, collapsed: pathname.includes(menu.linkPath) })));
      return;
    }

    const keys: string[] = [];
    const foundMenus: SidebarMenus[] = [];

    Menu.menus.forEach((parent) => {
      const childMenus: SidebarChildMenu[] = [];

      if (
        parent.title.toLowerCase().includes(value) ||
        parent.children.some((child) => child.title.toLowerCase().includes(value))
      ) {
        parent.children.forEach((child) => {
          if (child.title.toLowerCase().includes(value)) {
            childMenus.push(child);
          }
        });

        if (isFromInput) {
          keys.push(parent.id);
        }

        foundMenus.push({
          ...parent,
          collapsed: pathname.includes(parent.linkPath),
          children: childMenus.length === 0 ? parent.children : childMenus,
        });
      }
    });

    setActiveKey(keys);
    setMenus(foundMenus);
  };

  const handlePanelChange = (keys: string[]) => {
    setActiveKey(keys);
  };

  const panelHeader = (menu: SidebarMenus): JSX.Element => {
    return (
      <div
        onClick={() => collapsed && toggleCollapsed(!collapsed)}
        className={cn('panelHeaders', { active: menu.collapsed })}
      >
        <InlineSvg
          width={18}
          height={18}
          src={`/sidebar/${menu.icon}`}
          color={menu.collapsed ? '#F7617D' : '#fff'}
        />
        {!collapsed && <span>{t(menu.translate_title as any)}</span>}
      </div>
    );
  };

  const panelItem = (menu: SidebarMenus, child: SidebarChildMenu, index: number): JSX.Element | null => {
    
    return (
      <li
        key={index}
        className={pathname === `/admin${menu.linkPath + (child.link || '')}` ? 'sub_active' : ''}
      >
        <InlineSvg src={`/sidebar/dot.svg`} width={6} height={6} color="#fff" />
        <Link to={`/admin${menu.linkPath + (child.link || '')}`}>{t(child.translate_title as any)}</Link>
      </li>
    );
  };

  return (
    <Styles.SidebarContainer isPartner={loggedInUserRole === 'partner'} collapsed={collapsed}>
      <Styles.SidebarMenus>
        <div className="sidebar-header">
          <Space align="baseline" size={2}>
            <Typography.Title level={3}>{t('Global.WelcomeMessage')}</Typography.Title>
          </Space>
          <div className="menu" onClick={() => toggleCollapsed(!collapsed)}>
            {collapsed ? (
              <InlineSvg src="/sidebar/menu-close.svg" color="#fff" />
            ) : (
              <InlineSvg src="/sidebar/menu-open.svg" color="#fff" />
            )}
          </div>
        </div>

        <div className={'searchBoxHolder'} onClick={() => collapsed && toggleCollapsed(!collapsed)}>
          <Input
            allowClear
            value={search}
            className={'searchBox'}
            placeholder={t('Global.MenuSearch')}
            prefix={<SearchOutlined style={{ color: '#fff' }} />}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value, true)}
          />
        </div>

        <Collapse className="menus" activeKey={activeKey} onChange={handlePanelChange}>
          {menus
            
            .map((menu: SidebarMenus) => (
              <Collapse.Panel
                key={menu.id}
                showArrow={false}
                header={panelHeader(menu)}
                className={menu.collapsed ? 'active menu-item' : 'menu-item'}
              >
                <ul className="menu-items">
                  {menu.children.map((child, index) => panelItem(menu, child, index))}
                </ul>
              </Collapse.Panel>
            ))}
        </Collapse>
      </Styles.SidebarMenus>
    </Styles.SidebarContainer>
  );
}

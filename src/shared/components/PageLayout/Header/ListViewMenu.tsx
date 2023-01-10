import { InlineSvg } from '@shared/components';
import { Dropdown, Menu, Space, Tooltip } from 'antd';
import React from 'react';

const listMenus = [
  {
    key: 'list',
    title: 'List',
    icon: '/global/list.svg',
  },
  {
    key: 'tiles',
    title: 'Tiles',
    icon: '/global/tiles.svg',
  },
  {
    key: 'longTiles',
    title: 'LongTiles',
    icon: '/global/long-tiles.svg',
  },
];

const ViewMenu: React.FC<{ listView: string; setListView: (data: string) => void }> = ({
  listView,
  setListView,
}) => {
  const MenuList = (
    <Menu>
      {listMenus.map((list) => (
        <Menu.Item
          key={list.key}
          onClick={() => setListView(list.key)}
          className={list.key === listView ? 'active' : ''}
        >
          <Space>
            <InlineSvg width={15} height={15} src={list.icon} />
            <span>{list.title}</span>
          </Space>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={MenuList} trigger={['click']}>
      <Tooltip title={'Type of List View'}>
        <a onClick={(e) => e.preventDefault()}>
          <InlineSvg
            width={16}
            height={16}
            color="#2B7BB2"
            src={listMenus.find((menu) => menu.key === listView)?.icon}
          />
        </a>
      </Tooltip>
    </Dropdown>
  );
};

export default ViewMenu;

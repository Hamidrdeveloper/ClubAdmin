import { SearchOutlined } from '@ant-design/icons';
import { DownloadCategoryModel } from '@src/modules/Download/model/DownloadCategory.entity';
import { Input, Menu, Tooltip } from 'antd';
import React, { ChangeEventHandler, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { SubMenu } = Menu;

type Props = {
  onOptionChange: (ev: unknown) => void;
  items: DownloadCategoryModel[] | undefined;
  selectedDownloadCategory: string | undefined;
};

export default function DownloadViewMenu({
  items,
  onOptionChange,
  selectedDownloadCategory,
}: Props): ReactElement {
  const [searchItem, setSearchItem] = useState<string>('');
  const [isSearchIconVisible, setSearchIconVisible] = useState<boolean>(true);
  const { t } = useTranslation();

  const filterBySlug = (item: DownloadCategoryModel): boolean => {
    let result: boolean = item.slug.includes(searchItem);
    for (const child of item.children) {
      result = result || filterBySlug(child);
    }

    return result;
  };

  const searchInputChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const value = ev.target.value;
    if (value.length > 0) {
      // if search input is empty show searchIcon
      setSearchIconVisible(false);
    } else {
      setSearchIconVisible(true);
    }

    setSearchItem(value);
  };

  return (
    <MainContainer style={{ width: 256 }}>
      <Input
        allowClear
        onChange={searchInputChange}
        placeholder={t('DownloadView.TypeToSearch')}
        suffix={isSearchIconVisible ? <SearchOutlined /> : undefined}
      />
      <Menu mode="inline" onClick={onOptionChange}>
        {items
          ?.filter(filterBySlug)
          .sort(sortItemsFn)
          .map((item) => {
            return GenerateMenuItems({
              item,
              filterFn: filterBySlug,
              onClick: onOptionChange,
              customKey: String(item.id),
              selectedKey: selectedDownloadCategory,
            });
          })}
      </Menu>
    </MainContainer>
  );
}

type GenerateMenuProps = {
  customKey: string;
  item: DownloadCategoryModel;
  onClick: (ev: unknown) => void;
  selectedKey: string | undefined;
  filterFn: (item: DownloadCategoryModel) => boolean;
};
function GenerateMenuItems({ item, customKey, onClick, selectedKey, filterFn }: GenerateMenuProps) {
  const itemId = item.id;

  if (item?.children?.length === 0) {
    // if it doesn't have any children
    return (
      <Menu.Item key={itemId} className={selectedKey === String(itemId) ? 'selected' : ''}>
        <Tooltip title={item.name}>{item.name}</Tooltip>
      </Menu.Item>
    );
  }

  return (
    <SubMenu
      key={`${itemId}`}
      onTitleClick={onClick}
      className={selectedKey === String(itemId) ? 'selected' : ''}
      title={<Tooltip title={item.name}>{item.name}</Tooltip>}
    >
      {item?.children
        ?.filter(filterFn)
        .sort(sortItemsFn)
        .map((child) =>
          GenerateMenuItems({
            onClick,
            filterFn,
            item: child,
            selectedKey,
            customKey: `${customKey} - ${child.id}`,
          }),
        )}
    </SubMenu>
  );
}

// sorts download category items on this order (e.g=> 1, 2, 10, null)
function sortItemsFn<T extends DownloadCategoryModel>(a: T, b: T): number {
  if (a.sort === null) {
    return 1;
  } else if (b.sort === null) {
    return -1;
  } else return a.sort - b.sort;
}

const MainContainer = styled.div`
  width: 256;
  padding: 18px;

  .ant-menu-vertical .ant-menu-item::after,
  .ant-menu-vertical-left .ant-menu-item::after,
  .ant-menu-vertical-right .ant-menu-item::after,
  .ant-menu-inline .ant-menu-item::after {
    border-right: 0 !important;
  }

  & .ant-menu-item-selected {
    background-color: transparent !important;
  }

  .selected > div[role*='menuitem'] {
    color: var(--ant-primary-color);
    background-color: var(--ant-primary-1);
    border-right: 3px solid var(--ant-primary-color);
  }

  .selected.ant-menu-item-only-child {
    color: var(--ant-primary-color);
    border-right: 3px solid var(--ant-primary-color);
    background-color: var(--ant-primary-1) !important;
  }
`;

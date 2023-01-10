import {
  CloseOutlined,
  DeleteFilled,
  LoadingOutlined,
  PlusOutlined,
  SearchOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { InlineSvg } from '@shared/components';
import { DeleteRows } from '@src/shared/components/PageLayout/Lists/Services';
import { PaginationRequest } from '@src/shared/models';
import { Button, Input, Popconfirm, Space, Tooltip, Typography } from 'antd';
import queryString from 'query-string';
import React, { MouseEvent, ReactElement, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { usePageLayout } from '../PageLayoutPanel';
import Styles from './Header.style';
import { HeaderProps } from './Header.type';
import ViewMenu from './ListViewMenu';

export default function Header({
  module,
  hasSearch,
  onNew,
  onSort,
  onGroup,
  onSearch,
  onFilterButtonClick,
  ExtraAction,
  extraComponent,
  hasDelete,
  hasNew = false,
  hasFilters = true,
  newLink = 'upsert',
  noListView = false,
  noDescription = false,
  dontNavigate = false,
  element=null,
}: Partial<HeaderProps>): ReactElement {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);

  const {
    listView,
    isDetailVisible,
    selectedRows,
    isFilterVisible,
    setListView,
    setFilterVisible,
    setModalVisible,
    setDetailVisible,
    setSelectedRows,
    setRequestUpdate,
    setParams,
    selectedRowsData,
  } = usePageLayout();

  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | undefined>(
    params.search ? String(params.search) : '',
  );

  const onChangeSearchValue = (event: SyntheticEvent) => {
    setSearchValue(event.target['value']);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);

      navigate(
        `?${queryString.stringify(
          {
            search: searchValue !== '' ? searchValue : undefined,
          },
          { encode: false },
        )}`,
      );
    } else {
      const pageQueries: PaginationRequest = {
        page: 1,
        per_page: 10,
        orderBy: params.orderBy as string,
        search: searchValue !== '' ? searchValue : undefined,
      };

      if (dontNavigate)
        setParams((param) => {
          return { ...param, ...pageQueries } as Record<string, unknown>;
        });
      else navigate(`?${queryString.stringify(pageQueries, { encode: false })}`);
    }
  };

  const handleDeleteRows = () => {
    if (module) {
      setDeleteLoading(true);
      DeleteRows({ module, selectedRowIds: selectedRows })
        .then(() => {
          setSelectedRows([]);
          setRequestUpdate(true);
        })
        .finally(() => setDeleteLoading(false));
    }
  };

  const handleSearchVisible = () => {
    setSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setSearchValue('');
    setSearchVisible(false);

    if (onSearch) {
      onSearch('');
      navigate(`?${queryString.stringify({ search: undefined })}`);
    } else {
      const pageQueries: PaginationRequest = {
        page: 1,
        per_page: 10,
        search: undefined,
        orderBy: params.orderBy as string,
      };

      if (dontNavigate)
        setParams((param) => {
          return { ...param, ...pageQueries } as Record<string, unknown>;
        });
      else navigate(`?${queryString.stringify(pageQueries)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleSearch();
    }
  };

  const handleFilter = (e: MouseEvent) => {
    e.preventDefault();

    setParams({});
    setFilterVisible(!isFilterVisible);
  };

  const handleDetail = (e: MouseEvent) => {
    e.preventDefault();
    setDetailVisible(!isDetailVisible);
  };

  return (
    <>
      <Styles.Header>
        <Styles.MainContainer>
          <div className="title">
            <Typography.Title level={3}>{module?.title[1]}</Typography.Title>
          </div>

          <div className="contents">
            <Space size={40}>
              {hasNew && newLink && !onNew ? (
                <Link to={newLink} data-cy="new">
                  <Typography.Text strong>
                    <PlusOutlined />
                    <span>{t('Global.New')}</span>
                  </Typography.Text>
                </Link>
              ) : (
                hasNew && (
                  <Button data-cy="new" type="text" onClick={() => (onNew ? onNew() : setModalVisible(true))}>
                    <Typography.Text strong>
                      <PlusOutlined />
                      <span>{t('Global.New')}</span>
                    </Typography.Text>
                  </Button>
                )
              )}
             {element}
              {onSort && (
                <Button type="text" onClick={onSort}>
                  <Typography.Text strong>
                    <SwapOutlined style={{ transform: 'rotate(90deg)' }} />
                    <span>{t('Global.Sort')}</span>
                  </Typography.Text>
                </Button>
              )}

              {hasSearch && (
                <Button data-cy="search" type="text" onClick={handleSearchVisible}>
                  <Typography.Text strong>
                    <SearchOutlined />
                    <span>{t('Global.Search')}</span>
                  </Typography.Text>
                </Button>
              )}

              {isSearchVisible && (
                <div className="search-overlay">
                  <Input
                    data-cy="search-input"
                    size="large"
                    autoFocus
                    value={searchValue}
                    onKeyDown={handleKeyDown}
                    onChange={onChangeSearchValue}
                    placeholder="Search"
                    bordered={false}
                    suffix={
                      <Space size="large">
                        <CloseOutlined onClick={handleCloseSearch} />
                        <SearchOutlined onClick={handleSearch} />
                      </Space>
                    }
                  />
                </div>
              )}

              {hasDelete && (
                <Popconfirm
                  placement="bottom"
                  okText={t('Global.Yes')}
                  cancelText={t('Global.No')}
                  onConfirm={handleDeleteRows}
                  title={t('Global.DeleteSelectedRows?')}
                  disabled={selectedRows.length === 0}
                >
                  <Button type="text">
                    <Typography.Text strong>
                      {isDeleteLoading ? <LoadingOutlined /> : <DeleteFilled />}
                      <span>{t('Global.Delete')}</span>
                    </Typography.Text>
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </div>

          <div className="group-func">
            <Space>
              <Button
                type="primary"
                onClick={() => onGroup?.(selectedRows)}
                disabled={selectedRows.length === 0 || !onGroup}
              >
                {t('Global.GroupFunction')}
              </Button>

              {ExtraAction?.(selectedRows, selectedRowsData)}
            </Space>
          </div>
        </Styles.MainContainer>

        <div className="extra">
          <Space align={'center'} size={'large'}>
            {!noListView && <ViewMenu listView={listView} setListView={setListView} />}

            {hasFilters && (
              <Tooltip title={isFilterVisible ? 'Hide Filter' : 'Show Filter'}>
                <a onClick={onFilterButtonClick || handleFilter}>
                  <InlineSvg width={16} height={16} src={'/global/filter.svg'} color="#2B7BB2" />
                </a>
              </Tooltip>
            )}

            {!noDescription && (
              <Tooltip title={isDetailVisible ? 'Hide Details' : 'Show Details'}>
                <a onClick={handleDetail}>
                  <InlineSvg width={17} height={17} src={'/global/details.svg'} color="#2B7BB2" />
                </a>
              </Tooltip>
            )}
          </Space>
        </div>
      </Styles.Header>

      {extraComponent}
    </>
  );
}

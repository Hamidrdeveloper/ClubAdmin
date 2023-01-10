/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { CloseOutlined } from '@ant-design/icons';
import { useGetAllQuery } from '@src/shared/utils';
import { Button, Typography } from 'antd';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import queryString from 'query-string';
import React, { Key, ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import DetailContainer from '../DetailContainer/DetailContainer';
import GenericFormModal from '../GenericModal/GenericFormModal';
import { usePageLayout } from '../PageLayoutPanel';
import FilterContainer from './Filters';
import Styles from './ListView.style';
import { FilterColumns, ListViewProps } from './ListView.type';
import LongTiles from './LongTiles/LongTiles';
import MainPagination from './Pagination';
import { GetOne, UpdateDefault, UpdateProperty } from './Services';
import Table from './Table/Table';
import Tiles from './Tiles/Tiles';

export default function ListView<T>({
  module,
  onUpdate,
  onUpdateWithModel,
  hasActive,
  hasDefault,
  tableLayout,
  tableScroll,
  noSelection = false,
  params: _params = {},
  noId = false,
  togglers = [],
  hasUpdate = true,
  dontNavigate = false,
  updateLink = 'upsert',
  customEntities = undefined,
  greenSelectCondition = () => false,
}: ListViewProps<T> & {
  noSelection?: boolean;
  dontNavigate?: boolean;
  greenSelectCondition?: (id: number) => boolean;
}): ReactElement {
  const { t } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();

  const { UpsertComponent } = module;
  const pageParams = queryString.parse(search);
  const [orderBy, setOrderBy] = useState<Record<string, 'ASC' | 'DESC'>>();

  const {
    listView,
    isFilterVisible,
    selectedRows,
    requestUpdate,
    isDetailVisible,
    setSingleData,
    setSelectedRows,
    setFilterVisible,
    setModalVisible,
    setRequestUpdate,
    setSelectedRowsData,
    setParams,
    params,
  } = usePageLayout();

  const [detailData, setDetailData] = useState<T>();
  const [isPending, setPending] = useState<boolean>(false);

  const { data, isLoading, refetch } = useGetAllQuery<T>({
    service: customEntities?.getAll ?? module.apiService,
    params: { ..._params, ...params },
    orderBy: dontNavigate ? orderBy : undefined,
  });

  const paginationChangeHandler = (page, per_page) => {
    setParams((params) => {
      return { ...params, page, per_page };
    });
    refetch();
  };

  const sortChangeHandler = (param: Record<string, 'ASC' | 'DESC'>) => {
    setOrderBy(param);
  };

  const [tableColumns, setTableColumns] = useState<ColumnsType<T>>([]);

  useEffect(() => {
    if (requestUpdate) {
      refetch();
      setRequestUpdate(false);
    }
  }, [requestUpdate]);

  useEffect(() => {
    setParams(Object.assign(_params, params));

    if (pageParams && pageParams.orderBy) {
      const orderBy = JSON.parse(pageParams.orderBy as string);
      const orderByKey = Object.keys(orderBy)[0];

      setTableColumns(
        [
          ...defaultTableColumns,
          ...togglers.map((toggler) =>
            Object.assign(toggler, {
              width: 150,
              className: 'hasTile',
              key: toggler.dataIndex,
              render: (checked: boolean, data: T) => (
                <UpdateProperty
                  {...{
                    module,
                    checked,
                    refetch,
                    id: data['id'],
                    url: toggler.url,
                    // sometimes when we want to disable a toggle base on another field we will receive that dependency field from props
                    disabled: toggler?.disabled ? !data[toggler?.disabled] : undefined,
                    dataIndex: toggler.dataIndex,
                  }}
                />
              ),
            }),
          ),
        ].map((column) =>
          column.dataIndex !== orderByKey
            ? column
            : {
                ...column,
                sorter: true,
                defaultSortOrder: orderBy[orderByKey] === 'ASC' ? 'ascend' : 'descend',
              },
        ),
      );
    } else
      setTableColumns([
        ...defaultTableColumns,
        ...togglers.map((toggler) =>
          Object.assign(toggler, {
            width: 150,
            className: 'hasTile',
            key: toggler.dataIndex,
            render: (checked: boolean, data: T) => (
              <UpdateProperty
                {...{
                  module,
                  checked,
                  refetch,
                  id: data['id'],
                  url: toggler.url,
                  // sometimes when we want to disable a toggle base on another field we will receive that dependency field from props
                  disabled: toggler?.disabled ? !data[toggler?.disabled] : undefined,
                  dataIndex: toggler.dataIndex,
                }}
              />
            ),
          }),
        ),
      ]);
  }, [pageParams.orderBy]);

  const filterColumns = useMemo(() => {
    if (!data?.meta?.filters) return [];
    const filtersArr: FilterColumns[] = [];
    Object.keys(data.meta.filters).forEach((key) => {
      const filterValue = data.meta.filters[key];
      if (key !== 'ids') {
        filtersArr.push({
          key: key,
          type: filterValue,
          // if it exists in filterLinks then its type is select
          isSelect: !!data.meta.filterLinks[key],
          selectUrl: data.meta.filterLinks[key] ?? undefined,
        });
      }
    });

    // NOTE: Sort By Type -> 1. String 2. Number(int, float) - 3. Select - 4.Bool
    filtersArr.sort((a, b) => {
      switch (a.type) {
        case 'string':
          return -1;

        case 'float':
          return b.type === 'string' ? 1 : -1;

        case 'int':
          if (!a.isSelect || !b.isSelect) return b.type === 'string' || b.type === 'float' ? 1 : -1;
          else if (a.isSelect && !b.isSelect) return 1;
          else if (!a.isSelect && b.isSelect) return -1;
          else if (a.isSelect && b.isSelect) return 0;

        case 'boolean':
          return b.type === 'string' || b.type === 'int' || b.type === 'float' ? 1 : -1;

        default:
          return 0;
      }
    });

    return filtersArr;
  }, [data?.meta.filters]);

  useEffect(() => {
    if (data) {
      if (!pageParams?.orderBy) {
        setTableColumns((prev) =>
          prev.map((column) =>
            data.meta.orderByColumns?.includes(column['dataIndex'] as string)
              ? { ...column, sorter: true }
              : column,
          ),
        );
      }
    }
  }, [data]);

  const defaultTableColumns: ColumnType<T>[] = [
    {
      width: 80,
      key: 'id',
      title: 'ID',
      sorter: true,
      fixed: 'left',
      dataIndex: 'id',
      className: 'id hasTile hasLongTile',
      render: (id: number, data: T) =>
        hasUpdate ? (
          updateLink ? (
            <span
            onClick={() => {
              navigate(`${updateLink}/${id}`,{state: { data }})
            }}
          >
            {id}
          </span>
          ) : (
            <Link to={{pathname:`${updateLink}/${id}`, state: { id }}}>{id}</Link>
          )
        ) : (
          <span
            onClick={() => {
              onUpdate?.(id, data);
              onUpdateWithModel?.(data);
            }}
          >
            {id}
          </span>
        ),
    },
    ...module.tableColumns,
    ...[
      hasActive
        ? {
            width: 150,
            sorter: true,
            key: 'is_active',
            dataIndex: 'is_active',
            className: 'hasTile',

            title: t('Global.IsActive'),
            render: (checked: boolean, data: T) => (
              <UpdateProperty
                id={data['id']}
                module={module}
                checked={checked}
                refetch={refetch}
                dataIndex={'is_active'}
                // What is this @Amir?
                url={module.entity.match('product-variations|calendar-categories') ? 'active' : 'is-active'}
              />
            ),
          }
        : {},
    ],
    ...[
      hasDefault
        ? {
            width: 150,
            key: 'is_default',
            dataIndex: 'is_default',
            className: 'hasTile',
            title: t('Global.IsDefault'),
            render: (checked: boolean, data: T) => (
              <UpdateDefault
                id={data['id']}
                url={'default'}
                module={module}
                refetch={refetch}
                checked={checked}
              />
            ),
          }
        : {},
    ],
  ];

  const onRowSelect = (selectedRowKeys: Key[], selectedRowsData: Key[][]): void => {
    if (selectedRowsData.length > 0) {
      setSelectedRowsData(selectedRowsData);
    }

    setSelectedRows(selectedRowKeys);
  };

  const handleClickRow = (data: T): void | null => {
    if (isDetailVisible) {
      if (data['id'] !== detailData?.['id']) {
        setPending(true);
        module.apiService
          .getOne(data['id'] as number, customEntities?.getOne)
          .then((data) => {
            if (data) {
              setDetailData(data);
            }
          })
          .finally(() => setPending(false));
      }
    } else return null;
  };

  const handleUpsertCallback = () => {
    setModalVisible(false);
    setSingleData(undefined);
    refetch();
  };

  const filterTableHandler = (filters) => {
    setParams({ ..._params, filters });
  };

  const filterResetHandler = () => {
    setParams({});
  };
 
  return (
    <>
      <DetailContainer<T> data={detailData} isPending={isPending} columns={module?.detailColumns} />

      <Styles.FilterArea collapsed={isFilterVisible}>
        <Styles.FilterContainer collapsed={isFilterVisible}>
          <div className="header">
            <Typography.Title level={4}>Filter</Typography.Title>

            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => {
                filterResetHandler();
                setFilterVisible(false);
              }}
            />
          </div>

          <FilterContainer
            filters={filterColumns}
            dontNavigate={dontNavigate}
            onSubmit={filterTableHandler}
            onReset={filterResetHandler}
          />
        </Styles.FilterContainer>
        <Styles.ListContainer collapsed={isFilterVisible}>
          {listView === 'list' && tableColumns.length > 0 && (
            <Table
              noSelection={noSelection}
              hasNavigate={dontNavigate ? sortChangeHandler : undefined}
              loading={isLoading}
              dataSource={data?.data}
              tableLayout={tableLayout}
              tableScroll={tableScroll}
              onClickRow={handleClickRow}
              selectedRows={selectedRows}
              setSelectedRows={onRowSelect}
              columns={(noId
                ? tableColumns.slice(1).filter((col) => !col.className?.includes('noListView'))
                : tableColumns.filter((col) => !col.className?.includes('noListView'))
              ).map(({ width, ...column }, index, array) =>
                index === array.length - 1 ? { ...column } : { width, ...column },
              )}
            />
          )}

          {listView === 'longTiles' && tableColumns.length > 0 && (
            <LongTiles
              noId={noId}
              loading={isLoading}
              noSelection={noSelection}
              // put mainImage column to the first index column, (this prevent from updating state inside the following component)
              columns={tableColumns.slice().sort((a) => (a.className?.includes('mainImage') ? -1 : 0))}
              dataSource={data?.data}
              onClickRow={handleClickRow}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          )}

          {listView === 'tiles' && tableColumns.length > 0 && (
            <Tiles
              noId={noId}
              noSelection={noSelection}
              greenSelectCondition={greenSelectCondition}
              loading={isLoading}
              columns={tableColumns}
              dataSource={data?.data}
              onClickRow={handleClickRow}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          )}
        </Styles.ListContainer>
      </Styles.FilterArea>

      <MainPagination
        isPending={isLoading}
        pagination={data?.meta}
        dontNavigate={dontNavigate}
        onChange={paginationChangeHandler}
      />

      <GenericFormModal<T> module={module}>
        {UpsertComponent && <UpsertComponent module={module} onCallback={handleUpsertCallback} />}
      </GenericFormModal>
    </>
  );
}

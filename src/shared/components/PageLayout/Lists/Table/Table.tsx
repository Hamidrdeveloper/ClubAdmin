import { PaginationRequest } from '@src/shared/models';
import { Table, TablePaginationConfig } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { SorterResult } from 'antd/lib/table/interface';
import queryString from 'query-string';
import React, { Key, MouseEvent, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TableProps } from '../ListView.type';
import Styles from './Table.style';

function MainTable<T>({
  loading,
  columns,
  hasNavigate,
  onClickRow,
  noSelection,
  dataSource,
  selectedRows,
  setSelectedRows,
  tableLayout = 'auto',
}: TableProps<T> & { noSelection: boolean }): ReactElement {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  console.log('====================================');
  console.log(dataSource);
  console.log('====================================');
  const rowSelection: TableRowSelection<Key[]> = {
    columnWidth: 60,
    onChange: (selectedKeys, selectedRowsData) => {
      return setSelectedRows?.(selectedKeys, selectedRowsData);
    },
    selectedRowKeys: selectedRows,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE, Table.SELECTION_INVERT],
  };

  const handleRowClick = (data: any) => {
   
    return {
      onClick: (event: MouseEvent) => {
        if (!(event.target as HTMLSpanElement).classList.contains('id')) {
          onClickRow?.(data);
        }
      },
    };
  };

  const handleSortChange = (p: TablePaginationConfig, f: Record<string, any>, sorter: SorterResult<T>) => {
    if (Object.keys(p).length > 0 && Object.keys(f).length > 0) {
      // Just For Preventing Unsed Variable Warning and non-used vars.
      console.log(p, f);
    }

    const { query } = queryString.parseUrl(pathname + search);
    if (sorter && sorter.columnKey && sorter.order && sorter.column && sorter.column.dataIndex) {
      const dataIndex = sorter.column.dataIndex as string;
      if (hasNavigate) {
        hasNavigate({
          [dataIndex]: sorter.order === 'ascend' ? 'ASC' : 'DESC',
        });
      } else {
        navigate(
          `?${queryString.stringify(
            {
              ...query,
              orderBy: JSON.stringify({
                [dataIndex]: sorter.order === 'ascend' ? 'ASC' : 'DESC',
              }),
            },
            { encode: false },
          )}`,
        );
      }
    } else {
      // When we wanna reset the sort.
      const pageQueries: PaginationRequest = {
        page: query.page ? Number(query.page) : 1,
        per_page: query.per_page ? Number(query.per_page) : 10,
        search: query.search ? String(query.search) : undefined,
      };

      if (hasNavigate) {
        hasNavigate({});
      } else navigate(`?${queryString.stringify(pageQueries)}`);
    }
  };

  return (
    <Styles.MainContainer>
      <Table
        rowKey="id"
        size={'middle'}
        loading={loading}
        columns={columns}
        pagination={false}
        onRow={handleRowClick}
        dataSource={dataSource}
        tableLayout={tableLayout}
        rowSelection={noSelection ? undefined : rowSelection}
        onChange={handleSortChange}
        // prevent from un-wanted indents - if data we receive from backend has children property it will cause an indent
        childrenColumnName={'notChildrenProperty'}
      />
    </Styles.MainContainer>
  );
}

export default React.memo(
  function <T>(props: TableProps<T> & { noSelection: boolean }) {
    return <MainTable {...props} />;
  },
  (prev, next) =>
    prev.loading === next.loading &&
    prev.dataSource === next.dataSource &&
    prev.selectedRows === next.selectedRows &&
    prev.onClickRow === next.onClickRow,
);

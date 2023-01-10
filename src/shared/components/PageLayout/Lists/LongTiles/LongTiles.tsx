import { Env } from '@src/core';
import { Card, Col, Row, Typography } from 'antd';
import { DataIndex } from 'rc-table/lib/interface';
import React, { MouseEvent, ReactElement } from 'react';

import { usePageLayout } from '../../PageLayoutPanel';
import { TableProps } from '../ListView.type';
import Styles from './LongTiles.style';

function LongTiles<T>({
  noId,
  loading,
  columns,
  dataSource,
  noSelection,
  selectedRows,
  onClickRow,
  setSelectedRows,
}: TableProps<T> & { noId: boolean; noSelection: boolean }): ReactElement {
  const { setSelectedRowsData, selectedRowsData } = usePageLayout();
  const handleSelect = (e: MouseEvent, data: T) => {
    if (noSelection) {
      return;
    }
    if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).id !== 'id') {
      onClickRow?.(data);
      if (selectedRows?.some((selected) => selected === data['id'])) {
        setSelectedRows?.(selectedRows.filter((row) => row !== data['id']));
        setSelectedRowsData?.(selectedRowsData.filter((row) => row !== data));
      } else {
        setSelectedRows?.([...(selectedRows || []), data['id']]);
        setSelectedRowsData?.([...(selectedRowsData || []), data]);
      }
    }
  };

  const getColumnData = (index: DataIndex, data: T): string | number | undefined => {
    let value: string | number | boolean = -1;

    if (Array.isArray(index)) {
      index.forEach((subKey) => {
        if (value === -1) {
          value = data[subKey];
        } else {
          value = value ? value[subKey] : '-';
        }
      });

      return value;
    } else if (typeof index === 'string' || typeof index === 'number') {
      return data[index];
    }

    return undefined;
  };

  return (
    <Styles.MainContainer>
      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from(new Array(9)).map((_, index) => (
            <Col span={8} key={`data-${index}`}>
              <Card loading />
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {(dataSource || []).map((data, index) => (
            <Col span={8} key={`data-${index}`}>
              <Card
                onClick={(e) => handleSelect(e, data)}
                className={selectedRows?.some((selected) => selected === data['id']) ? 'active' : ''}
              >
                {(noId ? (columns || []).slice(1) : columns || []).map((column, index) =>
                  // NOTE this is hasTile intentional since we don't wanna change every module tableColumns classNames
                  column?.className?.includes('hasTile') ? (
                    column?.className?.includes('mainImage') ? (
                      <div className="mainImage" key={`column-${index}`}>
                        <img
                          src={column.dataIndex ? Env.PURE_URL + getColumnData(column.dataIndex, data) : ''}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = require('@src/assets/images/global/placeholder.jpeg');
                          }}
                          alt="Main Image Not Available"
                        />
                      </div>
                    ) : (
                      <div className="single" key={`column-${index}`}>
                        <Typography.Text>{column.title}</Typography.Text>

                        <div className={column.className}>
                          {column.render ? (
                            column.render(column.key ? data[column.key] : '-', data, index)
                          ) : (
                            <Typography.Text>
                              {column.dataIndex ? getColumnData(column.dataIndex, data) : '-'}
                            </Typography.Text>
                          )}
                        </div>
                      </div>
                    )
                  ) : null,
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Styles.MainContainer>
  );
}

export default React.memo(
  function <T>(props: TableProps<T> & { noId: boolean; noSelection: boolean }) {
    return <LongTiles {...props} />;
  },
  (prev, next) =>
    prev.loading === next.loading &&
    prev.dataSource === next.dataSource &&
    prev.selectedRows === next.selectedRows &&
    prev.onClickRow === next.onClickRow,
);

import { Card, Col, Row, Typography } from 'antd';
import { DataIndex } from 'rc-table/lib/interface';
import React, { MouseEvent, ReactElement } from 'react';

import { usePageLayout } from '../../PageLayoutPanel';
import { TableProps } from '../ListView.type';
import Styles from './Tiles.style';

function Tiles<T>({
  noId,
  loading,
  columns,
  dataSource,
  selectedRows,
  onClickRow,
  noSelection,
  setSelectedRows,
  greenSelectCondition = () => false,
}: TableProps<T> & {
  noId: boolean;
  noSelection: boolean;
  greenSelectCondition?: (id: number) => boolean;
}): ReactElement {
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

  const getColumnData = (index: DataIndex, data: T) => {
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

    return '';
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
          {(dataSource || [])?.map((data, index) => (
            <Col span={8} key={`data-${index}`}>
              <Card
                onClick={(e) => handleSelect(e, data)}
                className={
                  (selectedRows?.some((selected) => selected === data['id']) ? 'active' : '') +
                  ' ' +
                  (greenSelectCondition(data['id']) ? 'greenActive' : '')
                }
              >
                {(noId ? (columns || []).slice(1) : columns || []).map((column, index) =>
                  column?.className?.includes('hasTile') ? (
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
  function <T>(
    props: TableProps<T> & {
      greenSelectCondition?: (id: number) => boolean;
      noId: boolean;
      noSelection: boolean;
    },
  ) {
    return <Tiles {...props} />;
  },
  (prev, next) =>
    prev.loading === next.loading &&
    prev.dataSource === next.dataSource &&
    prev.selectedRows === next.selectedRows &&
    prev.onClickRow === next.onClickRow,
);

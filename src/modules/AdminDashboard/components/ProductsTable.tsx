import { getProductInventories } from '@modules/AdminDashboard/services';
import i18n from '@src/core/i18n/config';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

export const ProductsTable: FC = ({}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(['dashboard-product-inventory', page], () =>
    getProductInventories({ page: page, per_page: 10 }),
  );

  const productColumns: ColumnsType = [
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.ID'),
    },
    {
      title: i18n.t('AdminDashboard.ProductName'),
      dataIndex: ['productVariation', 'name'],
      key: 'name',
    },
    {
      title: i18n.t('AdminDashboard.Number'),
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];
  return (
    <Table
      pagination={{
        showSizeChanger: false,
        total: data?.meta?.last_page,
        onChange: (page) => setPage(page),
      }}
      dataSource={data?.data}
      columns={productColumns}
      loading={isLoading}
    />
  );
};

export default ProductsTable;

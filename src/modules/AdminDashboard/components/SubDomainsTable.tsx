import { getSubdomains } from '@modules/AdminDashboard/services';
import i18n from '@src/core/i18n/config';
import subdomainModuleInfo from '@src/modules/Subdomain/ModuleInfo.json';
import { Button, Table, TableColumnsType } from 'antd';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

export const SubDomainsTable: FC = ({}) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery(
    ['dashboard-sub-domain', page],
    () => getSubdomains({ page: page, per_page: 10 }, false),
    { keepPreviousData: true },
  );

  const subDomainColumns: TableColumnsType = [
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.ID'),
    },
    {
      title: i18n.t('AdminDashboard.Subdomain'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => (
        <Button ghost type="primary" href={`admin${subdomainModuleInfo.Route.replace('*', '')}upsert/${id}`}>
          {i18n.t('Global.Setting')}
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      pagination={{
        total: data?.meta?.last_page,
        onChange: (page) => setPage(page),
        showSizeChanger: false,
      }}
      dataSource={data?.data}
      columns={subDomainColumns}
      loading={isFetching}
    />
  );
};

export default SubDomainsTable;

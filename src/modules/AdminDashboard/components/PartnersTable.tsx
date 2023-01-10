import { getPartners } from '@modules/AdminDashboard/services';
import i18n from '@src/core/i18n/config';
import userModuleInfo from '@src/modules/User/ModuleInfo.json';
import { Button, Table, TableColumnsType } from 'antd';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

export const PartnersTable: FC = ({}) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery(
    ['dashboard-partners', page],
    () => getPartners({ page: page, per_page: 10 }),
    { keepPreviousData: true },
  );

  const partnerColumns: TableColumnsType = [
    {
      key: 'id',
      dataIndex: ['user', 'partner', 'id'],
      title: i18n.t('Global.ID'),
    },
    {
      key: 'full_name',
      dataIndex: ['user', 'partner', 'fullname'],
      title: i18n.t('Global.Partner'),
    },
    {
      title: '',
      dataIndex: ['user', 'partner', 'id'],
      render: (id) => (
        <Button
          ghost
          type="primary"
          href={`admin${userModuleInfo.Route.replace('*', '')}manage/partner/${id}?active=7`}
        >
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
      columns={partnerColumns}
      loading={isFetching}
    />
  );
};

export default PartnersTable;

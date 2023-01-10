import { getCompetitions } from '@modules/AdminDashboard/services';
import i18n from '@src/core/i18n/config';
import { Table } from 'antd';
import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

import { DateRenderer } from './TableComponents';

export const CompetitionTable: FC = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(['dashboard-competition', page], () =>
    getCompetitions({ page: page, per_page: 10 }, true),
  );
  const CompetitionColumns: any = [
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.ID'),
    },
    {
      title: i18n.t('AdminDashboard.CompetitionName'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: i18n.t('AdminDashboard.StartDate'),
      render: DateRenderer,
      dataIndex: 'release_date',
    },
    {
      title: i18n.t('AdminDashboard.EndDate'),
      render: DateRenderer,
      dataIndex: 'available_until',
    },
    {
      title: i18n.t('AdminDashboard.Status'),
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <Table
      rowKey="id"
      pagination={{
        total: data?.meta?.total,
        onChange: (page) => setPage(page),
        showSizeChanger: false,
      }}
      dataSource={data?.data}
      columns={CompetitionColumns}
      loading={isLoading}
    />
  );
};

export default CompetitionTable;

import { getUpdatedPartners } from '@modules/AdminDashboard/services';
import i18n from '@src/core/i18n/config';
import { generateUserLinkBasedOnIdAndRole } from '@src/shared/utils/engine.service';
import { Table, TableColumnsType } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { RangeDateProps } from '../pages/AdminDashboard';

export const UpdatedPartnersTable = ({ dateRange }: { dateRange: RangeDateProps }): ReactElement => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery(
    ['dashboard-partners-updated', page, dateRange],
    () => getUpdatedPartners({ page: page, per_page: 10 }, false, dateRange),
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
      dataIndex: 'user_id',
      render: (id) => {
        const manageLink = generateUserLinkBasedOnIdAndRole(id, 'partner');

        return <Link to={manageLink}>{i18n.t('Global.Setting')}</Link>;
      },
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

export default UpdatedPartnersTable;

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BoxContainer from '@modules/PartnerDashboard/components/BoxContainer';
import { PageLayout } from '@shared/components';
import { Col, Row } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CompetitionTable,
  OrderInfo,
  ProductsTable,
  SubDomainsTable,
  UpdatedSubDomainsTable,
} from '../components';
import AdminDatePicker from '../components/AdminDatePicker';
import PartnersTable from '../components/PartnersTable';
import UpdatedPartnersTable from '../components/UpdatedPartnersTable';

export type RangeDateProps = {
  from_date: string;
  to_date: string;
};

export const yesterday = (() => moment().subtract(1, 'days').format('YYYY-MM-DD'))();
export const today = (() => moment().format('YYYY-MM-DD'))();

export const AdminDashboard: FC = () => {
  const { t } = useTranslation();

  const [selectedDateRange, setSelectedAdminDateRange] = useState<RangeDateProps>({
    to_date: today,
    from_date: yesterday,
  });

  const breadcrumbItems = [
    {
      path: `/admin`,
      breadcrumbName: 'Dashboard',
    },
  ];

  return (
    <>
      
    </>
  );
};

export default AdminDashboard;

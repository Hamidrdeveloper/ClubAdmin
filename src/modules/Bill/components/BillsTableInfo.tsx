import i18n from '@src/core/i18n/config';
import { usePageLayout } from '@src/shared/components';
import { intlDate } from '@src/shared/utils/engine.service';
import { Checkbox, message, notification } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import { t } from 'i18next';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { ABill, Bill } from '../model/bill.entity';

export const BillTableDateComponent = (date: string): ReactElement => {
  return <span>{Boolean(date) ? intlDate(date) : ' - '}</span>;
};

export const BillTableIsApprovedComponent = (data: Bill): ReactElement => {
  const [isApprovedConfirmed, setIsApprovedConfirmed] = useState<boolean>(false);
  return (
    <Checkbox
      checked={isApprovedConfirmed || data?.is_approved}
      disabled={isApprovedConfirmed || data?.is_approved}
      onClick={() => {
        const isApproved = window.confirm(t('Bill.IsApprovedConfirmation'));
        setIsApprovedConfirmed(isApproved);
        if (isApproved) {
          axios
            .put<{ data: { message: string } }>(`/abills/${data?.id}/approve`)
            .then((response) => {
              message.success(response?.data?.data?.message);
            })
            .catch((error) => {
              notification.error(error?.message);
            });
        }
      }}
    />
  );
};

export const IsPaidRenderer = (isPaid: boolean, data: Bill): ReactElement => {
  const { setRequestUpdate } = usePageLayout();

  return (
    <Checkbox
      checked={isPaid}
      onClick={() => {
        const isPaidConfirmed = window.confirm(t('Bill.IsPaidConfirmation'));

        if (isPaidConfirmed) {
          axios
            .put<{ data: { message: string } }>(`/bill/${data?.id}/paid`)
            .then((response) => {
              message.success(response?.data?.data?.message);
            })
            .catch((error) => {
              notification.error(error?.message);
            })
            .finally(() => {
              setRequestUpdate(true);
            });
        }
      }}
    />
  );
};

export const BillColumns = (): ColumnsType<ABill> => [
  {
    key: 'id',
    width: 50,
    className: 'id number',
    dataIndex: 'id',
    title: i18n.t('Global.ID'),
    fixed: 'left' as any,
    render: (id: number) => <Link to={'/admin/bills/description/' + id}>{id}</Link>,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: i18n.t('Global.Name'),
    width: 400,
  },
  {
    key: 'from',
    dataIndex: 'from',
    title: i18n.t('Global.From'),
    render: BillTableDateComponent,
  },
  {
    key: 'to',
    dataIndex: 'to',
    title: i18n.t('Global.To'),
    render: BillTableDateComponent,
  },
  {
    key: 'hidden',
    dataIndex: 'hidden',
    title: i18n.t('Bill.Field.Hidden'),
  },
  {
    key: 'bill_number_generated',
    dataIndex: 'bill_number_generated',
    title: i18n.t('Bill.Field.BillNumberGenerated'),
    width: 200,
  },
  {
    key: 'promotion_executed',
    dataIndex: 'promotion_executed',
    title: i18n.t('Bill.Field.PromotionExecuted'),
    render: BillTableDateComponent,
  },
  {
    key: 'created_at',
    dataIndex: 'created_at',
    title: i18n.t('Global.CreatedAt'),
    render: BillTableDateComponent,
  },
  {
    key: 'update_at',
    dataIndex: 'updated_at',
    title: i18n.t('Global.UpdatedAt'),
    render: BillTableDateComponent,
  },
];

{
  /* */
}

import { DownloadOutlined, FileOutlined, SyncOutlined } from '@ant-design/icons';
import { User as UserAuthenticationModel } from '@src/core/Authentication/model';
import i18n from '@src/core/i18n/config';
import { Country } from '@src/modules/Country';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { ContactGroups, User } from '@src/modules/User';
import { generateUserManageLinkBaseOnRole, intlCurrency, intlDate } from '@src/shared/utils/engine.service';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';
import React, { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { Bill } from '../model/bill.entity';
import { createBillDownload, createBillPreview, regenerateBill } from '../service/bills.service';

export const BillsTableDateComponent = (date: string): ReactElement => (
  <span>{date ? intlDate(new Date(String(date).replace(/'-'/g, '/'))) : ' - '}</span>
);
export const NullRenderer = (data: string): ReactElement => <span>{data ?? ' - '}</span>;
export const BillsTableConditionComponent = (condition: boolean): ReactElement => (
  <span>{condition ? 'Yes' : 'No'}</span>
);
export const BillsTableContactGroupComponent = (contactGroup: ContactGroups): ReactElement => (
  <span>
    {contactGroup?.title ??
      `${contactGroup?.first_name} ${contactGroup?.last_name} ${contactGroup?.company_name}` ??
      ' - '}
  </span>
);
export const BillsTableCountryComponent = (country: Country): ReactElement => (
  <span>{country?.name ?? ' - '}</span>
);
export const BillsTableCurrencyComponent = (price: number, allData: Record<string, any>): ReactElement => (
  <span>{intlCurrency(allData?.country?.currency['iso3'] ?? 'EUR', price ?? 0)}</span>
);
export const BillsTablePaymentMethodComponent = (paymentMethod: PaymentMethod): ReactElement => (
  <span>{paymentMethod?.name ?? ' - '}</span>
);
export const BillsTablePercentComponent = (percent: number): ReactElement => (
  <span>{(percent ?? 0) + '%'}</span>
);

// NOTE: readability has left the file
export const BillsTableUserComponent = (
  user: User,
  { first_name, last_name }: Record<string, any>,
): ReactElement => (
  <span>
    {(first_name ?? user?.person?.first_name) +
      ' ' +
      (last_name ?? user?.person?.last_name) +
      ' ' +
      (user?.person?.company_name ?? '')}
  </span>
);

export const NavigateToUserRenderer: FC<User> = (user, data: Bill) => {
  const userRole = user?.roles.map((role) => role.slug)[0];

  const manageLink = generateUserManageLinkBaseOnRole({
    role: userRole,
    profile: user as unknown as UserAuthenticationModel,
  });

  return <Link to={manageLink}>{data?.user_id ?? user?.id}</Link>;
};

export const NavigateToPartnerRenderer: FC<User> = (user, data: Bill) => {
  const manageLink = generateUserManageLinkBaseOnRole({
    role: 'partner',
    profile: user as unknown as UserAuthenticationModel,
  });

  return <Link to={manageLink}>{data?.user?.partner_id ?? user?.partner?.id}</Link>;
};

export const BillsTableLinkComponent = (bill: Bill): ReactElement => {
  return <Link to={`/admin/bills/description/${bill?.abill_id}/positions/${bill?.id}`}>{bill?.id}</Link>;
};

export const BillTablePreviewComponent = (id: number): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  return (
    <Tooltip title={i18n.t('Bill.Field.Preview')}>
      <Button
        icon={<FileOutlined />}
        size="small"
        type="ghost"
        loading={pending}
        onClick={() => {
          setPending(true);
          createBillPreview(id)
            .then((previewUrl) => {
              window.open(previewUrl, '_blank');
              setPending(false);
            })
            .catch(() => setPending(false));
        }}
      />
    </Tooltip>
  );
};

export const BillTableDownloadBtnRenderer = (id: number): ReactElement => {
  // TODO: use Transition
  const [pending, setPending] = useState<boolean>(false);

  const onDownloadBtnClick = () => {
    setPending(true);
    createBillDownload(id)
      .then((previewUrl) => window.open(previewUrl, '_blank'))
      .finally(() => setPending(false));
  };

  return (
    <Tooltip title={i18n.t('Global.Download')}>
      <Button
        size="small"
        type="ghost"
        loading={pending}
        icon={<DownloadOutlined />}
        onClick={onDownloadBtnClick}
      />
    </Tooltip>
  );
};

// NOTE: not receiving ID from dataIndex and key table columns - (by reading id from allRowData would prevent from orderingBy id in this column);
export const BillTableRegenerateBtnRenderer = (_: unknown, billsData: Bill): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const id = billsData.id;

  const onRegenerateBtnClick = () => {
    setPending(true);

    regenerateBill(id)
      .then((previewUrl) => window.open(previewUrl, '_blank'))
      .finally(() => setPending(false));
  };

  return (
    <Popconfirm title={i18n.t('Bill.Field.RegenerationConfirmWarning')} onConfirm={onRegenerateBtnClick}>
      <Tooltip title={i18n.t('Bill.Field.Regenerate')}>
        <Button size="small" type="ghost" disabled={pending} icon={<SyncOutlined spin={pending} />} />
      </Tooltip>
    </Popconfirm>
  );
};

export const BillDescColumns = (aBillId?: number): ColumnsType<Bill> => [
  {
    key: 'id',
    width: 70,
    className: 'id number',
    dataIndex: 'id',
    title: i18n.t('Global.ID'),
    fixed: 'left' as any,
    render: (id: number) => <Link to={`/admin/bills/description/${aBillId}/positions/${id}`}>{id}</Link>,
  },
  {
    key: 'career_step',
    dataIndex: 'careerStep',
    title: i18n.t('Bill.Field.CareerStep'),
    render: NullRenderer,
    width: 200,
  },
  {
    key: 'contact_group',
    dataIndex: 'contactGroup',
    title: i18n.t('Global.ContactGroup'),
    render: BillsTableContactGroupComponent,
    width: 200,
  },
  {
    key: 'country',
    dataIndex: 'country',
    title: i18n.t('Global.Country'),
    render: BillsTableCountryComponent,
  },
  {
    key: 'factor',
    dataIndex: 'factor',
    title: i18n.t('Bill.Field.Factor'),
    width: 50,
  },
  {
    key: 'gender',
    dataIndex: 'gender',
    title: i18n.t('Global.Gender'),
  },
  {
    key: 'iban',
    dataIndex: 'iban',
    title: i18n.t('Bill.Field.IBAN'),
  },
  {
    key: 'is_paid',
    dataIndex: 'is_paid',
    title: i18n.t('Global.IsPaid'),
    render: BillsTableConditionComponent,
    width: 70,
  },
  {
    key: 'number',
    dataIndex: 'number',
    title: i18n.t('Global.Number'),
  },
  {
    key: 'pay_date',
    dataIndex: 'pay_date',
    title: i18n.t('Bill.Field.PayDate'),
    render: BillsTableDateComponent,
  },
  {
    key: 'payment_method',
    dataIndex: 'paymentMethod',
    title: i18n.t('Bill.Field.PaymentMethod'),
    render: BillsTablePaymentMethodComponent,
  },
  {
    key: 'swift',
    dataIndex: 'swift',
    title: i18n.t('Bill.Field.Swift'),
  },
  {
    key: 'tax_number',
    dataIndex: 'tax_number',
    title: i18n.t('Bill.Field.TaxNumber'),
  },
  {
    key: 'total_amount',
    dataIndex: 'total_amount',
    title: i18n.t('Global.TotalAmount'),
    render: BillsTableCurrencyComponent,
  },
  {
    width: 200,
    key: 'user',
    title: i18n.t('Global.User'),
    render: BillsTableUserComponent,
  },
  {
    key: 'vat',
    dataIndex: 'vat',
    title: i18n.t('Bill.Field.Vat'),
    render: BillsTableCurrencyComponent,
  },
  {
    key: 'vat_percent',
    dataIndex: 'vat_percent',
    title: i18n.t('Bill.Field.VatPercent'),
    render: BillsTablePercentComponent,
    width: 50,
  },
];

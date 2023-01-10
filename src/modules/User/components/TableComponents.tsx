import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import Env from '@src/core/Configs/ConfigureEnv';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { intlDate } from '@src/shared/utils/engine.service';
import { Avatar, Space } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Address } from '../model/address';
import { User } from '../model/personalInfo';

export const AvatarRenderer: React.FC<{ avatar: string; record: User }> = ({ avatar, record }) => {
  return (
    <Space>
      <Avatar icon={<UserOutlined />} src={avatar ? Env.PURE_URL + avatar : undefined} />
      <span>{record.username}</span>
    </Space>
  );
};

export const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const FileRenderer: FC<string> = (file) => {
  if (file) {
    return (
      <a target="_blank" href={Env.PURE_URL + file}>
        <Space>
          <EyeOutlined />
          <span> Show Pdf </span>
        </Space>
      </a>
    );
  } else {
    return <span>-</span>;
  }
};

export const AddressRenderer: FC<Address['address']> = (address: Address['address']) => (
  <div style={{ marginLeft: '12px' }} dangerouslySetInnerHTML={{ __html: address.address_complete }} />
);

export const MailRenderer: FC<{ data: string }> = ({ data }) => {
  return <a href={`mailto:${data}`}>{data}</a>;
};

export const SponsorRenderer: FC<{ data: string }> = ({ data }) => {
  return data ? <Link to={`/admin/users/manage/partner/${data}`}>{data}</Link> : <span>-</span>;
};

export const NavigateToUserRenderer: FC<number> = (userId) => {
  // link to user page
  return <Link to={`/users/manage/${userId}`}>{userId}</Link>;
};

export const AmountRenderer: FC<number> = (amount) => {
  // TODO
  return <span>{amount}</span>;
};

export const PaymentMethodRenderer: FC<PaymentMethod> = (paymentMethod) => {
  return <span>{paymentMethod?.name || '-'}</span>;
};

export const DetailsAddressRenderer: React.FC<{ data?: Address['address_complete'] }> = ({
  data: address_complete,
}) => {
  return (
    <span>{address_complete ? <div dangerouslySetInnerHTML={{ __html: address_complete }} /> : ' - '}</span>
  );
};

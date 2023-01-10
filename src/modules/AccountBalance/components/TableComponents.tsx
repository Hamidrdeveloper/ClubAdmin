import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { User as UserAuthenticationModel } from '@src/core/Authentication/model';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { AccountBalanceModel } from '@src/modules/User/model/accountBalance';
import { generateUserManageLinkBaseOnRole, intlDate } from '@src/shared/utils/engine.service';
import Text from 'antd/lib/typography/Text';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const NavigateToUserRenderer: FC<void> = (_, data: AccountBalanceModel) => {
  const userRole = data.user?.roles?.map((role) => role.slug)[0];

  const manageLink = generateUserManageLinkBaseOnRole({
    role: userRole,
    profile: data.user as unknown as UserAuthenticationModel,
  });

  return <Link to={manageLink}>{data.user?.person?.full_name ?? data.user_id}</Link>;
};

export const AmountRenderer: FC<number> = (amount, { positive }: AccountBalanceModel) => {
  return (
    <Text type={positive ? 'success' : 'danger'}>
      {`${positive ? '+' : '-'}${amount.toFixed(2)}`} {positive ? <CaretUpOutlined /> : <CaretDownOutlined />}{' '}
    </Text>
  );
};

export const TotalAmountRenderer: FC<number> = (
  totalAmount,
  { total_positive, total_amount_symbol }: AccountBalanceModel,
) => {
  return (
    <Text type={total_positive ? 'success' : 'danger'}>
      {total_amount_symbol}
      {totalAmount.toFixed(2)}
    </Text>
  );
};

export const PaymentMethodRenderer: FC<PaymentMethod> = (paymentMethod) => {
  return <span>{paymentMethod?.name || '-'}</span>;
};

export const AccountableTypeIDRenderer: FC<void> = (_, allData: AccountBalanceModel) => {
  const { accountable_type: type, accountable_id: id } = allData;

  if (type === 'OrderSale') {
    return <Link to={`/admin/orders/order-sale/${id}`}>{id}</Link>;
  }

  return <span>{id}</span>;
};

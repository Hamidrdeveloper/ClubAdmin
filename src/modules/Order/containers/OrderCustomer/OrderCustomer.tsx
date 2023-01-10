import { SubscriptionSalePure } from '@modules/Order';
import { Loader } from '@src/shared/components';
import { generateUserLinkBasedOnIdAndRole } from '@src/shared/utils/engine.service';
import { Descriptions } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getCreditCustomerFromCreditSale } from '../../controllers/credit.controller';
import { getOrderCustomerFromOrderSale } from '../../controllers/order.controller';
import { getPurchaseCustomerFromPurchaseSale } from '../../controllers/purchase.controller';
import { getSubscriptionCustomerFromSubscriptionSale } from '../../controllers/subscription.controller';
import {
  CreditSalePure,
  OrderCustomerModel,
  OrderModuleType,
  OrderSalePure,
  OrderSaleType,
  PurchaseCustomerModel,
  PurchaseSalePure,
} from '../..';

const { Item } = Descriptions;

interface Props {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
}
const OrderCustomer = ({ orderSale, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  const [orderCustomer, setOrderCustomer] = useState<OrderCustomerModel | PurchaseCustomerModel | null>();

  useEffect(() => {
    if (orderSale)
      setOrderCustomer(
        {
          credit: getCreditCustomerFromCreditSale(orderSale as CreditSalePure),
          'order-sale': getOrderCustomerFromOrderSale(orderSale as OrderSalePure),
          subscription: getSubscriptionCustomerFromSubscriptionSale(orderSale as SubscriptionSalePure),
          purchase: getPurchaseCustomerFromPurchaseSale(orderSale as PurchaseSalePure),
        }[moduleType],
      );
  }, [orderSale]);

  if (!orderCustomer || !orderSale) return <Loader title={t('Order.Customer.Loader')} />;

  const {
    email,
    username,
    gender,
    lastName,
    firstName,
    companyName,
    taxNumber,
    vatNumber,
    eoriNumber,
    country,
    language,
    paymentMethod,
    creditLimit,
    shippingMethod,
    paymentTerm,
    userDiscount,
  } = orderCustomer;

  return (
    <Descriptions title={t('Order.Customer.CustomerInfo')} bordered column={2}>
      {orderSale?.user?.person ? (
        <Item label={t('Global.FirstName')}>
          <Link
            to={generateUserLinkBasedOnIdAndRole(
              orderSale?.user?.id,
              orderSale?.user?.partner !== null ? 'partner' : 'user',
            )}
          >
            {firstName}
          </Link>
        </Item>
      ) : (
        <Item label={t('Global.FirstName')}>{firstName}</Item>
      )}
      {orderSale?.user?.person ? (
        <Item label={t('Global.LastName')}>
          <Link
            to={generateUserLinkBasedOnIdAndRole(
              orderSale?.user?.id,
              orderSale?.user?.partner !== null ? 'partner' : 'user',
            )}
          >
            {lastName}
          </Link>
        </Item>
      ) : (
        <Item label={t('Global.FirstName')}>{lastName}</Item>
      )}
      <Item label={t('Global.Gender')}>{gender}</Item>
      <Item label={t('Global.Username')}>{username}</Item>
      {companyName && <Item label={t('Order.Customer.CompanyName')}>{companyName}</Item>}
      {email && <Item label={t('Global.Email')}>{email}</Item>}
      {paymentTerm && (
        <Item label={t('PaymentTerm.Title')}>
          {paymentTerm.description && (
            <>
              {t('PaymentTerm.Field.Description')} : {paymentTerm.description}
            </>
          )}
          <br />
          {paymentTerm.due_days && (
            <>
              {t('PaymentTerm.Field.DueDays')} : {paymentTerm.due_days}
            </>
          )}
          <br />
          {paymentTerm.discount_percentage && (
            <>
              {t('PaymentTerm.Field.DiscountPercentage')} : {paymentTerm.discount_percentage}
            </>
          )}
        </Item>
      )}
      <Item label={t('Country.Title')}>{country}</Item>
      <Item label={t('User.Field.TaxNumber')}>{taxNumber}</Item>
      {vatNumber && <Item label={t('User.Field.VatNumber')}>{vatNumber}</Item>}
      <Item label={t('User.Field.EoriNumber')}>{eoriNumber}</Item>
      <Item label={t('Language.Title')}>{language}</Item>
      <Item label={t('PaymentMethod.Title')}>{paymentMethod}</Item>
      <Item label={t('User.Field.CreditLimit')}>{creditLimit}</Item>
      <Item label={t('User.Field.DefaultShippingMethod')}>{shippingMethod}</Item>
      {/*<Item label={t('Role.Title', { count: 2 })}>{roles?.join(', ')}</Item>*/}
      <Item label={t('User.Field.UserDiscount')}>{userDiscount}</Item>
      {orderSale?.user?.sponsor && (
        <Item label={t('Order.Field.Sponsor')}>
          <Link to={`/admin/users/manage/partner/${orderSale?.user?.sponsor?.user_id?.toString()}?active=7`}>
            {orderSale?.user?.sponsor?.fullname}
          </Link>
        </Item>
      )}
    </Descriptions>
  );
};

export default OrderCustomer;

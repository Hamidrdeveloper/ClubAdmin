/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PurchaseInfoModel, PurchaseSalePure, SubscriptionSalePure } from '@modules/Order';
import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import { FlagSelect } from '@src/modules/Flag';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Loader } from '@src/shared/components';
import { generateUserLinkBasedOnIdAndRole, intlCurrency, intlDate } from '@src/shared/utils/engine.service';
import { Col, Row, Typography, message, notification } from 'antd';
import moment from 'moment';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getCreditInfoFromCreditSale } from '../../controllers/credit.controller';
import { getOrderInfoFromOrderSale, updateFlag } from '../../controllers/order.controller';
import { getPartnerInfoFromPartnerSale } from '../../controllers/partner.controller';
import { getPurchaseInfoFromPurchaseSale } from '../../controllers/purchase.controller';
import { getSubscriptionInfoFromSubscriptionSale } from '../../controllers/subscription.controller';
import { updateCheckoutDate } from '../../services/credit.service';
import { updateOrderSaleCheckoutDate } from '../../services/order.service';
import {
  CreditSalePure,
  OrderInfoModel,
  OrderModuleType,
  OrderSalePure,
  OrderSaleType,
  PartnerSalePure,
} from '../..';
import EditableText from '../EditableText';

type Props = { orderSale: OrderSaleType; moduleType: OrderModuleType };
const OrderInfo = ({ orderSale, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const [orderInfo, setOrderInfo] = useState<OrderInfoModel | PurchaseInfoModel | null>(null);

  const [isPending, setPending] = useState<boolean | undefined>(undefined);
  const [flags, setFlags] = useState<Flag[]>(orderSale?.flags ?? []);

  const onFlagChange = (flags: Flag[]) => {
    setPending(true);
    updateFlag({ id: orderSale?.id ?? -1, flag_ids: flags.map((flag) => flag.id) }, moduleType)
      .then(() => {
        setPending(undefined);
        setFlags(flags);
      })
      .catch(() => setPending(undefined));
  };

  useEffect(() => {
    if (!orderSale) return;
    switch (moduleType) {
      case 'order-sale':
        setOrderInfo(getOrderInfoFromOrderSale(orderSale as OrderSalePure));
        break;
      case 'credit':
        setOrderInfo(getCreditInfoFromCreditSale(orderSale as CreditSalePure));
        break;
      case 'subscription':
        setOrderInfo(getSubscriptionInfoFromSubscriptionSale(orderSale as SubscriptionSalePure));
        break;
      case 'purchase':
        setOrderInfo(getPurchaseInfoFromPurchaseSale(orderSale as PurchaseSalePure));
        break;
      case 'partner':
        setOrderInfo(getPartnerInfoFromPartnerSale(orderSale as PartnerSalePure));
        break;
    }
  }, [orderSale]);

  if (!orderInfo) return <Loader />;

  const { ipAddress, estimatedShippingDate, customerName, customerId, checkoutDate } = orderInfo;
  return (
    <MainContainer>
      <Row className="item">
        <Col span={12}>{getIdRow({ t, orderSale })[moduleType]}</Col>
        <Col span={12}>
          <strong>{orderSale?.id ?? ' - '}</strong>
        </Col>
      </Row>

      <Row className="item">
        <Col span={12}>
          {/* We used i18n here cause our key was conditional! */}
          <span>{i18n.t(moduleType === 'purchase' ? 'Order.Titles.Supplier' : 'Order.Titles.Customer')}</span>
        </Col>
        <Col span={12}>
          <strong>
            {customerName} (
            <Link
              to={generateUserLinkBasedOnIdAndRole(
                customerId,
                moduleType === 'purchase'
                  ? 'supplier'
                  : orderSale?.user?.partner !== null
                  ? 'partner'
                  : 'user',
              )}
            >
              {customerId}
            </Link>
            )
          </strong>
        </Col>
      </Row>

      {orderSale?.user?.sponsor && (
        <Row className="item">
          <Col span={12}>
            {/* We used i18n here cause our key was conditional! */}
            <span>Sponsor</span>
          </Col>
          <Col span={12}>
            <strong>
              {orderSale?.user?.sponsor?.fullname}(
              <Link to={generateUserLinkBasedOnIdAndRole(orderSale?.user?.sponsor?.user_id, 'partner')}>
                {orderSale?.user?.sponsor?.user_id}
              </Link>
              )
            </strong>
          </Col>
        </Row>
      )}

      {moduleType !== 'purchase' && (
        <Row className="item">
          <Col span={24}>
            {moduleType === 'credit' ? (
              <EditableText
                disabled={isOrderReadOnly}
                isPending={isPending}
                title={<span>{t('Order.Titles.Checkout')}</span>}
                child={
                  <Typography.Text strong>{checkoutDate ? intlDate(checkoutDate) : '-'}</Typography.Text>
                }
                isDate
                defaultEditValue={checkoutDate ? moment(checkoutDate) : undefined}
                onSubmit={(value) => {
                  setPending(true);
                  updateCheckoutDate(orderSale!.id, moment(value).format('YYYY-MM-DD'))
                    .then((response) => {
                      message.success(response?.message);
                      setPending(false);
                    })
                    .catch((error) => {
                      notification.error(error.message);
                    });
                }}
              />
            ) : moduleType === 'order-sale' ? (
              <EditableText
                disabled={isOrderReadOnly}
                isPending={isPending}
                title={<span>{t('Order.Titles.Checkout')}</span>}
                child={
                  <Typography.Text strong>{checkoutDate ? intlDate(checkoutDate) : '-'}</Typography.Text>
                }
                isDate
                defaultEditValue={checkoutDate ? moment(checkoutDate) : undefined}
                onSubmit={(value) => {
                  setPending(true);
                  updateOrderSaleCheckoutDate(orderSale!.id, moment(value).format('YYYY-MM-DD'))
                    .then((response) => {
                      message.success(response?.message);
                      setPending(false);
                    })
                    .catch((error) => {
                      notification.error(error.message);
                    });
                }}
              />
            ) : (
              <Row className="item">
                <Col span={12}>
                  <span>{t('Order.Titles.Checkout')}</span>
                </Col>
                <Col span={12}>
                  <strong>{checkoutDate ? intlDate(checkoutDate) : '-'}</strong>
                </Col>
              </Row>
            )}
            {/* <Col span={4}>
              <Button className="info-btn" shape="default" icon={<AimOutlined />} />
            </Col> */}
          </Col>
        </Row>
      )}

      {moduleType !== 'purchase' && (
        <Row className="item">
          <Col span={12}>
            <span>{t('Order.Titles.IPAddress')}</span>
          </Col>
          <Col span={12}>
            <Row align="middle">
              <Col span={20}>
                <strong>{ipAddress}</strong>
              </Col>
              {/* <Col span={4}>
              <Button className="info-btn" shape="default" icon={<EditOutlined />} />
            </Col> */}
            </Row>
          </Col>
        </Row>
      )}

      {moduleType !== 'subscription' && moduleType !== 'purchase' && (
        <Row className="item">
          <Col span={12}>
            <span>{t('Order.Titles.EstimatedShipping')}</span>
          </Col>
          <Col span={12}>
            <strong>{estimatedShippingDate ? intlDate(estimatedShippingDate) : '-'}</strong>
          </Col>
        </Row>
      )}

      {moduleType === 'subscription' && (
        <>
          <Row className="item">
            <Col span={12}>
              <span>{t('Order.Titles.LastDelDate')}</span>
            </Col>
            <Col span={12}>
              <strong>
                {orderInfo['lastOrderSaleDate'] ? intlDate(orderInfo['lastOrderSaleDate']) : '-'}
              </strong>
            </Col>
          </Row>
          <Row className="item">
            <Col span={12}>
              <span>{t('Order.Titles.NextDelDate')}</span>
            </Col>
            <Col span={12}>
              <strong>
                {orderInfo['nextOrderSaleDate'] ? intlDate(orderInfo['nextOrderSaleDate']) : '-'}
              </strong>
            </Col>
          </Row>{' '}
        </>
      )}

      {moduleType !== 'purchase' &&
        moduleType !== 'partner' &&
        ((orderInfo as OrderInfoModel).ppd || []).map(({ percentage_of_provision, total }) => (
          <Row className="item">
            <Col span={12}>
              <span>{t('Order.Titles.POP')}</span>
            </Col>
            <Col span={12}>
              <strong>{percentage_of_provision}%</strong>
              <span>
                (
                <strong>
                  {intlCurrency(
                    moduleType === 'credit'
                      ? (orderSale as CreditSalePure)?.order.currency?.iso3 ?? 'EUR'
                      : orderSale?.['currency']?.iso3 ?? 'EUR',
                    total,
                  )}
                </strong>
                )
              </span>
            </Col>
          </Row>
        ))}

      <Row className="item">
        <Col span={12}>
          <span>{t('Order.Titles.Flag')}</span>
        </Col>
        <Col span={12}>
          <FlagSelect
            value={flags}
            onChange={(flags) => onFlagChange(flags as Flag[])}
            disabled={isPending || isOrderReadOnly}
            isPending={isPending}
            isMulti
          />
        </Col>
      </Row>

      {moduleType === 'order-sale' && (orderSale as OrderSalePure).coupon[0] && (
        <Row className="item">
          <Col span={12}>
            <span>{t('Order.Titles.Coupon')}</span>
          </Col>
          <Col span={12}>
            <strong>
              {(orderSale as OrderSalePure).coupon[0]?.couponCodes?.[0].code +
                ' (' +
                ((orderSale as OrderSalePure).coupon[0]?.type === 'percent'
                  ? (orderSale as OrderSalePure).coupon[0]?.amount + '%'
                  : intlCurrency(
                      (orderSale as OrderSalePure).currency?.iso3 ?? 'EUR',
                      (orderSale as OrderSalePure).coupon[0]?.amount,
                    )) +
                ')'}
            </strong>
          </Col>
        </Row>
      )}
    </MainContainer>
  );
};

export default OrderInfo;

const getIdRow = ({ t, orderSale }) => ({
  'order-sale': <span>{t('Order.Titles.OrderSaleId')}</span>,
  credit: (
    <span>
      {t('Order.Titles.CreditNoteId')} ({t('Global.From')}{' '}
      <Link to={'/admin/orders/order-sale/' + orderSale?.order?.id}>{orderSale?.order?.id ?? ' - '}</Link>)
    </span>
  ),
  subscription: <span>{t('Order.Titles.OrderSubscriptionId')}</span>,
  purchase: <span>{t('Order.Titles.PurchaseSaleId')}</span>,
});

const MainContainer = styled.div`
  border: 1px solid #ededed;

  & .item {
    padding: 8px;
    height: 100%;

    & .info-btn {
      color: #5b67d0;
    }

    &:nth-child(even) {
      background: #f2f2f2;
    }

    & .ant-select {
      width: 100%;
      & .ant-select-selector {
        position: relative;
        border: 1px solid #deeae6;
        outline: none;
        background-color: #fff;
        border-radius: 3px;
      }
    }
  }
`;

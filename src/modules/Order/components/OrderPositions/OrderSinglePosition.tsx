/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined } from '@ant-design/icons';
import { AuthContext, Env } from '@src/core';
import { intlCurrency, intlDate, intlFormatter, weightFormatter } from '@src/shared/utils/engine.service';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { OrderModuleType, OrderPositionModelType, OrderSalePositionModel } from '../..';

type Props = {
  order: OrderPositionModelType;
  moduleType: OrderModuleType;
  index: number;
  shownParentId: number;
  isShown: boolean;
  isFromOutside?: boolean;
  isComponent: boolean;
  isBundle: boolean;
  showComponents?: (id: number, index: number) => void;
  editDeliveredQuantity: (id: number) => void;
  bookmarkItem: (id: number) => void;
};
const OrderSinglePosition = ({
  index,
  order: {
    grossPrice,
    orderId,
    productVariation,
    productId,
    quantity,
    // discount,
    // returnOnSale,
    updatedAt,
    vat,
    weight,
    iso3,
    ...othersOrder
  },
  moduleType,
  isComponent,
  isFromOutside = false,
  shownParentId,
  isBundle,
  isShown,
  bookmarkItem,
  showComponents,
}: Props): ReactElement | null => {
  const { t } = useTranslation();

  const {
    profile: { roles },
    loggedInUserRole,
  } = useContext(AuthContext);

  // FIXME: Refactor this using loggedInUserRole
  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const ShowComponentsButton = () => {
    return (
      <Row align="bottom" justify="end">
        <AccordionButton
          isOpened={orderId === shownParentId}
          onClick={() => showComponents?.(orderId, index)}
        >
          Show Components {shownParentId === orderId ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </AccordionButton>
      </Row>
    );
  };

  return (
    <RelativeContainer isShown={moduleType === 'credit' || isBundle || isShown} isComponent={isComponent}>
      <MainContainer isComponent={isComponent}>
        {isFromOutside ? (
          <Row>
            <Col span={3} className="content">
              <Row className="inner" align="middle">
                <div>
                  <p>
                    {productId ? (
                      <Link
                        to={
                          isOrderReadOnly
                            ? `${Env.SHOP_URL}/products/detail/${productId}`
                            : `/admin/products/manage/${productId}`
                        }
                      >
                        {productVariation.number}
                      </Link>
                    ) : (
                      productVariation.number
                    )}
                  </p>
                  <p>
                    {productId ? (
                      <Link
                        to={
                          isOrderReadOnly
                            ? `${Env.SHOP_URL}/products/detail/${productId}/${productVariation.id}`
                            : `/admin/products/manage/${productId}/${productVariation.id}`
                        }
                      >
                        {productVariation.id}
                      </Link>
                    ) : (
                      productVariation.id
                    )}
                  </p>
                  <p>{orderId}</p>
                </div>
              </Row>
            </Col>

            <Col span={6} className="content">
              <Row className="inner" align="middle">
                <strong>{quantity}</strong>
              </Row>
            </Col>

            <Col span={9} className="content">
              <Row className="inner" align="middle">
                <div className="items">
                  <div className="alert">{productVariation.name}</div>
                  <div className="item">
                    <strong>{t('Order.Titles.Updated')}:</strong>&nbsp;
                    <span>{updatedAt ? intlDate(updatedAt) : '-'}</span>
                  </div>
                  <div className="item">
                    <strong>{t('Order.Titles.ShippingProfile')}:</strong>&nbsp;
                    <span>{productVariation.shippingName}</span>
                  </div>
                  <div className="item">
                    <strong>{t('Order.Titles.DeliveryDate')}:</strong>&nbsp;
                    <span>
                      {productVariation.deliveryDate ? intlDate(productVariation.deliveryDate) : '-'}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>

            <Col span={6} className="content">
              <Row className="inner" align="middle">
                <strong>{weightFormatter(weight)}</strong>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={2} className="content">
              <Row className="inner" align="middle">
                <div>
                  <p>
                    {productId && loggedInUserRole !== 'partner' ? (
                      <Link to={`/admin/products/manage/${productId}`}>{productVariation.number}</Link>
                    ) : (
                      productVariation.number
                    )}
                  </p>
                  <p>
                    {productId && loggedInUserRole !== 'partner' ? (
                      <Link to={`/admin/products/manage/${productId}/${productVariation.id}`}>
                        {productVariation.id}
                      </Link>
                    ) : (
                      productVariation.id
                    )}
                  </p>
                  <p>{orderId}</p>
                </div>
              </Row>
            </Col>

            <Col span={2} className="content">
              <Row className="inner" align="middle">
                <strong>{quantity}</strong>
              </Row>
            </Col>

            <Col span={moduleType === 'purchase' ? 8 : 6} className="content">
              <Row className="inner" align="middle">
                <div className="items">
                  <div className="alert">{productVariation.name}</div>
                  <div className="item">
                    <strong>{t('Order.Titles.Updated')}:</strong>&nbsp;
                    <span>{updatedAt ? intlDate(updatedAt) : '-'}</span>
                  </div>
                  <div className="item">
                    <strong>{t('Order.Titles.ShippingProfile')}:</strong>&nbsp;
                    <span>{productVariation.shippingName}</span>
                  </div>
                  <div className="item">
                    <strong>{t('Order.Titles.DeliveryDate')}:</strong>&nbsp;
                    <span>
                      {productVariation.deliveryDate ? intlDate(productVariation.deliveryDate) : '-'}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>

            <Col span={moduleType === 'credit' ? 3 : 2} className="content">
              <Row className="inner" align="middle">
                <div className="price">
                  <strong>{intlCurrency(iso3, grossPrice ?? 0)}</strong>
                </div>
              </Row>
            </Col>

            {/* {moduleType !== 'credit' && moduleType !== 'purchase' && (
              <Col span={2} className="content">
                <Row className="inner" align="middle">
                  <strong>{intlCurrency(iso3, returnOnSale ?? 0)}</strong>
                </Row>
              </Col>
            )} */}

            {/* {moduleType !== 'purchase' && (
              <Col span={2} className="content">
                <Row className="inner" align="middle">
                  <strong>{intlCurrency(iso3, discount ?? 0)}</strong>
                </Row>
              </Col>
            )} */}

            <Col span={2} className="content">
              <Row className="inner" align="middle">
                <strong>{weightFormatter(weight)}</strong>
              </Row>
            </Col>

            <Col span={1} className="content">
              <Row className="inner" align="middle">
                <strong>{vat?.value ?? '0'}%</strong>
              </Row>
            </Col>

            {moduleType !== 'purchase' && (
              <>
                {/* <Col span={3} className="content">
                  <Row className="inner" align="middle">
                    <strong>{intlCurrency(iso3, othersOrder['careerStepDiscount'] ?? 0)}</strong>
                  </Row>
                </Col> */}

                <Col span={2} className="content">
                  <Row className="inner" align="middle">
                    <strong>{intlFormatter(othersOrder['percentageOfProvision'] ?? 0)}</strong>
                  </Row>
                </Col>

                <Col span={3} className="content">
                  <Row className="inner" align="middle">
                    <strong>{intlCurrency(iso3, othersOrder['provisionPrice'] ?? 0)}</strong>
                  </Row>
                </Col>
              </>
            )}

            {moduleType === 'purchase' && (
              <Col span={3} className="content">
                <Row className="inner" align="middle">
                  <Space direction="vertical">
                    {/*<Tooltip title={t('Order.EditDeliveredQuantity')}>*/}
                    {/*  <Button*/}
                    {/*    ghost*/}
                    {/*    type="primary"*/}
                    {/*    icon={<DeploymentUnitOutlined />}*/}
                    {/*    onClick={() => editDeliveredQuantity(orderId)}*/}
                    {/*  />*/}
                    {/*</Tooltip>*/}

                    <Tooltip title={t('Order.BookItem')}>
                      <Button
                        disabled={isOrderReadOnly}
                        ghost
                        type="primary"
                        icon={<BookOutlined />}
                        onClick={() => bookmarkItem(productVariation?.id ?? productId)}
                      />
                    </Tooltip>
                  </Space>
                </Row>
              </Col>
            )}
          </Row>
        )}
        {moduleType !== 'credit' && isBundle && ShowComponentsButton()}
        {moduleType !== 'credit' &&
          !isBundle &&
          (othersOrder as OrderSalePositionModel).orderPositionType?.id === 16 && (
            <PromotionalArticle>Promotional Article</PromotionalArticle>
          )}
      </MainContainer>
    </RelativeContainer>
  );
};

export default OrderSinglePosition;

const MainContainer = styled.div<{ isComponent: boolean }>`
  padding: 16px;
  background-color: ${({ isComponent }) => (isComponent ? '#e8f5e9' : '')};

  & .content {
    padding-left: 8px;
    padding-right: 4px;

    & .inner {
      height: 100%;

      & .action-btn {
        color: #2b7bb2;
      }
    }

    & .items {
      width: 100%;
      & .tag-item {
        margin-top: 20px;
      }

      & .item {
        padding: 4px 0;
      }

      & .alert {
        background: #c9e9ff;
        padding: 8px 12px;
        position: relative;
        margin-bottom: 8px;
        width: 100%;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #2b7bb2;
        }
      }
    }

    & .price {
      & .info {
        margin-bottom: 16px;
      }

      & .price {
        color: #2b7bb2;
      }
    }
  }

  & .table_title {
    margin-top: 4px;
  }

  & .row_item {
    padding: 8px 12px;
    border: 1px solid #e4e4eb;
    margin-bottom: 4px;
    min-height: 6vh;
    justify-content: center;
    align-items: center;
  }

  & .row_item .ant-form-item,
  & .row_item .tab_title {
    margin: 0 !important;
  }

  & .row_item.first {
    background: #f2f2f2;
  }

  & .product-variation-id-container {
    display: flex;
    align-items: center;
    justify-content: right;

    & > * {
      color: #1a8a1a;
      font-size: 12px;
    }
  }
`;

const RelativeContainer = styled.div<{ isShown: boolean; isComponent: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${(props) => (!props.isShown ? 'none' : 'block')};
  border-bottom: ${(props) => (props.isComponent ? ' 2px dashed #43a047' : '0')};
`;

const AccordionButton = styled.div<{ isOpened: boolean }>`
  background-color: #e8f5e9;
  border: 2px solid;
  border-bottom-style: dashed;
  border-bottom-color: ${(props) => (props.isOpened ? '#e8f5e9' : '#43a047')};
  border-top-left-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 164px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  color: #1a8a1a;
  cursor: pointer;
`;

const PromotionalArticle = styled.div`
  background-color: #c200a2;
  border: 2px solid;
  border-bottom-style: dashed;
  border-bottom-color: #c200a2;
  border-top-left-radius: 4px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 164px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  color: #fff;
`;

import { PurchaseSalePure, SubscriptionSalePure } from '@modules/Order';
import { AuthContext } from '@src/core';
import { Loader, SuperSelect } from '@src/shared/components';
import { intlCurrency, intlDate, weightFormatter } from '@src/shared/utils/engine.service';
import { Col, Row, Select, Typography } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import EditableTextOrderPositions from '../../components/EditableTextOrderPositions';
import OverviewBox from '../../components/OrderOverview/OverviewBox';
import { getCreditOverviewFromCreditSale } from '../../controllers/credit.controller';
import { getOrderOverviewFromOrderSale, updateStatus } from '../../controllers/order.controller';
import { getPartnerOverviewFromPartnerSale } from '../../controllers/partner.controller';
import { getPurchaseOverviewFromPurchaseSale } from '../../controllers/purchase.controller';
import { getSubscriptionOverviewFromSubscriptionSale } from '../../controllers/subscription.controller';
import { OrderStatusChildModule } from '../../Order.module';
import {
  updateOrderCreditNotesCareerSteps,
  updateOrderCreditNotesCouponItem,
  updateOrderCreditNotesPromotionalArticle,
  updateOrderCreditNotesPromotionalCoupon,
  updateOrderCreditNotesShippingCost,
  updateOrderCreditNotesVoucherLevel,
  updateOrderCreditNotesWalletPoint,
} from '../../services/credit.service';
import {
  updateCareerStepDiscount,
  updatePromotionalCouponDiscount,
  updateShippingCostDiscount,
  updateUserDiscount,
  updateVoucherLevelDiscount,
} from '../../services/order.service';
import {
  CreditSalePure,
  OrderDetailTabs,
  OrderModuleType,
  OrderOverviewModelType,
  OrderSalePure,
  OrderSaleType,
  OrderStatus,
  PartnerSalePure,
} from '../..';

const { Option } = Select;

type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
export const OrderOverviewDetails = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();
  const {
    profile: { roles },
    loggedInUserRole,
  } = useContext(AuthContext);

  const careerStepDiscount =
    orderSale && orderSale['orderSalePositions']
      ? orderSale['orderSalePositions'].find((pos) => pos.orderPositionType.name === 'career step bonus')
      : undefined;

  const userDiscount =
    orderSale && orderSale['orderSalePositions']
      ? orderSale['orderSalePositions'].find((pos) => pos.orderPositionType.name === 'User Discount')
      : undefined;

  const shippingCost =
    orderSale && orderSale['orderSalePositions']
      ? orderSale['orderSalePositions'].find((pos) => pos.orderPositionType.name === 'Shipping Costs')
      : undefined;
  const voucherLevel =
    orderSale && orderSale['orderSalePositions']
      ? orderSale['orderSalePositions'].find((pos) => pos.orderPositionType.name === 'Voucher Level')
      : undefined;
  const promotionalCoupon =
    orderSale && orderSale['orderSalePositions']
      ? orderSale['orderSalePositions'].find((pos) => pos.orderPositionType.name === 'Promotional Coupon')
      : undefined;

  const CrediteNoteCareerStepDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'career step bonus',
        )
      : undefined;
  const CrediteNoteShippingCost =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Shipping Costs',
        )
      : undefined;
  const CrediteNoteVoucherDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Voucher Level',
        )
      : undefined;
  const CrediteNoteCouponItemDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Coupon Item',
        )
      : undefined;
  const CrediteNotePromotionalCouponDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Promotional Coupon',
        )
      : undefined;
  const CrediteNotePromotionalArticleDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Promotional Article',
        )
      : undefined;
  const CrediteNoteWalletPointDiscount =
    orderSale && orderSale['orderCreditNotePositions']
      ? orderSale['orderCreditNotePositions'].find(
          (pos) => pos.orderPosition.orderPositionType.name === 'Wallet Point',
        )
      : undefined;
  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');
  const orderPartnerSale: OrderSaleType & { status: string } = orderSale as OrderSaleType & {
    status: string;
  };

  const isOrderUserRolePartner =
    orderSale && orderSale['user'] && orderSale['user'].roles.length > 0
      ? !!orderSale['user'].roles.find((role) => role.slug === 'partner')
      : false;

  const [orderOverview, setOrderOverview] = useState<OrderOverviewModelType>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (orderSale) {
      switch (moduleType) {
        case 'order-sale':
          setOrderOverview(getOrderOverviewFromOrderSale(orderSale as OrderSalePure));
          break;
        case 'credit':
          setOrderOverview(getCreditOverviewFromCreditSale(orderSale as CreditSalePure));
          break;
        case 'subscription':
          setOrderOverview(getSubscriptionOverviewFromSubscriptionSale(orderSale as SubscriptionSalePure));
          break;
        case 'purchase':
          setOrderOverview(getPurchaseOverviewFromPurchaseSale(orderSale as PurchaseSalePure));
          break;
        case 'partner':
          setOrderOverview(getPartnerOverviewFromPartnerSale(orderSale as PartnerSalePure));
      }
    }
  }, [orderSale]);

  if (!orderOverview) return <Loader />;

  const changeStatus = (orderSaleId: number, orderStatusId: number): void => {
    setPending(true);
    updateStatus(orderSaleId, orderStatusId, moduleType)
      .then(() => {
        updateTab(OrderDetailTabs.All);
        setPending(false);
      })
      .catch(() => setPending(false));
  };

  const handleOrderPartnerStatusChange = (status: number) => {
    updateStatus((orderSale as any).id, status, moduleType)
      .then(() => {
        updateTab(OrderDetailTabs.All);
        setPending(false);
      })
      .catch(() => setPending(false));
  };
  return (
    <MainContainer>
      <Row gutter={4}>
        <Col flex={1}>
          <OverviewBox title={t('Order.Edit.ItemQuantity')}>
            <span className="black-label">{orderOverview.itemQuantity}</span>
          </OverviewBox>
        </Col>

        {moduleType !== 'credit' && moduleType !== 'partner' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.Weight')}>
              <span className="black-label">{weightFormatter(orderOverview.weight)}</span>
            </OverviewBox>
          </Col>
        )}

        <Col flex={1}>
          <OverviewBox title={t('Order.Edit.NetValueOfItems')}>
            <span className="black-label">
              {intlCurrency(orderOverview.iso3, orderOverview.netValueOfItems)}
            </span>
          </OverviewBox>
        </Col>

        <Col flex={1}>
          <OverviewBox title={t('Order.Edit.GrossValueOfItems')}>
            <span className="black-label">
              {intlCurrency(orderOverview.iso3, orderOverview.grossValueOfItems)}
            </span>
          </OverviewBox>
        </Col>

        {moduleType === 'subscription' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.SubDate')}>
              <span className="green-label">{intlDate(orderOverview['subscriptionDate'])}</span>
            </OverviewBox>
          </Col>
        )}

        {moduleType !== 'subscription' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.AmountPaid')}>
              <span className="green-label">
                {intlCurrency(orderOverview.iso3, orderOverview['amountPaid'])}
              </span>
            </OverviewBox>
          </Col>
        )}

        <Col flex={1}>
          <OverviewBox title={t('Order.Edit.TotalPrice')}>
            <span className="red-label">{intlCurrency(orderOverview.iso3, orderOverview.totalPrice)}</span>
          </OverviewBox>
        </Col>
      </Row>

      {moduleType !== 'purchase' && moduleType !== 'partner' && (
        <Row gutter={4} style={{ marginTop: '16px' }}>
          {moduleType === 'order-sale' && isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.CareerStepDiscount')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={careerStepDiscount ? careerStepDiscount.gross_amount : 0}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(
                          orderOverview.iso3,
                          careerStepDiscount ? careerStepDiscount.gross_amount : 0,
                        )}
                      </Typography.Text>
                    }
                    onSubmit={updateCareerStepDiscount}
                    orderId={orderSale!.id}
                    vatValue={careerStepDiscount ? careerStepDiscount.vat_value : orderSale?.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(
                      orderOverview.iso3,
                      careerStepDiscount ? careerStepDiscount.gross_amount : 0,
                    )}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {!promotionalCoupon && moduleType === 'order-sale' && !isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.UserDiscount')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={userDiscount ? userDiscount.gross_amount : 0}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, userDiscount ? userDiscount.gross_amount : 0)}
                      </Typography.Text>
                    }
                    onSubmit={updateUserDiscount}
                    orderId={orderSale!.id}
                    vatValue={userDiscount ? userDiscount.vat_value : orderSale?.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, userDiscount ? userDiscount.gross_amount : 0)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {moduleType === 'order-sale' && isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.VoucherLevel')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={voucherLevel ? voucherLevel.gross_amount : 0}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, voucherLevel ? voucherLevel.gross_amount : 0)}
                      </Typography.Text>
                    }
                    onSubmit={updateVoucherLevelDiscount}
                    orderId={orderSale!.id}
                    vatValue={voucherLevel ? voucherLevel.vat_value : orderSale?.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, voucherLevel ? voucherLevel.gross_amount : 0)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {promotionalCoupon && moduleType === 'order-sale' && !isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.PromotionalCoupon')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={promotionalCoupon.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, promotionalCoupon.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updatePromotionalCouponDiscount}
                    orderId={orderSale!.id}
                    vatValue={promotionalCoupon.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, promotionalCoupon.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {CrediteNoteShippingCost && moduleType === 'credit' && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Edit.ShippingCost')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNoteShippingCost.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, CrediteNoteShippingCost.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesShippingCost}
                    orderId={orderSale!.id}
                    vatValue={CrediteNoteShippingCost.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, CrediteNoteShippingCost.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {moduleType === 'credit' && isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.VoucherLevel')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNoteVoucherDiscount ? CrediteNoteVoucherDiscount.gross_amount : 0}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(
                          orderOverview.iso3,
                          CrediteNoteVoucherDiscount ? CrediteNoteVoucherDiscount.gross_amount : 0,
                        )}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesVoucherLevel}
                    orderId={orderSale!.id}
                    vatValue={
                      CrediteNoteVoucherDiscount ? CrediteNoteVoucherDiscount.vat_value : orderSale?.vat_value
                    }
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(
                      orderOverview.iso3,
                      CrediteNoteVoucherDiscount ? CrediteNoteVoucherDiscount.gross_amount : 0,
                    )}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {moduleType === 'credit' && isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.CareerStepDiscount')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNoteCareerStepDiscount ? CrediteNoteCareerStepDiscount.gross_amount : 0}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(
                          orderOverview.iso3,
                          CrediteNoteCareerStepDiscount ? CrediteNoteCareerStepDiscount.gross_amount : 0,
                        )}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesCareerSteps}
                    orderId={orderSale!.id}
                    vatValue={
                      CrediteNoteCareerStepDiscount
                        ? CrediteNoteCareerStepDiscount.vat_value
                        : orderSale?.vat_value
                    }
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(
                      orderOverview.iso3,
                      CrediteNoteCareerStepDiscount ? CrediteNoteCareerStepDiscount.gross_amount : 0,
                    )}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {CrediteNoteCouponItemDiscount && moduleType === 'credit' && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.CouponItem')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNoteCouponItemDiscount.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, CrediteNoteCouponItemDiscount.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesCouponItem}
                    orderId={orderSale!.id}
                    vatValue={CrediteNoteCouponItemDiscount.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, CrediteNoteCouponItemDiscount.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {CrediteNotePromotionalCouponDiscount && moduleType === 'credit' && !isOrderUserRolePartner && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.PromotionalCoupon')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNotePromotionalCouponDiscount.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, CrediteNotePromotionalCouponDiscount.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesPromotionalCoupon}
                    orderId={orderSale!.id}
                    vatValue={CrediteNotePromotionalCouponDiscount.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, CrediteNotePromotionalCouponDiscount.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {CrediteNotePromotionalArticleDiscount && moduleType === 'credit' && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.PromotionalArticle')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNotePromotionalArticleDiscount.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, CrediteNotePromotionalArticleDiscount.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesPromotionalArticle}
                    orderId={orderSale!.id}
                    vatValue={CrediteNotePromotionalArticleDiscount.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, CrediteNotePromotionalArticleDiscount.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          {CrediteNoteWalletPointDiscount && moduleType === 'credit' && (
            <Col flex={1}>
              <OverviewBox title={t('Order.Position.WalletPoint')}>
                {loggedInUserRole !== 'partner' ? (
                  <EditableTextOrderPositions
                    value={CrediteNoteWalletPointDiscount.gross_amount}
                    child={
                      <Typography.Text strong>
                        {intlCurrency(orderOverview.iso3, CrediteNoteWalletPointDiscount.gross_amount)}
                      </Typography.Text>
                    }
                    onSubmit={updateOrderCreditNotesWalletPoint}
                    orderId={orderSale!.id}
                    vatValue={CrediteNoteWalletPointDiscount.vat_value}
                    updateTab={updateTab}
                  />
                ) : (
                  <span className="red-label">
                    {intlCurrency(orderOverview.iso3, CrediteNoteWalletPointDiscount.gross_amount)}
                  </span>
                )}
              </OverviewBox>
            </Col>
          )}

          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.TotalQv')}>
              <span className="black-label">{orderOverview['totalQv'].toFixed(2)} UP</span>
            </OverviewBox>
          </Col>

          {
            <Col flex={1}>
              <OverviewBox title={t('Order.Edit.TotalPP')}>
                <span className="black-label">
                  {intlCurrency(orderOverview.iso3, orderOverview['totalProvisionPrice'])}
                </span>
              </OverviewBox>
            </Col>
          }
        </Row>
      )}

      <Row gutter={4} style={{ marginTop: '16px' }}>
        {shippingCost && moduleType === 'order-sale' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.ShippingCost')}>
              {loggedInUserRole !== 'partner' ? (
                <EditableTextOrderPositions
                  value={shippingCost.gross_amount}
                  child={
                    <Typography.Text strong>
                      {intlCurrency(orderOverview.iso3, shippingCost.gross_amount)}
                    </Typography.Text>
                  }
                  onSubmit={updateShippingCostDiscount}
                  orderId={orderSale!.id}
                  vatValue={shippingCost.vat_value}
                  updateTab={updateTab}
                />
              ) : (
                <span className="black-label">
                  {intlCurrency(orderOverview.iso3, shippingCost.gross_amount)}
                </span>
              )}
            </OverviewBox>
          </Col>
        )}
        <Col flex={1}>
          <OverviewBox title={t('Order.Edit.VatPortion')}>
            <span className="black-label">{intlCurrency(orderOverview.iso3, orderOverview.wholeVat)}</span>
          </OverviewBox>
        </Col>

        <Col flex={1}>
          <OverviewBox title={t('Order.Position.UserDiscount')}>
            <span className="black-label">{intlCurrency(orderOverview.iso3, orderOverview.wholeVat)}</span>
          </OverviewBox>
        </Col>

        {moduleType === 'credit' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.Weight')}>
              <span className="black-label">{weightFormatter(orderOverview.weight)}</span>
            </OverviewBox>
          </Col>
        )}

        {moduleType !== 'credit' && moduleType !== 'purchase' && moduleType !== 'partner' && (
          <Col flex={1}>
            <OverviewBox title={t('Order.Edit.ReturnOnSale')}>
              <span className="black-label">
                {typeof orderOverview?.returnOnSale === 'number'
                  ? intlCurrency(orderOverview.iso3, orderOverview.returnOnSale)
                  : orderOverview?.returnOnSale}
              </span>
            </OverviewBox>
          </Col>
        )}

        <Col flex={4}>
          <OverviewBox title={t('Order.Edit.OrderStatus')}>
            {moduleType === 'partner' ? (
              <Select
                className="action-select"
                value={orderPartnerSale?.status}
                disabled={orderPartnerSale?.status === 'Cancel'}
                placeholder={t('Global.Action') + '...'}
                onChange={(value) => handleOrderPartnerStatusChange(value as unknown as number)}
              >
                <Option value="Draft">Draft</Option>
                <Option value="Print">Print</Option>
                <Option value="Cancel">Cancel</Option>
              </Select>
            ) : (
              <SuperSelect
                isClearable={false}
                className="status-select"
                hasNew={false}
                maxItemsToShow={7}
                module={new OrderStatusChildModule()}
                onChange={(status) => changeStatus(orderSale?.id ?? -1, (status as OrderStatus).id)}
                optionSelector={{ label: 'name', value: 'id' }}
                pending={pending}
                disabled={pending || isOrderReadOnly}
                value={orderSale?.['orderStatus']}
              />
            )}
          </OverviewBox>
        </Col>
      </Row>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  & .green-label {
    color: #30e030;
  }

  & .red-label {
    color: #ed2259;
  }

  & .black-label {
    color: #161415;
  }

  & .status-select,
  & .action-select {
    width: 100%;
  }
`;

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { CheckOutlined, CloseOutlined, CopyOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Country, CountrySelect } from '@src/modules/Country';
import { CurrencySelect } from '@src/modules/Currency';
import { LanguageSelect } from '@src/modules/Language';
import { PaymentMethod, PaymentMethodSelect } from '@src/modules/PaymentMethod';
import AutoLoader from '@src/modules/PickerDashboard/components/AutoLoader';
import { AutoState } from '@src/modules/PickerDashboard/pages/PickerDashboard';
import ReferrerSelect from '@src/modules/Referrer/containers/ReferrerSelect';
import { ShippingProfile, ShippingProfileSelect } from '@src/modules/ShippingProfile';
import AsyncSubdomainSelect from '@src/modules/Subdomain/containers/AsyncSubdomainSelect';
import { Loader, SuperSelect } from '@src/shared/components';
import { intlCurrency, intlDate } from '@src/shared/utils/engine.service';
import { Button, Col, Input, Row, Space, Tooltip, Typography, message } from 'antd';
import moment from 'moment';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EditableText, { EditButtonContainer } from '../../components/EditableText';
import OrderSettingPackingOptions from '../../components/OrderSettings/OrderSettingPackingOptions';
import { editAnyColumn } from '../../controllers/order.controller';
import { OrderStatusChildModule } from '../../Order.module';
// import { getAllPackings, incomeShippedItems, updateANYColumn } from '../../services/order.service';
import { getAllPackings, updateANYColumn } from '../../services/order.service';
import { updateSubscriptionSubDays } from '../../services/subscription.service';
import {
  CreditSalePure,
  OrderDetailTabs,
  OrderModuleType,
  OrderPacking,
  OrderSalePure,
  OrderSaleType,
  OrderStatus,
  OrderTermOfPayment,
} from '../..';
import OrderDeliveryModal from '../OrderDelivery/OrderDeliveryAddModal';
import OrderTermOfPaymentSelect from '../Selects/TermOfPaymentSelect';
import OrderSettingsStyles from './OrderSettings.style';
import useSettingCallback from './useSettingCallbacks';

type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};

type Pending =
  | 'Order Status'
  | 'Country'
  | 'Currency'
  | 'Referrer'
  | 'Subdomain'
  | 'Language'
  | 'Shipping Profile'
  | 'Shipping Cost'
  | 'Shipped On'
  | 'Subscribe Period'
  | 'Packing Modal'
  | 'Payment Method'
  | 'Submit Incomes'
  | 'Terms Of Payment'
  | 'Generate Payment Link'
  | 'None';

const OrderSettings = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const [packages, setPackages] = useState<AutoState<OrderPacking[]>>(null);
  const [pending, setPending] = useState<Pending>('None');
  const [orderTermOfPayment, setOrderTermOfPayment] = useState<OrderTermOfPayment>();
  const [editTermOfPayment, setEditTermOfPayment] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string>('');
  const controller = useSettingCallback({
    orderSale,
    moduleType,
    states: {
      setPaymentLink,
      setModalVisibility,
      updateTab,
      setPending: (key) => setPending(key as Pending),
    },
    packages,
  });

  if (!controller.orderSettings || !orderSale) return <Loader title={t('Order.Settings.Loader')} />;

  const {
    country,
    shippedOn,
    currency,
    shippingCostValue,
    termOfPayment: { paymentDue, valueDate, earlyPaymentDiscount, earlyPaymentDiscountPercent },
    selects: { orderStatus, language, paymentMethod, shippingProfile },
  } = controller.orderSettings;

  return (
    <OrderSettingsStyles.MainContainer>
      <Row gutter={24}>
        <Col span={12} className="first-col">
          <Row className="row" align="middle">
            <Col span={8} className="title">
              <strong>{t('Order.Titles.Status')}</strong>
            </Col>
            <Col span={16}>
              <SuperSelect
                isClearable={false}
                className="status-select"
                hasNew={false}
                module={new OrderStatusChildModule()}
                onChange={(status) => controller.changeStatus((status as OrderStatus).id)}
                optionSelector={{ label: 'name', value: 'id' }}
                pending={pending === 'Order Status'}
                disabled={pending === 'Order Status' || isOrderReadOnly}
                value={orderStatus}
              />
            </Col>
          </Row>

          {moduleType === 'order-sale' ? (
            <Row className="row" align="middle">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.Location')}</strong>
              </Col>

              <Col span={16}>
                <CountrySelect
                  loading={pending === 'Country'}
                  value={country as Country}
                  disabled
                  onChange={controller.changeCountry}
                />
              </Col>
            </Row>
          ) : (
            <Row className="row" align="middle">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.Location')}</strong>
              </Col>

              <Col span={16}>
                <Typography.Text strong>{country?.name ? country.name : '-'}</Typography.Text>
              </Col>
            </Row>
          )}

          <Row className="row" align="middle">
            <Col span={8} className="title">
              <strong>{t('Order.Titles.Language')}</strong>
            </Col>
            <Col span={16}>
              <LanguageSelect
                disabled={pending === 'Language' || isOrderReadOnly || !!shippedOn}
                loading={pending === 'Language'}
                value={language ?? undefined}
                onChange={controller.changeLanguage}
                isClearable={false}
              />
            </Col>
          </Row>

          {moduleType === 'credit' && (
            <Row className="row" align="middle">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.ShippedOn')}</strong>
              </Col>

              <Col span={16}>
                <Typography.Text strong>{shippedOn ? intlDate(shippedOn) : '-'}</Typography.Text>
              </Col>
            </Row>
          )}

          {moduleType === 'order-sale' && (
            <EditableText
              disabled={isOrderReadOnly}
              isPending={pending === 'Shipped On'}
              title={<strong>{t('Order.Titles.ShippedOn')}</strong>}
              child={<Typography.Text strong>{shippedOn ? intlDate(shippedOn) : '-'}</Typography.Text>}
              isDate
              defaultEditValue={shippedOn ? moment(shippedOn) : undefined}
              onSubmit={(value) => controller.setShippedOn(value)}
              shippedOn={shippedOn}
              onCancelShippedOn={(value) => controller.setShippedOn(value)}
              // secondButton={
              //   <>
              //     {(orderSale as OrderSalePure).orderSalePositions.filter(
              //       (pos) =>
              //         pos.productVariation &&
              //         pos.storage_variation_id !== null &&
              //         pos.storage_variation_id !== undefined,
              //     ).length === 0 && (
              //       <EditButtonContainer>
              //         <Tooltip title={t('Order.Titles.SubmitOutcomes')}>
              //           <Button
              //             loading={pending === 'Submit Incomes'}
              //             icon={<CheckOutlined />}
              //             size="small"
              //             type="ghost"
              //             onClick={() => {
              //               setPending('Submit Incomes');
              //               incomeShippedItems(orderSale.id)
              //                 .then(() => {
              //                   setPending('None');
              //                   updateTab(OrderDetailTabs.Settings);
              //                 })
              //                 .catch(() => setPending('None'));
              //             }}
              //           />
              //         </Tooltip>
              //       </EditButtonContainer>
              //     )}
              //   </>
              // }
            />
          )}

          {moduleType === 'purchase' && (
            <EditableText
              disabled={true}
              isPending={pending === 'Shipped On'}
              title={<strong>{t('Order.Titles.DeliveredOn')}</strong>}
              child={<Typography.Text strong>{shippedOn ? intlDate(shippedOn) : '-'}</Typography.Text>}
              isDate
              onSubmit={(value) => controller.setShippedOn(value)}
            />
          )}

          <Row className="row" align="middle">
            <Col span={8} className="title">
              <strong>{t('Order.Titles.Currency')}</strong>
            </Col>
            <Col span={16}>
              <CurrencySelect
                menuPlacement="top"
                loading={pending === 'Currency'}
                disabled={
                  moduleType === 'purchase' ||
                  moduleType === 'credit' ||
                  isOrderReadOnly ||
                  pending === 'Currency' ||
                  !!shippedOn
                }
                value={currency ?? undefined}
                onChange={controller.changeCurrency}
                isClearable={false}
              />
            </Col>
          </Row>

          {moduleType !== 'purchase' && (
            <Row className="row" align="middle">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.Referrer')}</strong>
              </Col>
              <Col span={16}>
                <ReferrerSelect
                  menuPlacement="top"
                  loading={pending === 'Referrer'}
                  disabled={moduleType === 'credit' || isOrderReadOnly || !!shippedOn}
                  value={
                    moduleType === 'credit'
                      ? (orderSale as CreditSalePure).order?.referrer ?? undefined
                      : orderSale['referrer'] ?? undefined
                  }
                  onChange={controller.changeReferrer}
                />
              </Col>
            </Row>
          )}

          {moduleType !== 'purchase' && (
            <Row className="row" align="middle">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.Subdomain')}</strong>
              </Col>
              <Col span={16}>
                <AsyncSubdomainSelect
                  menuPlacement="top"
                  loading={pending === 'Subdomain'}
                  disabled={moduleType === 'credit' || isOrderReadOnly || !!shippedOn}
                  value={
                    moduleType === 'credit'
                      ? (orderSale as CreditSalePure).order?.subdomain ?? undefined
                      : orderSale['subdomain'] ?? undefined
                  }
                  onChange={controller.changeSubdomain}
                />
              </Col>
            </Row>
          )}

          {moduleType === 'order-sale' && paymentMethod?.is_link_generatable && (
            <>
              <Row className="row" align="middle">
                <Col span={8} className="title">
                  <strong>{t('Order.Payment.GeneratePaymentLink')}</strong>
                </Col>
                <Col span={16}>
                  <Tooltip className="action-btn" title={t('Order.Payment.GeneratePaymentLink')}>
                    <Button
                      loading={pending === 'Generate Payment Link'}
                      onClick={() => controller.generatePaymentLink(orderSale.id)}
                      type="primary"
                    >
                      {t('Order.Payment.Generate')}
                    </Button>
                  </Tooltip>
                </Col>
              </Row>

              {paymentLink && paymentMethod?.is_link_generatable && (
                <Row className="row" align="middle">
                  <Col span={5} className="title">
                    <strong>{t('Order.Payment.PaymentLink')}</strong>
                  </Col>
                  <Col span={16}>
                    <Input value={paymentLink} placeholder={t('Order.Payment.PaymentLink')} />
                  </Col>
                  <Col span={3}>
                    <Tooltip className="action-btn" title={t('Order.Payment.CopyPaymentLink')}>
                      <Button
                        onClick={() => controller.copyPaymentLinkToClipboard(paymentLink)}
                        shape="default"
                        icon={<CopyOutlined />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Col>

        <Col span={12} className="second-col">
          <Row className="row" align="middle">
            <Col span={8} className="title">
              <strong>{t('Order.Titles.PaymentMethod')}</strong>
            </Col>

            <Col span={16}>
              <PaymentMethodSelect
                isClearable={false}
                loading={pending === 'Payment Method'}
                disabled={moduleType === 'credit' || isOrderReadOnly}
                value={paymentMethod ?? undefined}
                companyId={orderSale?.company_id}
                onChange={(payment: PaymentMethod) => {
                  setPending('Payment Method');
                  editAnyColumn(
                    orderSale.id,
                    moduleType === 'credit'
                      ? (orderSale as CreditSalePure).isEditable
                      : orderSale['is_editable'],
                    { payment_method_id: (payment as PaymentMethod).id },
                    moduleType,
                  )
                    .then(() => {
                      setPending('None');
                      updateTab(OrderDetailTabs.Settings);
                    })
                    .catch(() => setPending('None'));
                }}
              />
            </Col>
          </Row>

          <Row className="row" align="top">
            <Col span={8} className="title">
              <strong>{t('Order.Titles.TermsOfPayment')}</strong>
            </Col>
            {editTermOfPayment ? (
              <Col span={14}>
                <Row>
                  <Col span={16}>
                    <OrderTermOfPaymentSelect
                      disabled={pending === 'Terms Of Payment' || isOrderReadOnly}
                      loading={pending === 'Terms Of Payment'}
                      onChange={(value) => setOrderTermOfPayment(value)}
                      value={orderTermOfPayment}
                    />
                  </Col>

                  <Col span={4}>
                    <EditButtonContainer>
                      <Button
                        icon={<CheckOutlined />}
                        size="small"
                        type="ghost"
                        loading={pending === 'Terms Of Payment'}
                        onClick={() => {
                          setPending('Terms Of Payment');
                          updateANYColumn(orderSale?.id, moduleType, {
                            payment_term_id: orderTermOfPayment?.id,
                          })
                            .then(() => {
                              setPending('None');
                              updateTab(OrderDetailTabs.Settings);
                            })
                            .finally(() => setPending('None'));
                        }}
                      />
                    </EditButtonContainer>
                  </Col>

                  <Col span={4}>
                    <EditButtonContainer>
                      <Button
                        icon={<CloseOutlined />}
                        size="small"
                        type="ghost"
                        onClick={() => setEditTermOfPayment(false)}
                      />
                    </EditButtonContainer>
                  </Col>
                </Row>
              </Col>
            ) : (
              <Col span={14}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Row align="top">
                    <Col span={10}>
                      <Typography.Text>{t('Order.Titles.PaymentDue')}</Typography.Text>
                    </Col>
                    <Col span={8}>
                      <strong>{paymentDue}</strong>
                    </Col>
                  </Row>
                  <Row align="top">
                    <Col span={10}>
                      <Typography.Text>{t('Order.Titles.ValueDate')}</Typography.Text>
                    </Col>
                    <Col span={8}>
                      <strong>{valueDate ? intlDate(valueDate) : '-'}</strong>
                    </Col>
                  </Row>
                  <Row align="top">
                    <Col span={10}>
                      <Typography.Text>{t('Order.Titles.EarlyPaymentDiscount')} </Typography.Text>
                    </Col>
                    <Col span={8}>
                      <strong>{earlyPaymentDiscount}</strong>
                    </Col>
                  </Row>
                  <Row align="top">
                    <Col span={10}>
                      <Typography.Text>{t('Order.Titles.EarlyPaymentDiscountPercent')}</Typography.Text>
                    </Col>
                    <Col span={8}>
                      <strong>{earlyPaymentDiscountPercent + '%'}</strong>
                    </Col>
                  </Row>
                </Space>
              </Col>
            )}

            {!editTermOfPayment && (
              <Col span={2} style={{ display: isOrderReadOnly ? 'none' : undefined }}>
                <EditButtonContainer>
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    type="ghost"
                    onClick={() => setEditTermOfPayment(true)}
                    disabled={moduleType === 'credit'}
                  />
                </EditButtonContainer>
              </Col>
            )}
          </Row>

          {moduleType === 'subscription' && (
            <EditableText
              disabled={isOrderReadOnly}
              isPending={pending === 'Subscribe Period'}
              title={<strong>{t('Order.Titles.SubPeriod')}</strong>}
              child={<Typography.Text strong>{controller.orderSettings['timePeriod'] ?? 0}</Typography.Text>}
              isNumber
              min={0}
              defaultEditValue={controller.orderSettings['timePeriod'] ?? 0}
              onSubmit={(value) => {
                setPending('Subscribe Period');
                updateSubscriptionSubDays(orderSale.id, value as number)
                  .then(() => {
                    updateTab(OrderDetailTabs.Settings);
                    setPending('None');
                  })
                  .catch(() => setPending('None'));
              }}
            />
          )}

          {moduleType === 'purchase' && (
            <>
              <EditableText
                disabled={isOrderReadOnly}
                isPending={pending === 'Shipping Cost'}
                title={<strong>{t('Order.Titles.ShippingCost')}</strong>}
                child={
                  <Typography.Text strong>
                    {intlCurrency(currency?.iso3 ?? 'EUR', shippingCostValue)}
                  </Typography.Text>
                }
                isNumber
                hasSecond
                secondTitle="Vat Amount (0% - 100%)"
                min={0}
                defaultEditValue={shippingCostValue}
                onSubmit={(value, secValue) =>
                  controller.changeShippingCost(value as number, (secValue ?? 0) as number)
                }
              />

              <EditableText
                disabled={isOrderReadOnly}
                title={<strong>{t('Order.Titles.ShippingProfile')}</strong>}
                child={
                  <ShippingProfileSelect
                    hasNew={false}
                    pending={pending === 'Shipping Profile'}
                    disabled={pending === 'Shipping Profile'}
                    menuPlacement="top"
                    value={shippingProfile ?? undefined}
                    onChange={(shipping) =>
                      controller.changeShippingProfile((shipping as ShippingProfile)?.id)
                    }
                  />
                }
                isConstant
              />
            </>
          )}

          {moduleType !== 'purchase' && (
            <>
              <EditableText
                disabled={isOrderReadOnly || !!shippedOn}
                isPending={pending === 'Shipping Cost'}
                title={<strong>{t('Order.Titles.ShippingCost')}</strong>}
                child={
                  <Typography.Text strong>
                    {intlCurrency(currency?.iso3 ?? 'EUR', shippingCostValue)}
                  </Typography.Text>
                }
                isNumber
                min={0}
                defaultEditValue={shippingCostValue}
                onSubmit={(value) => controller.changeShippingCost(value as number)}
              />

              <EditableText
                disabled={isOrderReadOnly}
                title={<strong>{t('Order.Titles.ShippingProfile')}</strong>}
                child={
                  <ShippingProfileSelect
                    pending={pending === 'Shipping Profile'}
                    disabled={pending === 'Shipping Profile' || isOrderReadOnly || !!shippedOn}
                    menuPlacement="top"
                    value={shippingProfile ?? undefined}
                    onChange={(shipping) =>
                      controller.changeShippingProfile((shipping as ShippingProfile)?.id)
                    }
                    hasNew={!(moduleType === 'subscription')}
                  />
                }
                isConstant
              />
            </>
          )}

          {moduleType === 'order-sale' && (
            <Row className="row" align="top">
              <Col span={8} className="title">
                <strong>{t('Order.Titles.Packing')}</strong>
              </Col>
              <Col span={16}>
                {orderSale && controller.orderSettings && (
                  <AutoLoader data={[packages, setPackages]} service={() => getAllPackings(orderSale?.id)}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <EditButtonContainer alignEnd>
                        <Tooltip title={t('Order.Settings.AddPacking')}>
                          <Button
                            disabled={isOrderReadOnly || !!shippedOn}
                            icon={<PlusOutlined />}
                            size="small"
                            type="ghost"
                            onClick={() => {
                              if ((orderSale as OrderSalePure).shippingProfile) setModalVisibility(true);
                              else message.error(t('Order.Settings.PackingError'));
                            }}
                          />
                        </Tooltip>
                      </EditButtonContainer>
                      <hr />
                      {packages?.map((pack) => (
                        <OrderSettingPackingOptions orderPacking={pack} updateTab={updateTab} />
                      ))}
                    </Space>
                  </AutoLoader>
                )}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      {moduleType === 'order-sale' && !isOrderReadOnly && (
        <OrderDeliveryModal
          orderSalePositions={(orderSale as OrderSalePure).orderSalePositions}
          //   .filter(
          //   (pos) => pos.productVariation && pos.order_position_type_id !== 3,
          // )}
          packages = {packages}
          onSubmit={controller.onSubmit}
          pending={pending === 'Packing Modal'}
          visible={isModalVisible}
          setVisible={setModalVisibility}
        />
      )}
    </OrderSettingsStyles.MainContainer>
  );
};

export default OrderSettings;

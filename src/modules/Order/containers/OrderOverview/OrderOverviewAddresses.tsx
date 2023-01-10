import { EditOutlined } from '@ant-design/icons';
import { PurchaseSalePure, SubscriptionSalePure } from '@modules/Order';
import { Accordion } from '@shared/components';
import { AuthContext } from '@src/core';
import { Address } from '@src/modules/User/model/address';
import NotificationCircle from '@src/shared/components/NotificationCircle/NotificationCircle';
import { Button, Space, message } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  CreditOrderSalePure,
  CreditSalePure,
  OrderDetailTabs,
  OrderModuleType,
  OrderSalePure,
  OrderSaleType,
  PartnerSalePure,
} from '../..';
import OrderEditAddressModal from './modals/OrderEditAddressModal';

type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
const OrderOverviewAddresses = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles, id },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  // TODO: Make Real Tabs
  const [activeTab, setActiveTab] = useState(+isOrderReadOnly);
  const [isModalVisible, setModalVisible] = useState<'invoice' | 'delivery' | 'none'>('none');

  const order = {
    credit: (orderSale as CreditSalePure).order,
    'order-sale': orderSale as OrderSalePure,
    subscription: orderSale as SubscriptionSalePure,
    purchase: orderSale as PurchaseSalePure,
    partner: orderSale as PartnerSalePure,
  }[moduleType];

  return (
    <MainContainer>
      <div className="tabs">
        <Space>
          {(!isOrderReadOnly || order?.user_id === id || moduleType === 'partner') && (
            <Button
              size="large"
              onClick={() => setActiveTab(0)}
              type={activeTab === 0 ? 'primary' : 'default'}
            >
              {t('Order.Tab.CustomerData')}
            </Button>
          )}

          {moduleType !== 'purchase' && (
            <Button
              size="large"
              type={activeTab === 1 ? 'primary' : 'default'}
              onClick={() => setActiveTab(1)}
            >
              <span style={{ height: '100%' }}>{t('Order.Tab.CustomerNotes')}</span>
              {orderSale?.description && <NotificationCircle />}
            </Button>
          )}
        </Space>
      </div>
      {activeTab === 0 ? (
        <Space direction="vertical" className="contents">
          <Accordion
            size="small"
            title={t('Order.Titles.InvoiceAddress')}
            otherIcons={() =>
              moduleType !== 'credit' && moduleType !== 'purchase' && moduleType !== 'partner' ? (
                <AccordionEditIcon>
                  <Button
                    disabled={isOrderReadOnly}
                    icon={<EditOutlined color="#326D94" />}
                    size="small"
                    type="ghost"
                    onClick={(event) => {
                      event.stopPropagation();

                      if (!(order as OrderSalePure).invoice_id && !(order as CreditOrderSalePure)?.invoice_id)
                        setModalVisible('invoice');
                      else message.error(t('Order.EditError'));
                    }}
                  />
                </AccordionEditIcon>
              ) : null
            }
          >
            <div className="accordion-details">
              <p>
                ID : <Link to={`/admin/users/manage/user/${order.user_id}`}>{order.user_id}</Link>
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: order['invoiceContactGroup']?.address?.address_complete ?? ' - ',
                }}
              />
            </div>
          </Accordion>

          {/*<Accordion*/}
          {/*  size="small"*/}
          {/*  title={t('Order.Titles.DeliveryAddress')}*/}
          {/*  otherIcons={() =>*/}
          {/*    moduleType !== 'credit' && moduleType !== 'purchase' && moduleType !== 'partner' ? (*/}
          {/*      <AccordionEditIcon>*/}
          {/*        <Button*/}
          {/*          disabled={isOrderReadOnly}*/}
          {/*          icon={<EditOutlined color="#326D94" />}*/}
          {/*          size="small"*/}
          {/*          type="ghost"*/}
          {/*          onClick={(event) => {*/}
          {/*            event.stopPropagation();*/}

          {/*            if (!(order as OrderSalePure).invoice_id && !(order as CreditOrderSalePure)?.invoice_id)*/}
          {/*              setModalVisible('delivery');*/}
          {/*            else message.error(t('Order.EditError'));*/}
          {/*          }}*/}
          {/*        />*/}
          {/*      </AccordionEditIcon>*/}
          {/*    ) : null*/}
          {/*  }*/}
          {/*>*/}
          {/*  <div className="accordion-details">*/}
          {/*    <div*/}
          {/*      dangerouslySetInnerHTML={{*/}
          {/*        __html: order['deliveryContactGroup']?.address?.address_complete ?? ' - ',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</Accordion>*/}
        </Space>
      ) : (
        <Space direction="vertical" className="contents">
          <Accordion size="small" title={t('Order.Titles.Description')}>
            <div className="accordion-details">{orderSale?.description ?? ' - '}</div>
          </Accordion>
        </Space>
      )}

      {moduleType !== 'credit' && isModalVisible !== 'none' && (
        <OrderEditAddressModal
          moduleType={moduleType}
          userId={orderSale?.user?.id}
          initialValue={
            isModalVisible === 'invoice'
              ? (order['invoiceContactGroup'] as unknown as Address)
              : (order['deliveryContactGroup'] as unknown as Address)
          }
          onDone={() => updateTab(OrderDetailTabs.Overview)}
          orderSaleId={orderSale?.id ?? -1}
          setVisible={setModalVisible}
          visible={isModalVisible}
        />
      )}
    </MainContainer>
  );
};

export default OrderOverviewAddresses;

const MainContainer = styled.div`
  & .tabs {
    padding-bottom: 16px;

    & .ant-btn-primary {
      background: #009ddc;
      border: 1px solid #009ddc;
    }
  }

  & .contents {
    width: 100%;

    & .accordion-details {
      padding: 16px;
      min-height: 150px;
      background: #fbfbfb;
    }
  }
`;

const AccordionEditIcon = styled.div`
  margin-right: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    border: 1px solid #326d94;
  }
`;

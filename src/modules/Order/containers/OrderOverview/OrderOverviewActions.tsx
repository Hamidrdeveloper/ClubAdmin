import { ApiOutlined, CloseCircleOutlined, CopyOutlined, SplitCellsOutlined } from '@ant-design/icons';
import { CreditSalePure } from '@modules/Order';
import { AuthContext } from '@src/core';
import { Button, Col, Row, Select, Space, Tag, Tooltip, message } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { generateCreditNoteForOrder, splitOrderSaleWithSelection } from '../../controllers/order.controller';
import { copyOrderSale } from '../../services/order.service';
import { purchaseCheckoutDate } from '../../services/purchase.service';
import { generateOrderSaleFromOrderSub, unsubscribeOrderSale } from '../../services/subscription.service';
import {
  OrderCreditGenerateModalFields,
  OrderDetailTabs,
  OrderModuleType,
  OrderSalePure,
  OrderSaleType,
  OrderSplitModalFields,
  PurchaseSalePure,
} from '../..';
import OrderGenerateCreditModal from './modals/OrderGenerateCreditModal';
import OrderSplitModal from './modals/OrderSplitModal';

const { Option } = Select;
type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
export const OrderOverviewActions = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const [pending, setPending] = useState(false);
  const [unsubPending, setUnsubPending] = useState(false);
  const [isCreditModalVisible, setCreditModalVisible] = useState(false);
  const [isSplitModalVisible, setSplitModalVisible] = useState(false);

  const copy = (orderSaleId: number): void => {
    if (confirm(t('Order.Overview.CopyQuestion'))) {
      setPending(true);
      copyOrderSale(orderSaleId)
        .then((copiedOrderSaleId) => {
          setPending(false);
          navigate('/admin/orders/order-sale/' + copiedOrderSaleId);
        })
        .catch(() => setPending(false));
    }
  };

  const onSplitClick = (): void => {
    if ((moduleType === 'credit' && (orderSale as CreditSalePure).isEditable) || orderSale?.['is_editable'])
      setSplitModalVisible(true);
    else message.error(t('Order.Overview.EditError'));
  };

  const onUnSubClick = (): void => {
    if ((moduleType === 'credit' && (orderSale as CreditSalePure).isEditable) || orderSale?.['is_editable']) {
      setUnsubPending(true);
      unsubscribeOrderSale(orderSale?.id ?? -1).then(() => {
        setUnsubPending(false);
        updateTab(OrderDetailTabs.Overview);
      });
    } else message.error(t('Order.Overview.EditError'));
  };

  const onSplitSubmit = (formFields: OrderSplitModalFields): void => {
    setPending(true);
    splitOrderSaleWithSelection(orderSale?.id ?? -1, formFields)
      .then((newOrderId) => {
        setPending(false);
        navigate('/admin/orders/order-sale/' + newOrderId);
      })
      .catch(() => setPending(false));
  };

  const onActionSelectChange = (value: string): void => {
    if (moduleType === 'order-sale' && value === '2') setCreditModalVisible(true);
    else if (moduleType === 'purchase' && value === '2') {
      setPending(true);
      purchaseCheckoutDate(orderSale?.id ?? -1)
        .then(() => {
          setPending(false);
        })
        .catch(() => setPending(false));
    } else if (moduleType === 'subscription' && value === '2') {
      setPending(true);
      generateOrderSaleFromOrderSub(orderSale?.id ?? -1)
        .then(() => {
          setPending(false);
        })
        .catch(() => setPending(false));
    }
  };

  const onCreditNoteGenerateSubmit = (formFields: OrderCreditGenerateModalFields): void => {
    setPending(true);
    generateCreditNoteForOrder(orderSale?.id ?? -1, formFields)
      .then((creditId) => {
        setPending(false);
        navigate('/admin/orders/credit/' + creditId);
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer>
      <Row className="actions" gutter={[16, 16]}>
        <Col>
          <Space>
            {
              _Buttons({
                orderSale,
                pending,
                onUnSubClick,
                unsubPending,
                copy,
                onSplitClick,
                t,
                isOrderReadOnly,
              })[moduleType]
            }
          </Space>
        </Col>

        {moduleType !== 'credit' && (
          <Col>
            <Space>
              <Select
                disabled={isOrderReadOnly}
                onChange={onActionSelectChange}
                placeholder={t('Order.Credit.Title_other')}
                defaultValue="1"
                value="1"
              >
                <Option value="1" disabled>
                  {t('Global.SelectPlaceholder', { title: t('Global.Action') })}
                </Option>
                <Option
                  value="2"
                  disabled={moduleType === 'purchase' && !(orderSale as PurchaseSalePure).is_editable}
                >
                  {moduleType === 'order-sale'
                    ? t('Order.Credit.Generate')
                    : moduleType === 'purchase'
                    ? t('Order.Submit')
                    : t('Order.Generate')}
                </Option>
              </Select>
              {(orderSale as OrderSalePure).has_order_credit_note && (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  {t('Global.Available')}
                </Tag>
              )}
            </Space>
          </Col>
        )}
      </Row>
      {moduleType === 'order-sale' && (
        <OrderGenerateCreditModal
          onSubmit={onCreditNoteGenerateSubmit}
          orderId={orderSale?.id ?? -1}
          orderSalePositions={(orderSale as OrderSalePure).orderSalePositions.filter(
            (pos) => pos.orderPositionType?.id !== 3,
          )}
          pending={pending}
          visible={isCreditModalVisible}
          setVisible={setCreditModalVisible}
        />
      )}

      {moduleType === 'order-sale' && !isOrderReadOnly && (
        <OrderSplitModal
          onSubmit={onSplitSubmit}
          orderId={orderSale?.id ?? -1}
          orderSalePositions={(orderSale as OrderSalePure).orderSalePositions.filter(
            (pos) => pos.orderPositionType?.id !== 3,
          )}
          pending={pending}
          visible={isSplitModalVisible}
          setVisible={setSplitModalVisible}
        />
      )}
    </MainContainer>
  );
};

const _Buttons = ({
  onSplitClick,
  onUnSubClick,
  unsubPending,
  orderSale,
  pending,
  copy,
  t,
  isOrderReadOnly,
}) => ({
  'order-sale': (
    <>
      <Tooltip className="action-btn" title={t('Order.Overview.Split')}>
        <Button
          shape="default"
          icon={<SplitCellsOutlined />}
          onClick={onSplitClick}
          disabled={isOrderReadOnly}
        />
      </Tooltip>
      <Tooltip className="action-btn" title={t('Order.Overview.Copy')}>
        <Button
          disabled={isOrderReadOnly}
          shape="default"
          icon={<CopyOutlined />}
          onClick={() => copy(orderSale?.id ?? -1)}
          loading={pending}
        />
      </Tooltip>
    </>
  ),
  subscription: (
    <>
      <Tooltip className="action-btn" title={t('Order.Overview.Unsubscribe')}>
        <Button
          shape="default"
          icon={<ApiOutlined />}
          onClick={onUnSubClick}
          disabled={isOrderReadOnly}
          loading={unsubPending}
        />
      </Tooltip>
    </>
  ),
});

const MainContainer = styled.div`
  & .actions {
    border-radius: 4px;
    padding: 16px;
    width: 100%;
    background: #c9e9ff;
    margin: 16px;

    & .ant-select {
      min-width: 180px;
      & .ant-select-selector {
        position: relative;
        border: none;
        font-size: small;
        font-weight: 300;
        outline: none;
        background-color: #fff;
        border-radius: 8px;
      }
    }

    & .action-btn {
      color: #026cf0;
    }
  }
`;

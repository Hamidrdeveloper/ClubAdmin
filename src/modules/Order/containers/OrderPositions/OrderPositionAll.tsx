import { CreditSalePositionModel } from '@modules/Order';
import { AuthContext } from '@src/core';
import { Col, Row, Space } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OrderSinglePosition from '../../components/OrderPositions/OrderSinglePosition';
//import PurchaseModule from '../../Purchase.module';
//import { purchaseDeliveryQuantity } from '../../services/purchase.service';
import { OrderDetailTabs, OrderModuleType, OrderPositionsModelType, OrderSalePositionModel } from '../..';
//import DeliveredQuantityUpsert from './DeliveredQuantityCreate';
import OrderIncomingItemsCreate from './IncomingItemsCreate';

type Props = {
  positions: OrderPositionsModelType;
  orderId: number;
  isFromOutside?: boolean;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
export const OrderSalePositionAll = ({
  positions: _positions,
  orderId,
  isFromOutside = false,
  moduleType,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const {
    profile: { roles },
  } = useContext(AuthContext);
  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  // It's any because we have problem on merging types!
  const [positions, setPositions] = useState<any[]>(_positions);
  const [shownParentId, setShownParentId] = useState(-1);
  //const [pending, setPending] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<number | { varId: number }>(-1);
  const isNotCredit = moduleType !== 'credit';

  useEffect(() => {
    setPositions(_positions);
  }, [_positions]);

  const onShowMoreClicked = (id: number, index: number) => {
    if (id === shownParentId) {
      setPositions(_positions);
      setShownParentId(-1);
    } else {
      const compos = _positions.filter((pos) => (pos as OrderSalePositionModel)?.parentId === id);

      setPositions((pos) => {
        pos = pos.filter((p) => p.orderPositionType?.id !== 3);
        return [...pos.slice(0, index + 1), ...compos, ...pos.slice(index + 1)];
      });
      setShownParentId(id);
    }
  };

  const positionItems = () => {
    let count = 0;
    return (
      moduleType === 'credit' || moduleType === 'purchase' || moduleType === 'partner'
        ? positions
        : shownParentId === -1
        ? (positions as OrderSalePositionModel[]).filter((pos) => pos.orderPositionType?.id !== 3)
        : (positions as OrderSalePositionModel[]).filter(
            (pos) => pos.orderPositionType?.id !== 3 || pos.parentId === shownParentId,
          )
    )?.map((position) => (
      <OrderSinglePosition
        isFromOutside={isFromOutside}
        isComponent={
          moduleType !== 'purchase' &&
          isNotCredit &&
          (position as OrderSalePositionModel).orderPositionType?.id === 3
        }
        shownParentId={shownParentId}
        index={
          isNotCredit && (position as OrderSalePositionModel).orderPositionType?.id === 3 ? count : count++
        }
        key={position.orderId}
        order={
          moduleType === 'credit'
            ? (position as CreditSalePositionModel)
            : (position as OrderSalePositionModel)
        }
        moduleType={moduleType}
        isBundle={
          moduleType === 'credit' ? false : (position as OrderSalePositionModel).orderPositionType?.id === 2
        }
        isShown={
          moduleType === 'purchase' ||
          (isNotCredit &&
            (((position as OrderSalePositionModel).orderPositionType?.id === 3 &&
              (position as OrderSalePositionModel).parentId === shownParentId) ||
              (position as OrderSalePositionModel).orderPositionType?.id === 1 ||
              (position as OrderSalePositionModel).orderPositionType?.id === 16 ||
              (position as OrderSalePositionModel).orderPositionType?.id === 18))
        }
        editDeliveredQuantity={(id) => {
          setModalVisible(id);
        }}
        bookmarkItem={(varId) => {
          setModalVisible({ varId });
        }}
        showComponents={onShowMoreClicked}
      />
    ));
  };

  return (
    <>
      {isFromOutside ? (
        <Row className="header">
          <Col span={3} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Item')}</span>
            </Row>
          </Col>

          <Col span={6} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Quantity')}</span>
            </Row>
          </Col>

          <Col span={9} className="title">
            <Row align="middle">
              <span>{t('Order.Position.ItemText')} </span>
            </Row>
          </Col>

          <Col span={6} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Weight')} </span>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="header">
          <Col span={2} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Item')}</span>
            </Row>
          </Col>

          <Col span={2} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Quantity')}</span>
            </Row>
          </Col>

          {/* {moduleType === 'purchase' && (
            <Col span={4} className="title">
              <Row align="middle">
                <span>{t('Order.Position.DeliveredQuantity')}</span>
              </Row>
            </Col>
          )} */}

          <Col span={moduleType === 'purchase' ? 8 : 6} className="title">
            <Row align="middle">
              <span>{t('Order.Position.ItemText')} </span>
            </Row>
          </Col>

          <Col span={isNotCredit ? 2 : 3} className="title">
            <Row align="middle">
              <span>{t('Order.Position.PriceBracketGross')}</span>
            </Row>
          </Col>

          {/* {isNotCredit && moduleType !== 'purchase' && (
            <Col span={2} className="title">
              <Row align="middle">
                <span>{t('Order.Position.ReturnOnSale')}</span>
              </Row>
            </Col>
          )} */}

          {/* {moduleType !== 'purchase' && (
            <Col span={2} className="title">
              <Row align="middle">
                <span>{t('Order.Position.Discount')}</span>
              </Row>
            </Col>
          )} */}

          <Col span={2} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Weight')} </span>
            </Row>
          </Col>

          <Col span={1} className="title">
            <Row align="middle">
              <span>{t('Order.Position.Vat')} </span>
            </Row>
          </Col>

          {moduleType !== 'purchase' && (
            <>
              {/* <Col span={3} className="title">
                <Row align="middle">
                  <span>{t('Order.Position.CareerStepDiscount')}</span>
                </Row>
              </Col> */}

              <Col span={2} className="title">
                <Row align="middle">
                  <span>{t('Order.Position.POP')}</span>
                </Row>
              </Col>

              <Col span={3} className="title">
                <Row align="middle">
                  <span>{t('Order.Position.ProvisionPrice')}</span>
                </Row>
              </Col>
            </>
          )}

          {moduleType === 'purchase' && (
            <Col span={3} className="title">
              <Row align="middle">
                <span>{t('Global.Action')}</span>
              </Row>
            </Col>
          )}
        </Row>
      )}

      {/* TODO: Add Pagination for Positions */}
      <Space direction="vertical" className="positions" style={{ paddingBlock: '0', gap: '0' }}>
        {positionItems()}
      </Space>

      {/* {moduleType === 'purchase' && false && (
        <DeliveredQuantityUpsert
          module={new PurchaseModule()}
          onSubmit={({ quantity }) => {
            setPending(true);
            purchaseDeliveryQuantity(isModalVisible as number, quantity ?? 1)
              .then(() => {
                setPending(false);
                setModalVisible(-1);
                updateTab(OrderDetailTabs.Overview);
              })
              .catch(() => setPending(false));
          }}
          pending={pending}
          visible={typeof isModalVisible === 'number' && isModalVisible !== -1}
          setVisible={(visibility) => setModalVisible(visibility ? isModalVisible : -1)}
        />
      )} */}

      {moduleType === 'purchase' && !isOrderReadOnly && (
        <OrderIncomingItemsCreate
          orderId={orderId}
          variationId={(isModalVisible as { varId: number }).varId}
          visible={typeof isModalVisible !== 'number'}
          setVisible={(visibility) => setModalVisible(visibility ? isModalVisible : -1)}
        />
      )}
    </>
  );
};

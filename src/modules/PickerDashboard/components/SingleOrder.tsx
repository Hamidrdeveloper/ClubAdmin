import { CheckCircleOutlined, OrderedListOutlined, WifiOutlined } from '@ant-design/icons';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { OrderSalePositionPure, OrderSalePure } from '@src/modules/Order';
import { getOrderSalePositionsFromOrderPositions } from '@src/modules/Order/controllers/order.controller';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { weightFormatter } from '@src/shared/utils/engine.service';
import { Button, Col, Collapse, List, Row, Table } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AutoState } from '../pages/PickerDashboard';
import {
  changeOrderStatusBySlug,
  getOrderPositionsByOrderId,
  pickListInvoiceOrder,
} from '../service/order.service';
import AutoLoader from './AutoLoader';

function SingleOrder({
  orderSale,
  pickItem,
  onDoneComplete,
  onOnlineTabletClick,
}: {
  orderSale: OrderSalePure;
  onDoneComplete: () => void;
  pickItem: { positionId: number; picked: number }[] | undefined;
  onOnlineTabletClick: (orderId: number) => void;
}): ReactElement {
  const [positions, setPositions] = useState<AutoState<OrderSalePositionPure[]>>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setPending] = useState(false);
  const [donePending, setDonePending] = useState(false);
  const { t } = useTranslation();
  //
  const { ...item } = orderSale;

  const onDoneClick = () => {
    setDonePending(true);
    changeOrderStatusBySlug({ slug: 'packing', orderId: orderSale.id }).finally(() => {
      setDonePending(false);
      onDoneComplete();
    });
  };

  const pickItemCount = (position_id: number) =>
    pickItem?.find((item) => item.positionId === position_id)?.picked;
  //
  return (
    <List.Item key={item.id}>
      <Row>
        <Col span={24} style={{ marginBottom: '16px', overflow: 'auto' }}>
          <Row>
            <Col xs={24} md={14}>
              {' '}
              <div
                style={{ fontSize: '1.5vmax' }}
                dangerouslySetInnerHTML={{
                  __html: item.deliveryContactGroup?.address?.address_complete ?? ' - ',
                }}
              />
            </Col>

            <Col xs={24} md={10}>
              <Row style={{ height: '100%' }} justify="end">
                <Col span={24}>
                  <Button
                    size={'large'}
                    type={'primary'}
                    loading={donePending}
                    onClick={onDoneClick}
                    icon={<CheckCircleOutlined />}
                    style={{ width: '24vh', height: '6vh' }}
                  >
                    {t('PickerDashboard.Done')}
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    size={'large'}
                    type={'primary'}
                    icon={<WifiOutlined />}
                    style={{ width: '24vh', height: '6vh', marginBlock: 16 }}
                    onClick={() => onOnlineTabletClick(orderSale.id)}
                  >
                    {t('PickerDashboard.OnlineTablet')}
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    type={'primary'}
                    size={'large'}
                    icon={<OrderedListOutlined />}
                    style={{ width: '24vh', height: '6vh' }}
                    loading={isPending}
                    onClick={() => {
                      setPending(true);
                      pickListInvoiceOrder(orderSale?.id)
                        .then((link) => {
                          window.open(Env.PURE_URL + link);
                          setPending(false);
                        })
                        .catch(() => setPending(false));
                    }}
                  >
                    {t('PickerDashboard.PickList')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <br />

        <Col span={24}>
          <Collapse onChange={(key) => setIsOpen(key[0] === '1')}>
            <Collapse.Panel
              header={<span>{t('PickerDashboard.Positions')}</span>}
              key="1"
              style={{ overflow: 'auto' }}
            >
              {isOpen && (
                <AutoLoader
                  data={[positions, setPositions]}
                  service={() => getOrderPositionsByOrderId({ orderId: item.id })}
                >
                  <MainContainer isMobileDevice={false}>
                    <ListContainer isHeader isMobileDevice={false}>
                      <Table
                        scroll={{ x: 'max-content' }}
                        pagination={false}
                        columns={
                          PositionColumns({
                            NameComponent: (productVariation) => {
                              return <span>{productVariation?.name ?? ' - '}</span>;
                            },
                            WeightComponent: (productVariation, position) => {
                              return (
                                <span>{productVariation ? weightFormatter(position['weight']) : null}</span>
                              );
                            },
                            ChoiceComponent: (id, position) => {
                              const pickItem = pickItemCount(id) ?? 0;
                              return (
                                <span>
                                  {pickItem > position.quantity
                                    ? t('PickerDashboard.OverPicked')
                                    : pickItem === position.quantity
                                    ? t('PickerDashboard.Picked')
                                    : pickItem > 0
                                    ? t('PickerDashboard.PickedPartially')
                                    : t('PickerDashboard.NotPicked')}
                                </span>
                              );
                            },
                          }) as any
                        }
                        dataSource={getOrderSalePositionsFromOrderPositions(
                          positions ?? [],
                          orderSale.currency?.iso3 ?? 'EUR',
                        ).filter((pos) => pos.orderPositionType?.id !== 2)}
                      />
                    </ListContainer>
                  </MainContainer>
                </AutoLoader>
              )}
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </List.Item>
  );
}
export default SingleOrder;

const MainContainer = styled.div<{ isMobileDevice: boolean }>`
  padding: ${(props) => (props.isMobileDevice ? '0' : '16px 0')};
  width: 100%;

  & .tabs {
    padding-bottom: 16px;

    & button {
      min-width: 200px;
    }
  }

  & .positions {
    width: 100%;
    padding-block: 8px;

    & .ant-space-item {
      &:nth-child(odd) {
        background: #fbfbfb;
      }

      &:nth-child(even) {
        background: #f2f2f2;
      }
    }
  }
`;

const ListContainer = styled.div<{ isHeader?: boolean; isMobileDevice: boolean }>`
  border-radius: 12px;
  background: #fff;
  width: 100%;

  & .header {
    border-radius: ${(props) => (props.isHeader ? '12px 12px 0 0' : '0')};
    background: #82b1ff;
    width: 100%;
    color: #fff;
    padding: ${(props) => (props.isMobileDevice ? '0px' : '16px')};
    height: 80px;
    font-size: 0.874rem;
    font-weight: 500;

    & .title {
      height: 100%;

      & .ant-row {
        height: 100%;
        padding-inline: 6px;
      }
    }
  }
`;

const PositionColumns = ({
  NameComponent,
  WeightComponent,
  ChoiceComponent,
}: {
  NameComponent: (productVariation: ProductVariation) => ReactElement;
  ChoiceComponent: (id: number, position: OrderSalePositionPure) => ReactElement;
  WeightComponent: (productVariation: ProductVariation, position: OrderSalePositionPure) => ReactElement;
}) => [
  {
    key: 'id',
    dataIndex: 'orderId',
    title: i18n.t('Global.ID'),
  },
  {
    key: 'quantity',
    dataIndex: 'quantity',
    title: i18n.t('Global.Quantity'),
  },
  {
    key: 'name',
    dataIndex: 'productVariation',
    title: i18n.t('Global.Name'),
    render: NameComponent,
  },
  {
    key: 'weight',
    dataIndex: 'productVariation',
    title: i18n.t('Global.Weight'),
    render: WeightComponent,
  },
  {
    key: 'choice',
    dataIndex: 'orderId',
    title: i18n.t('Order.Field.Choice'),
    render: ChoiceComponent,
  },
];

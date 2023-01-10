/* 
  Delete this line if the problem solved!
  Amir Hossein Vahedi: [Feb 2, 2021]:
    The backend api for tracking link is awful in structure, we call an api for nothing,
    for some link that they can send us in getAllPacking, but cause of backend process,
    but for backend process getting hard we should do this with wrong option!
*/

import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import { Button, Col, Row, Space, Table, Typography } from 'antd';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { addOrderDeliveryPacking } from '../../controllers/order.controller';
import {
  OrderDeliveryModalFields,
  OrderDetailTabs,
  OrderPacking,
  OrderSalePositionPure,
} from '../../model/order.entity';
import { getAllPackings, trackingLink } from '../../services/order.service';
import OrderDeliveryModal from './OrderDeliveryAddModal';

type Props = {
  orderSaleId: number | null;
  orderSalePositions: OrderSalePositionPure[];
  updateTab: (type: OrderDetailTabs) => void;
};

const OrderDelivery = ({ orderSaleId, orderSalePositions, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();

  const [isModalVisible, setModalVisibility] = useState(false);
  const [packages, setPackages] = useState<OrderPacking[]>([]);
  const [pending, setPending] = useState(false);
  const [modalPending, setModalPending] = useState(false);
  const [reviewPending, setReviewPending] = useState(-1);

  if (!orderSaleId) return <Loader title={t('Order.Delivery.Loader')} />;

  useEffect(() => {
    setPending(true);
    getAllPackings(orderSaleId ?? 0).then((result) => {
      setPackages(result);
      setPending(false);
    });
  }, []);

  const onSubmit = (formFields: OrderDeliveryModalFields) => {
    setModalPending(true);
    addOrderDeliveryPacking(orderSaleId, formFields)
      .then(() => {
        setModalPending(false);
        setModalVisibility(false);
        updateTab(OrderDetailTabs.Delivery);
      })
      .catch(() => {
        setModalPending(false);
        setModalVisibility(false);
      });
  };

  const onReviewClick = (id: number) => {
    setReviewPending(id);
    trackingLink(id)
      .then((link) => {
        setReviewPending(-1);
        window.open(link);
      })
      .catch(() => setReviewPending(-1));
  };

  return (
    <MainContainer>
      {pending ? (
        <Loader title={t('Order.Delivery.Loader')} />
      ) : (
        <div className="content">
          <Row className="select-container" align="middle" gutter={[16, 16]}>
            <Col span={24}>
              <Space>
                <Typography>{t('Order.Delivery.Create')}:</Typography>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setModalVisibility(true);
                  }}
                >
                  {t('Global.Add')}
                </Button>
              </Space>
            </Col>
            <Col span={24}>
              <Table
                dataSource={packages}
                columns={tableColumns(onReviewClick, reviewPending)}
                pagination={false}
              />
            </Col>
          </Row>
        </div>
      )}

      <OrderDeliveryModal
        orderSalePositions={orderSalePositions}
        onSubmit={onSubmit}
        pending={modalPending}
        visible={isModalVisible}
        setVisible={setModalVisibility}
      />
    </MainContainer>
  );
};

export default OrderDelivery;

const MainContainer = styled.div`
  & .content {
    border-radius: 4px;
    box-shadow: 0 0 10px #ebede7;
    padding: 12px;
    & .select-container {
      padding: 5px;
      & .ant-select {
        outline: none;
        margin-left: 3px;
      }
    }
    & .ant-table {
      & th.ant-table-cell {
        color: #fff;
        background: #4a5161;
      }

      & tr {
        &:nth-child(odd) {
          & td.ant-table-cell {
            background: #fbfbfb;
          }
        }

        &:nth-child(even) {
          & td.ant-table-cell {
            background: #f2f2f2;
          }
        }
      }
      & .action-btn {
        color: #4474e7;
      }
    }

    & .action-select {
      min-width: 12vw;
    }
  }
  .table-container {
    width: 100%;
  }
`;

const tableColumns = (onReviewClicked: (id: number) => void, isReviewPending: number) => [
  {
    key: 'ID',
    title: i18n.t('Global.ID'),
    dataIndex: ['id'],
    className: 'id number',
  },
  {
    key: 'PackingType',
    title: i18n.t('Order.Delivery.PackingType'),
    dataIndex: ['package', 'packingType', 'name'],
  },

  {
    dataIndex: ['id'],
    key: 'review',
    title: i18n.t('Global.Action'),
    render: (id: number): ReactNode => (
      <Button
        loading={isReviewPending === id}
        icon={<SyncOutlined />}
        onClick={() => {
          onReviewClicked(id);
        }}
      >
        {i18n.t('Global.Review')}
      </Button>
    ),
  },
];

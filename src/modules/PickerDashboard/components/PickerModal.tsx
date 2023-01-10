import i18n from '@src/core/i18n/config';
import { OrderSalePositionPure } from '@src/modules/Order';
import { Button, Col, Divider, Input, Modal, Row, Space, Table } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { changeOrderStatusBySlug } from '../service/order.service';
import PickerActionComponent from './PickerActionComponent';

type Props = {
  positions: OrderSalePositionPure[];
  isModalVisible: number;
  barcodeValue: string;
  pickedData: { positionId: number; picked: number }[] | undefined;
  onDoneComplete: () => void;
  setModalVisible: (mode: number) => void;
  setBarcodeValue: (barcode: string) => void;
  setPickedData: (picked: { positionId: number; picked: number }[] | undefined) => void;
};
function PickerModal({
  positions,
  isModalVisible,
  pickedData,
  barcodeValue,
  setModalVisible,
  setBarcodeValue,
  setPickedData,
  onDoneComplete,
}: Props): ReactElement {
  const [modalSubmitPending, setModalSubmitPending] = useState(false);
  const [completed, setComplete] = useState<number>(0);

  const { t } = useTranslation();
  //
  const otherPositionItems = () =>
    positions?.filter(
      (order) => order.parent_id === null && order.productVariation && order.order_position_type_id !== 2,
    );

  const onDoneClick = () => {
    setModalSubmitPending(true);
    changeOrderStatusBySlug({ slug: 'packing', orderId: isModalVisible }).finally(() => {
      setModalSubmitPending(false);
      setModalVisible(-1);
      setComplete(0);
      onDoneComplete();
    });
  };

  return (
    <Modal
      visible={isModalVisible !== -1}
      width={1300}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={() => {
        setModalVisible(-1);
        setComplete(0);
      }}
    >
      <Row>
        <Col span={24}>
          <Input
            autoFocus
            value={barcodeValue}
            placeholder={t('PickerDashboard.Barcode')}
            onChange={(e) => setBarcodeValue(e.target.value)}
          />
          <Divider />
        </Col>

        <Col span={24}>
          {positions
            ?.filter((order) => order.order_position_type_id === 2)
            .map((bundle, index) => (
              <React.Fragment key={`bundle-${index}`}>
                <h3>{bundle.productVariation?.name}</h3>
                <Table
                  scroll={{ x: 'max-content' }}
                  columns={OnlineListColumns({
                    actionComponent: (action: number, quantity: number, orderId: number) => (
                      <PickerActionComponent
                        action={action}
                        quantity={quantity}
                        orderId={orderId}
                        pickedData={pickedData}
                        setComplete={setComplete}
                        setPickedData={setPickedData}
                      />
                    ),
                  })}
                  dataSource={positions
                    .filter((order) => order.parent_id === bundle.id)
                    ?.map((order) => ({
                      id: order.id,
                      quantity: order.quantity ?? 0,
                      name: order.productVariation?.name ?? ' - ',
                      storageVariation: order.storage_variation_id ?? '-',
                      action: pickedData?.find((pick) => pick.positionId === order.id)?.picked ?? 0,
                    }))}
                />
                <Divider />
              </React.Fragment>
            ))}
        </Col>

        {otherPositionItems().length > 0 && (
          <Col span={24}>
            <h3>Others</h3>
            <Table
              scroll={{ x: 'max-content' }}
              columns={OnlineListColumns({
                actionComponent: (action: number, quantity: number, orderId: number) => {
                  const [value, setValue] = useState<number>(action);
                  //
                  useEffect(() => {
                    if (value >= quantity) {
                      setComplete((prev) => prev + 1);
                    } else if (value === -1) {
                      setComplete((prev) => prev - 1);
                      setValue(0);
                    }
                    //
                    const cPickedData = pickedData ?? [];
                    if (!cPickedData.find((pick) => pick.positionId === orderId))
                      cPickedData.push({ positionId: orderId, picked: value });
                    else
                      cPickedData[cPickedData.findIndex((pick) => pick.positionId === orderId)].picked =
                        value;
                    localStorage.setItem('PickerDashboard', JSON.stringify(cPickedData));
                    setPickedData(cPickedData);
                  }, [value]);
                  //
                  return value >= quantity ? (
                    <span>
                      {t('PickerDashboard.Picked')}{' '}
                      <Button size="large" onClick={() => setValue(-1)}>
                        {t('PickerDashboard.Cancel')}
                      </Button>
                    </span>
                  ) : (
                    <Space direction="horizontal">
                      <Button
                        size="large"
                        onClick={() => {
                          setValue((v) => (v - 1 >= 0 ? v - 1 : v));
                        }}
                      >
                        -
                      </Button>
                      <h3>{value}</h3>
                      <Button
                        size="large"
                        onClick={() => {
                          setValue((v) => (v + 1 <= quantity ? v + 1 : v));
                        }}
                      >
                        +
                      </Button>
                    </Space>
                  );
                },
              })}
              dataSource={otherPositionItems()?.map((order) => ({
                id: order.id,
                quantity: order.quantity ?? 0,
                name: order.productVariation?.name ?? ' - ',
                storageVariation: order.storage_variation_id ?? '-',
                action: pickedData?.find((pick) => pick.positionId === order.id)?.picked ?? 0,
              }))}
            />
            <Divider />
          </Col>
        )}

        {completed !== 0 &&
          completed ===
            positions?.filter((order) => order.productVariation && order.order_position_type_id !== 2)
              .length && (
            <Col span={24}>
              <Divider />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  marginTop: '24px',
                }}
              >
                <Button onClick={onDoneClick} loading={modalSubmitPending}>
                  {t('PickerDashboard.Done')}
                </Button>
              </div>
            </Col>
          )}
      </Row>
    </Modal>
  );
}

export default PickerModal;

const OnlineListColumns = ({ actionComponent }) => [
  {
    title: i18n.t('Global.Name'),
    dataIndex: 'name',
    width: 160,
    key: 'name',
  },
  {
    title: i18n.t('Order.Titles.StorageVariation'),
    dataIndex: 'storageVariation',
    width: 240,
    key: 'storage',
  },
  {
    title: i18n.t('Order.Field.Quantity'),
    dataIndex: 'quantity',
    width: 80,
    key: 'quantity',
  },
  {
    title: i18n.t('Global.Action'),
    dataIndex: 'action',
    width: 80,
    key: 'action',
    render: (action: number, allData) =>
      actionComponent(action, allData.quantity ?? 0, allData.id ?? -1, allData),
  },
];

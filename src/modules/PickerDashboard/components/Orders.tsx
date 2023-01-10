import { OrderSalePositionPure, OrderSalePure } from '@src/modules/Order';
import { Loader } from '@src/shared/components';
import { ResponseContext } from '@src/shared/models';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

import OrderListCard from '../container/OrderListCard';
import { AutoState } from '../pages/PickerDashboard';
import { getOrderPositionsByOrderId } from '../service/order.service';
import AutoLoader from './AutoLoader';
import PickerModal from './PickerModal';

type PositionsWithBarcode = OrderSalePositionPure & { barcodes: { value: string }[] };

function Orders({
  isLoading,
  data,
  selected,
  setPagination,
  onDoneComplete,
  onSelectClick: setSelected,
}: {
  isLoading: boolean;
  selected: number[];
  data: ResponseContext<OrderSalePure[]> | undefined;
  onDoneComplete: () => void;
  onSelectClick: (selected: number[] | ((prev: number[]) => number[])) => void;
  setPagination: ({ page, per_page }: { page: number; per_page: number }) => void;
}): JSX.Element {
  const [isModalVisible, setModalVisible] = useState<number>(-1);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [positions, setPositions] = useState<AutoState<PositionsWithBarcode[]>>(null);
  const [pickedData, setPickedData] = useState<{ positionId: number; picked: number }[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!positions && !barcodeValue) return;

    const id = positions?.find((order) =>
      order.productVariation?.barcodes.some((barcode) => barcode.value === barcodeValue),
    )?.id;

    // if barcode is invalid.
    if (!id) {
      // if barcode input has value show error message
      message.config({ maxCount: 1 });
      if (barcodeValue !== '') message.error('Entered barcode is invalid');

      return;
    }

    // I don't want the modal to hide when we enter the first valid barcode, instead we can add as many as barcodes as we like.
    // setModalVisible(-1);
    const cPickedData = pickedData ?? [];
    if (!cPickedData.find((pick) => pick.positionId === id)) {
      cPickedData.push({ positionId: id, picked: 1 });
    } else {
      cPickedData[cPickedData.findIndex((pick) => pick.positionId === id)].picked += 1;
    }
    localStorage.setItem('PickerDashboard', JSON.stringify(cPickedData));
    setPickedData(cPickedData);
    setBarcodeValue('');
  }, [barcodeValue, positions]);

  useEffect(() => {
    const data = localStorage.getItem('PickerDashboard');

    if (data) setPickedData(JSON.parse(data) ?? []);
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      setPositions(null);
    }
  }, [isModalVisible]);

  if (isLoading) return <Loader />;

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page, pageSize) => {
            setPagination({ page, per_page: pageSize });
          },
          pageSize: data?.meta.per_page ?? 10,
          total: data?.meta.total ?? 10,
          current: data?.meta.current_page ?? 1,
        }}
        dataSource={data?.data ?? []}
        renderItem={(orderSale) => (
          <OrderListCard
            orderSale={orderSale}
            pickItem={pickedData}
            onDoneComplete={onDoneComplete}
            onSelectClick={(checked, id) => {
              if (!checked) setSelected((prev) => prev.filter((i) => i !== id));
              else setSelected((prev) => [...prev, id]);
            }}
            onOnlineTabletClick={setModalVisible}
            isChecked={!!selected.find((sel) => sel === orderSale.id)}
          />
        )}
      />

      {isModalVisible !== -1 && (
        <AutoLoader
          data={[positions, setPositions]}
          service={() => getOrderPositionsByOrderId({ orderId: isModalVisible })}
        >
          <PickerModal
            pickedData={pickedData}
            barcodeValue={barcodeValue}
            isModalVisible={isModalVisible}
            positions={positions ?? []}
            onDoneComplete={onDoneComplete}
            setBarcodeValue={setBarcodeValue}
            setPickedData={setPickedData}
            setModalVisible={(mode) => {
              if (mode === -1) {
                setModalVisible(mode);
                setPositions(null);
              }
            }}
          />
        </AutoLoader>
      )}
    </>
  );
}

export default Orders;

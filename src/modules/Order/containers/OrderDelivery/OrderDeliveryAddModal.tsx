import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import OrderDeliveryForm from '../../components/OrderDelivery/forms/OrderDeliveryForm';
import { OrderDeliveryModalFields, OrderPacking, OrderSalePositionPure } from '../../model/order.entity';

interface Props<T> {
  orderSalePositions: OrderSalePositionPure[];
  packages?: OrderPacking[] | null;
  visible: boolean;
  pending: boolean;
  onSubmit: (data: T) => void;
  setVisible: (value: boolean) => void;
}

const OrderDeliveryModal = ({
  orderSalePositions,
  packages,
  visible,
  pending,
  onSubmit,
  setVisible,
}: Props<OrderDeliveryModalFields>): ReactElement => {
  const { t } = useTranslation();
  const title = t('Order.Delivery.Title');

  const closeHandler = () => {
    setVisible(false);
  };

  const handleFormSubmit = (formValues: OrderDeliveryModalFields) => {
    formValues.items = formValues.items.filter((p) => p.quantity > 0);
    const values: OrderDeliveryModalFields = {
      ...formValues,
    };

    onSubmit(values);
  };

  const sortOrderPosition = () => {
    const list: OrderSalePositionPure[] = [];
    orderSalePositions
      .filter((p) => p.parent_id === null && p.order_position_type_id !== 2)
      .map((p) => list.push(p));
    const parentPositions = orderSalePositions.filter((p) => p.order_position_type_id === 2);
    parentPositions.forEach((p) => {
      list.push(p);
      orderSalePositions.filter((m) => m.parent_id === p.id).map((p) => list.push(p));
    });
    return list;
  };

  const calcMaxQuantity = (positionId) => {
    const positionQuantity = orderSalePositions.find((p) => p.id === positionId)?.quantity ?? 0
    const packedQuantity =
      packages
        ?.flatMap((p) => p.packingJournalItems)
        .filter((pkg) => pkg.order_position_id === positionId)
        .reduce((pre, next) => pre + next.quantity, 0) ?? 0;
    return positionQuantity - packedQuantity;
  };

  return (
    <Modal
      visible={visible}
      width={960}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={closeHandler}
      title={
        <ModalHeader
          onClose={closeHandler}
          items={[{ path: '', breadcrumbName: t('Global.CreateTitle', { title }) }]}
        />
      }
    >
      <OrderDeliveryForm
        onSubmit={handleFormSubmit}
        isPending={pending}
        initialValues={{
          description: '',
          package: null,
          number: undefined,
          items: sortOrderPosition()
            .filter((pos) => pos.productVariation)
            .map((pos) => ({
              product_variation_id: pos.productVariation?.id,
              name: pos.productVariation?.name,
              quantity: pos.order_position_type_id !== 2 ? calcMaxQuantity(pos.id) : 0,
              isActive: true,
              order_position_id: pos.id,
              order_position_type_id: pos.order_position_type_id,
              parent_id: pos.parent_id,
            })),
        }}
      />
    </Modal>
  );
};

export default OrderDeliveryModal;

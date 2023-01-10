import OrderSplitForm from '@src/modules/Order/components/OrderOverview/forms/OrderSplitForm';
import { OrderSplitModule } from '@src/modules/Order/Order.module';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderSalePositionPure, OrderSplitModalFields } from '../../..';

interface Props<T> {
  orderId: number;
  orderSalePositions: OrderSalePositionPure[];
  visible: boolean;
  pending: boolean;
  onSubmit: (data: T) => void;
  setVisible: (value: boolean) => void;
}

const OrderSplitModal = ({
  orderId,
  orderSalePositions,
  visible,
  pending,
  onSubmit,
  setVisible,
}: Props<OrderSplitModalFields>): ReactElement => {
  const { t } = useTranslation();
  const module = new OrderSplitModule(orderId);
  const title = module.title[0];

  const closeHandler = () => {
    setVisible(false);
  };

  const handleFormSubmit = (formValues: OrderSplitModalFields) => {
    const values: OrderSplitModalFields = {
      ...formValues,
    };

    onSubmit(values);
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
          items={[
            ...(module.breadcrumbItems || []),
            { path: '', breadcrumbName: t('Global.CreateTitle', { title }) },
          ]}
        />
      }
    >
      <OrderSplitForm
        onSubmit={handleFormSubmit}
        isPending={pending}
        initialValues={{
          positions: orderSalePositions
            .filter((pos) => pos.productVariation)
            .map((pos) => ({
              orderName: pos.productVariation.name,
              quantity: pos.quantity,
              orderPositionId: pos.id,
              isActive: true,
            })),
        }}
      />
    </Modal>
  );
};

export default OrderSplitModal;

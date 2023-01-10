import OrderCreditGenerateForm from '@src/modules/Order/components/OrderOverview/forms/OrderCreditGenerateForm';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderCreditGenerateModule } from '../../../Order.module';
import { OrderCreditGenerateModalFields, OrderSalePositionPure } from '../../..';

interface Props<T> {
  orderId: number;
  orderSalePositions: OrderSalePositionPure[];
  visible: boolean;
  pending: boolean;
  onSubmit: (data: T) => void;
  setVisible: (value: boolean) => void;
}

const OrderGenerateCreditModal = ({
  orderId,
  orderSalePositions,
  visible,
  pending,
  onSubmit,
  setVisible,
}: Props<OrderCreditGenerateModalFields>): ReactElement => {
  const { t } = useTranslation();
  const module = new OrderCreditGenerateModule(orderId);
  const title = module.title[0];

  const closeHandler = () => {
    setVisible(false);
  };

  const handleFormSubmit = (formValues: OrderCreditGenerateModalFields) => {
    const values: OrderCreditGenerateModalFields = {
      ...formValues,
    };

    onSubmit(values);
  };

  return (
    <Modal
      visible={visible}
      width={1300}
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
      <OrderCreditGenerateForm
        onSubmit={handleFormSubmit}
        isPending={pending}
        initialValues={{
          positions: orderSalePositions
            .filter((pos) => pos.productVariation && pos.orderPositionType.id !== 16)
            .map((pos) => ({
              orderName: pos.productVariation.name,
              createdAt: pos.created_at ? new Date(pos.created_at) : null,
              vat: pos.vat,
              quantity: pos.quantity,
              priceValue: Number(pos.price_value.toFixed(2)),
              orderPositionId: pos.id,
              isActive: true,
            })),
        }}
      />
    </Modal>
  );
};

export default OrderGenerateCreditModal;

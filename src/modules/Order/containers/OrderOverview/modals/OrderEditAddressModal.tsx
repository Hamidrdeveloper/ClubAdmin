import { OrderModuleType } from '@src/modules/Order';
import AddressUpsert from '@src/modules/User/containers/AddressUpsert';
import { Address } from '@src/modules/User/model/address';
import { ApiBuilder } from '@src/shared/utils';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';

type Props = {
  visible: 'invoice' | 'delivery' | 'none';
  orderSaleId: number;
  initialValue?: Address;
  userId: number | undefined;
  moduleType: OrderModuleType;
  onDone: () => void;
  setVisible: (isVisible: 'invoice' | 'delivery' | 'none') => void;
};

const OrderEditAddressModal = ({
  visible,
  initialValue,
  orderSaleId,
  moduleType,
  onDone,
  userId,
  setVisible,
}: Props): ReactElement => {
  const closeHandler = () => {
    setVisible('none');
  };

  return (
    <Modal
      visible={visible !== 'none'}
      width={1300}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={closeHandler}
    >
      <AddressUpsert
        singleData={initialValue}
        api={(values) =>
          new ApiBuilder<Address>('')
            .request({
              url: url[visible][moduleType](orderSaleId),
              method: 'PUT',
              body: { ...values, user_id: userId },
            })
            .then(() => {
              setVisible('none');
              onDone();
            })
        }
      />
    </Modal>
  );
};

const url = {
  invoice: {
    'order-sale': (id: number) => `order-sales/${id}/invoice-contact-group`,
    subscription: (id: number) => `order-subscriptions/${id}/invoice-contact-group`,
    purchase: (id: number) => `order/purchases/${id}/invoice-contact-group`,
    partner: (id: number) => `order-partner/${id}/invoice-contact-group`,
  },
  delivery: {
    'order-sale': (id: number) => `order-sales/${id}/delivery-contact-group`,
    subscription: (id: number) => `order-subscriptions/${id}/delivery-contact-group`,
    purchase: (id: number) => `order/purchases/${id}/delivery-contact-group`,
    partner: (id: number) => `order-partner/${id}/delivery-contact-group`,
  },
};

export default OrderEditAddressModal;

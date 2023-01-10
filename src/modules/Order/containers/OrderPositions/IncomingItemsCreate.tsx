import OrderIncomingItemsForm from '@modules/Order/components/OrderPositions/OrderIncomingItemsForm';
import { IncomingItems, IncomingItemsFormCtx, ItemsFormCtx } from '@src/modules/Stock/model/incomingItems';
import { bookIncomingItems } from '@src/modules/Stock/services/incomingItems';
import { ModalHeader } from '@src/shared/components';
import { FormInstance, Modal } from 'antd';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

type Props = {
  variationId: number;
  orderId: number;
  visible: boolean;
  setVisible: (value: boolean) => void;
};
const OrderIncomingItemsCreate = ({ variationId, orderId, visible, setVisible }: Props): ReactElement => {
  const { t } = useTranslation();

  const { mutate: book, isLoading: bookPending } = useMutation(bookIncomingItems);

  const handleFormSubmit = ({ data: formValues, form }: { data: IncomingItems; form: FormInstance }) => {
    const { items, delivery_date, ...restValues } = formValues;

    const normalizedDeliveryDate = delivery_date ? moment(delivery_date).format('YYYY-MM-DD') : '';
    const { currency, supplier, product_variation, expire_date, ...restItems } = items[0];

    const normalizedExpiredDate = expire_date ? moment(expire_date).format('YYYY-MM-DD') : '';
    const itemsFormCtx: [Partial<ItemsFormCtx>] = [
      {
        currency_id: currency?.id,
        supplier_id: supplier?.id,
        product_variation_id: variationId ?? product_variation?.id,
        expire_date: normalizedExpiredDate,
        ...restItems,
      },
    ];

    const values: Partial<IncomingItemsFormCtx> = {
      items: itemsFormCtx,
      ...restValues,
      order_id: orderId,
      order_type: 'OrderPurchase',
      delivery_date: normalizedDeliveryDate,
    };

    book(values, {
      onSuccess: () => {
        form.resetFields();
        closeHandler();
      },
    });
  };

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      onCancel={closeHandler}
      title={
        <ModalHeader
          onClose={closeHandler}
          items={[{ path: '', breadcrumbName: t('Global.CreateTitle', { title: 'Incoming Items' }) }]}
        />
      }
    >
      <OrderIncomingItemsForm
        isPending={bookPending}
        onSubmit={handleFormSubmit}
        hasVariation={!!variationId}
      />
    </Modal>
  );
};

export default OrderIncomingItemsCreate;

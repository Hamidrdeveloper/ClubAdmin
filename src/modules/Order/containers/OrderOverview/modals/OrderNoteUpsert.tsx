import i18n from '@src/core/i18n/config';
import { OrderModuleType } from '@src/modules/Order';
import { FormSubmit } from '@src/shared/components';
import { ApiBuilder } from '@src/shared/utils';
import { Col, Form, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement, useEffect, useState } from 'react';

type Props = {
  orderSaleId: number;
  isVisible: boolean;
  initialValue?: string;
  moduleType: OrderModuleType;
  onDone: () => void;
  setVisible: (isVisible: boolean) => void;
};

const OrderNoteUpsert = ({
  isVisible,
  initialValue,
  orderSaleId,
  moduleType,
  onDone,
  setVisible,
}: Props): ReactElement => {
  const [isPending, setPending] = useState(false);
  const [form] = Form.useForm();

  const closeHandler = () => {
    setPending(false);
    setVisible(false);
    onDone();
  };

  useEffect(() => {
    if (initialValue) form.setFieldsValue({ description: initialValue });
  }, [initialValue]);

  return (
    <Modal
      visible={isVisible}
      width={1300}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={closeHandler}
    >
      <Form
        form={form}
        onFinish={({ description }) => {
          setPending(true);
          callback[moduleType](orderSaleId, description, closeHandler);
        }}
        name="order-note-form"
      >
        <Row>
          <Col span={24}>
            <Form.Item name="description" label={i18n.t('Global.Description')}>
              <TextArea style={{ minHeight: '180px' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" className="btn-primary">
          <FormSubmit isPending={isPending} />
        </Row>
      </Form>
    </Modal>
  );
};

const callback = {
  'order-sale': (id: number, description: string, closeHandler) => {
    new ApiBuilder(`order-comments`, i18n.t('Order.Note'))
      .createOne({ order_id: id, order_type: 'OrderSale', description })
      .finally(() => closeHandler?.());
  },
  subscription: (id: number, description: string, closeHandler) => {
    new ApiBuilder(`order-comments`, i18n.t('Order.Note'))
      .createOne({ order_id: id, order_type: 'OrderSubscription', description })
      .finally(() => closeHandler?.());
  },
  purchase: (id: number, description: string, closeHandler) => {
    new ApiBuilder(`order-comments`, i18n.t('Order.Note'))
      .createOne({ order_id: id, order_type: 'OrderPurchase', description })
      .finally(() => closeHandler?.());
  },
  credit: (id: number, description: string, closeHandler) => {
    new ApiBuilder(`order-comments`, i18n.t('Order.Note'))
      .createOne({ order_id: id, order_type: 'CreditNote', description })
      .finally(() => closeHandler?.());
  },
};

export default OrderNoteUpsert;

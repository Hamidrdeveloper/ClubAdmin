import { FormSubmit } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { FactoryModule } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PurchaseSalePure } from '../../model/purchase.entity';

interface UpsertProps {
  module: FactoryModule<PurchaseSalePure>;
  visible: boolean;
  pending: boolean;
  onSubmit: (data: { quantity: number }) => void;
  setVisible: (value: boolean) => void;
}

const DeliveredQuantityUpsert = ({
  module,
  visible,
  pending,
  onSubmit,
  setVisible,
}: UpsertProps): ReactElement => {
  const { t } = useTranslation();
  const title = module.title[0];

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      width={760}
      footer={false}
      destroyOnClose
      closable={false}
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
      {/* TODO: Split Form */}
      <Form
        name="delivered-quantity-form"
        layout={'vertical'}
        onFinish={({ quantity }) => onSubmit({ quantity })}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="quantity"
              label={t('Order.DeliveredQuantity')}
              rules={[{ required: true }]}
              initialValue={1}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={pending} />
      </Form>
    </Modal>
  );
};

export default DeliveredQuantityUpsert;

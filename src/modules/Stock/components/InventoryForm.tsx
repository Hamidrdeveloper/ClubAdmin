import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { FormSubmit } from '@src/shared/components';
import { Col, Form, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import StorageVariationAsyncSelect from '../containers/StorageVariationAsyncSelect';
import { InventoryFormFields } from '../model/inventory';
import FormStyle from './styles/Form.style';

interface FormProps<T> {
  onSubmit: (data: T) => void;
}
const InventoryForm = ({ onSubmit }: FormProps<InventoryFormFields>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <FormStyle.Container
      form={form}
      layout="horizontal"
      colon={false}
      colspace={8}
      labelAlign="left"
      onFinish={onSubmit}
      name="stock-inventory-form"
      labelCol={{ xs: { span: 8 } }}
      wrapperCol={{ xs: { span: 16 } }}
    >
      <Row justify="space-between">
        <Col xs={24} lg={12} className="leftCol">
          <div className="box-container">
            <Form.Item label={t('Stock.Inventory.ProductVariation')} name="product_variation">
              <VariationSelect />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} lg={12} className="rightCol">
          <div className="box-container">
            <Form.Item label={t('Stock.Inventory.StorageVariation')} name="storage_variation">
              <StorageVariationAsyncSelect />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <FormSubmit isPending={false} title={t('Stock.Inventory.ApplyFilter')} />
    </FormStyle.Container>
  );
};

export default InventoryForm;

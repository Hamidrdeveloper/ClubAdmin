import { FormSubmit } from '@src/shared/components';
import { Col, Form, Row } from 'antd';
import React, { ReactElement } from 'react';

import OrderSaleGruopFunctionFormItem from './OrderSaleGroupFunctionFormItem';

interface Props {
  formFields: string[];
  onSubmit: (data: any) => void;
  pending: boolean;
}
const OrderSaleGroupFunctionForm = ({ formFields, onSubmit, pending }: Props): ReactElement => {
  const [form] = Form.useForm();
  return (
    <Form form={form} onFinish={onSubmit}>
      <Row gutter={32}>
        {formFields.splice(1, 4)?.map((field) => {
          return <OrderSaleGruopFunctionFormItem form={form} field={field} />;
        })}
      </Row>
      <Row>
        <Col span={24}>
          <FormSubmit isPending={pending} />
        </Col>
      </Row>
    </Form>
  );
};

export default OrderSaleGroupFunctionForm;

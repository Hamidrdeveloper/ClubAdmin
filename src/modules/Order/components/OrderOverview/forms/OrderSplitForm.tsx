import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderSplitModalFields } from '../../..';

const OrderSplitForm: FC<FormProps<OrderSplitModalFields>> = ({ onSubmit, isPending, initialValues }) => {
  const { t } = useTranslation();

  return (
    <Form name="order-split-form" layout={'vertical'} onFinish={onSubmit} initialValues={initialValues}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.List name={'positions'}>
            {(fields) => (
              <Row gutter={32}>
                {fields.map(({ key, name, fieldKey }, index) => (
                  <Col key={key} span={24}>
                    <Row gutter={8}>
                      <Form.Item
                        name={[name, 'orderPositionId']}
                        fieldKey={[fieldKey, 'orderPositionId']}
                        hidden
                      >
                        <Input />
                      </Form.Item>

                      <Col span={12}>
                        <Form.Item
                          name={[name, 'isActive']}
                          fieldKey={[fieldKey, 'isActive']}
                          label={' '}
                          valuePropName="checked"
                        >
                          <Checkbox>{initialValues?.positions[index].orderName ?? ' - '}</Checkbox>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          name={[name, 'quantity']}
                          fieldKey={[fieldKey, 'quantity']}
                          rules={[{ required: true }]}
                          label={t('Order.Field.Quantity')}
                        >
                          <InputNumber min={1} max={initialValues?.positions[index].quantity} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            )}
          </Form.List>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default OrderSplitForm;

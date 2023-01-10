import { FormSubmit, SuperSelect } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderVatChildModule } from '../../../Order.module';
import { OrderCreditGenerateModalFields } from '../../..';

const OrderCreditGenerateForm: FC<FormProps<OrderCreditGenerateModalFields>> = ({
  onSubmit,
  isPending,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <Form
      name="order-credit-generate-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.List name={'positions'}>
            {(fields) => (
              <>
                {fields.map(({ key, name, fieldKey }, index) => (
                  <Row key={key} gutter={16}>
                    <Form.Item
                      name={[name, 'orderPositionId']}
                      fieldKey={[fieldKey, 'orderPositionId']}
                      hidden
                    >
                      <Input />
                    </Form.Item>

                    <Col span={6}>
                      <Form.Item
                        name={[name, 'isActive']}
                        fieldKey={[fieldKey, 'isActive']}
                        label={' '}
                        valuePropName="checked"
                      >
                        <Checkbox>{initialValues?.positions[index].orderName ?? ' - '}</Checkbox>
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        name={[name, 'priceValue']}
                        fieldKey={[fieldKey, 'priceValue']}
                        rules={[{ required: true }]}
                        label={t('Order.Field.PriceValue')}
                      >
                        <InputNumber min={0.01} />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey, 'quantity']}
                        rules={[{ required: true }]}
                        label={t('Order.Field.Quantity')}
                      >
                        <InputNumber min={1} max={initialValues?.positions[index].quantity} />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        name={[name, 'vat']}
                        fieldKey={[fieldKey, 'vat']}
                        rules={[{ required: true }]}
                        label={t('Order.Field.VatValue')}
                      >
                        <SuperSelect
                          module={new OrderVatChildModule()}
                          hasNew={false}
                          optionSelector={{ label: 'value', value: 'id' }}
                          query={{ validFromLessThan: initialValues?.positions[index].createdAt }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Form.List>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default OrderCreditGenerateForm;

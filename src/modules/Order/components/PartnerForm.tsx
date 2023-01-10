import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { User, UserSelect } from '@src/modules/User';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Space } from 'antd';
import React, { Fragment, ReactElement, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function OrderForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<{ user: User | undefined }>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { role } = useContext(AuthContext);
  const isLoggedInUserPartner = role === 'partner';

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  /*
            "customer_id": 10,
            "partner_id": 4,
            "description":"this is my frist order partner",
            "invoice_contact_group_id":1,
    
            order_partner_positions:[
            {"name":"looking after",
                "quantity": 1,
                "price_value": 30,
                "vat_id": 3,
                "description":"test decription2"}
            ]
          * */

  return (
    <Form name="order-form" form={form} layout={'vertical'} onFinish={onSubmit}>
      <Row gutter={16}>
        {!isLoggedInUserPartner && (
          <Col span={12}>
            <Form.Item name="partner" label={t('Order.Partner.Field.PartnerId')} rules={[{ required: true }]}>
              <UserSelect />
            </Form.Item>
          </Col>
        )}

        <Col span={isLoggedInUserPartner ? 24 : 12}>
          <Form.Item name="customer" label={t('Order.Partner.Field.CustomerId')} rules={[{ required: true }]}>
            <UserSelect />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Form.List name={'order_partner_positions'}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                    <Fragment key={key}>
                      <Row gutter={[16, 0]} justify="end" align="middle">
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            required
                            name={[name, 'name']}
                            label={t('Global.Name')}
                            fieldKey={[fieldKey, 'name']}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={16}>
                          <Form.Item
                            {...restField}
                            required
                            name={[name, 'description']}
                            label={t('Global.Description')}
                            fieldKey={[fieldKey, 'description']}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            required
                            name={[name, 'quantity']}
                            label={t('Global.Description')}
                            fieldKey={[fieldKey, 'description']}
                          >
                            <InputNumber />
                          </Form.Item>
                        </Col>

                        <Col span={3}>
                          <Space>
                            {index === 0 && (
                              <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                            )}

                            {fields.length > 1 && (
                              <Button
                                ghost
                                danger
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}
                              />
                            )}
                          </Space>
                        </Col>
                      </Row>
                      <Divider />
                    </Fragment>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}

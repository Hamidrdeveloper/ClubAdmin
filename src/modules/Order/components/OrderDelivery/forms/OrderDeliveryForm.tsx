import { OrderDeliveryModalFields } from '@src/modules/Order';
import { PackageSelect } from '@src/modules/Package';
import { FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Divider, Form, Input, InputNumber, Row } from 'antd';
import React, { FC, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const OrderDeliveryForm: FC<FormProps<OrderDeliveryModalFields>> = ({
  onSubmit,
  isPending,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <Form name="order-delivery-form" layout={'vertical'} onFinish={onSubmit} initialValues={initialValues}>
      <Suspense fallback={<Loader />}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name={['package']} label={t('Order.Delivery.Package')} rules={[{ required: true }]}>
              <PackageSelect />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={['number']} label={t('Order.Delivery.TrackingCode')}>
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('Order.Delivery.TrackingCode') })}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name={['description']} label={t('Global.Description')}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Description') })} />
            </Form.Item>
          </Col>

          <Divider />
          <Col span={24}>
            <Form.List name={'items'}>
              {(fields) => (
                <Row gutter={32}>
                  {fields.map(({ key, name, fieldKey }, index) => (
                    <Col key={key} span={24}>
                      {initialValues?.items[index].order_position_type_id !== 2 ? (
                        <Row gutter={8}>
                          <Form.Item
                            name={[name, 'order_position_id']}
                            fieldKey={[fieldKey, 'order_position_id']}
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
                              <Checkbox>{initialValues?.items[index].name ?? ' - '}</Checkbox>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              name={[name, 'quantity']}
                              fieldKey={[fieldKey, 'quantity']}
                              rules={[{ required: true }]}
                              label={t('Order.Field.Quantity')}
                            >
                              <InputNumber min={0} max={initialValues?.items[index].quantity} />
                            </Form.Item>
                          </Col>
                        </Row>
                      ) : (
                        <React.Fragment key={index}>
                          <Row gutter={8}>{initialValues?.items[index].name ?? ' - '} :</Row>
                        </React.Fragment>
                      )}
                    </Col>
                  ))}
                </Row>
              )}
            </Form.List>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
};

export default OrderDeliveryForm;

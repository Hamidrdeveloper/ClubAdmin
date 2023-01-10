import UserPartnerSelect from '@modules/User/containers/UserPartnerSelect';
import { AuthContext } from '@src/core';
import { User } from '@src/modules/User';
import CreateOrderUserSelect from '@src/modules/User/containers/CreateOrderUserSelect';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row } from 'antd';
import React, { ReactElement, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function OrderForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<{ user: User | undefined }>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form name="order-form" form={form} layout={'vertical'} onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="user" label={t('Order.Field.UserId')} rules={[{ required: true }]}>
            {role === 'admin' ? <CreateOrderUserSelect /> : <UserPartnerSelect />}
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}

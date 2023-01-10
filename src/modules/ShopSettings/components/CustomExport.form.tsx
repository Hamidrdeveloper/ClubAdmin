import { OrderStatus } from '@src/modules/Order';
import { OrderStatusChildModule } from '@src/modules/Order/Order.module';
import { User, UserSelect } from '@src/modules/User';
import { FormSubmit, SuperSelect } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const CustomExportForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<{ user: User; order_status: OrderStatus }>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} name="exportCustom-form" onFinish={(data) => onSubmit(data)}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label={t('ShopSettings.Tab.Username')} name="user" rules={[{ required: true }]}>
            <UserSelect hasNew={false} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('ShopSettings.Tab.OrderStatus')}
            name="order_status"
            rules={[{ required: true }]}
          >
            <SuperSelect hasNew={false} module={new OrderStatusChildModule()} />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
};

import { UserSelect } from '@src/modules/User';
import { FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row, Space } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Calendar } from '../model/calendar.entity';

export default function CalendarForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Calendar>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="country-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ is_active: false, is_editable: false, is_visible: false }}
    >
      <Suspense fallback={<Loader />}>
        <Row gutter={[32, 8]} align="bottom">
          <Col flex={1}>
            <Row gutter={[32, 8]}>
              <Col xs={12}>
                <Form.Item label={t('Calendar.Field.Name')} name="name" rules={[{ required: true }]}>
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Field.Name') })} />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label={t('Calendar.Field.User')} name="user" rules={[{ required: true }]}>
                  <UserSelect />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col>
            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>{t('Global.IsActive')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[32, 8]} align="bottom">
          <Col flex={1}>
            <Row gutter={[32, 8]}>
              <Col xs={24}>
                <Form.Item label={t('Calendar.Field.Users')} name="users" rules={[{ required: true }]}>
                  <UserSelect isMulti />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col>
            <Space>
              <Form.Item name="is_editable" valuePropName="checked">
                <Checkbox>{t('Calendar.Field.IsEditable')}</Checkbox>
              </Form.Item>

              <Form.Item name="is_visible" valuePropName="checked">
                <Checkbox>{t('Calendar.Field.IsVisible')}</Checkbox>
              </Form.Item>
            </Space>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}

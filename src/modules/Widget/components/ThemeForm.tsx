import { ColorPicker, FormSubmit } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme } from 'styled-components';

export default function ThemeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<DefaultTheme>): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit} name="theme-form">
      <Row gutter={[16, 0]}>
        <Col span={8}>
          <Form.Item label={t('Widget.MainColor')} name={['colors', 'main']} rules={[{ required: true }]}>
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('Widget.PrimaryColor')}
            name={['colors', 'primary']}
            rules={[{ required: true }]}
          >
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('Widget.SecondaryColor')}
            name={['colors', 'secondary']}
            rules={[{ required: true }]}
          >
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('Widget.MainAccentColor')}
            name={['colors', 'main_accent']}
            rules={[{ required: true }]}
          >
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('Widget.MainAccentDarkColor')}
            name={['colors', 'main_accent_dark']}
            rules={[{ required: true }]}
          >
            <ColorPicker />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('Widget.GreyColor')} name={['colors', 'grey']} rules={[{ required: true }]}>
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}

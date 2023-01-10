import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarCategory } from '../model/calendar.entity';

const CalendarCategoryForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<CalendarCategory>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="calendar-category-form"
      initialValues={{ is_active: true, translate: [{ locale: undefined, name: '' }] }}
    >
      <Row justify="space-between" gutter={16}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="space-between" gutter={16}>
        {/* <Col span={8}>
          <Form.Item label={t('Calendar.Category.Field.Parent')} name="parent">
            <CalendarCategorySelect />
          </Form.Item>
        </Col> */}

        {/* <Col span={12}>
          <Form.Item label={t('Calendar.Category.Field.Slug')} name="slug">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Category.Field.Slug') })} />
          </Form.Item>
        </Col> */}

        <Col span={8}>
          <Form.Item label={t('Calendar.Category.Field.Sort')} name="sort">
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Category.Field.Sort') })}
            />
          </Form.Item>
        </Col>

        <Col flex={1} style={{ paddingTop: 30 }}>
          <Form.Item name="is_active" valuePropName="checked">
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default CalendarCategoryForm;

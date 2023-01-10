import CareerStepSelect from '@src/modules/CareerStep/container/CareerStepSelect';
import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SpecialConditionCareerStepModel } from '../model/SpecialConditionCareerStep.entity';

export default function SpecialConditionCareerStepForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<SpecialConditionCareerStepModel>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) return;

    form.setFieldsValue({
      ...initialValues,
      from_to_date_range: [moment(initialValues?.from ?? undefined), moment(initialValues.to ?? undefined)],
    });
  }, [initialValues]);

  return (
    <Form form={form} name="special-condition-career-step-form" layout="vertical" onFinish={onSubmit}>
      <Row gutter={[32, 8]}>
        <Col xs={12}>
          <Form.Item
            name={'points'}
            rules={[{ required: true }]}
            label={t('SpecialConditionCareerStep.Points')}
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Suspense fallback={FallbackSelect(t('SpecialConditionCareerStep.CareerStep'))}>
            <Form.Item
              name="careerStep"
              rules={[{ required: true }]}
              label={t('SpecialConditionCareerStep.CareerStep')}
            >
              <CareerStepSelect />
            </Form.Item>
          </Suspense>
        </Col>

        <Col xs={24}>
          <Form.Item
            name={'from_to_date_range'}
            rules={[{ required: true }]}
            label={t('SpecialConditionCareerStep.FromToDateRange')}
          >
            <DatePicker.RangePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}

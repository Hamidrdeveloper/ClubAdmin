import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Checkbox, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CompetitionModel } from '../model/Competition.entity';

const CompetitionForm = ({
  isPending,
  initialValues,
  onSubmit,
}: FormProps<CompetitionModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        release_date: initialValues.release_date ? moment(initialValues.release_date) : null,
        available_until: initialValues.available_until ? moment(initialValues.available_until) : null,
        translations:
          initialValues.translations?.length > 0
            ? initialValues.translations
            : [{ locale: undefined, name: '', title: '' }],
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="competition-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translations: [{ locale: undefined, title: '', name: '' }], must_accept_terms: false }}
    >
      <Row gutter={[16, 0]} justify="space-between">
        <Col span={12}>
          <Form.Item name="release_date" label={t('Competition.StartDate')}>
            <DatePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="available_until" label={t('Competition.EndDate')}>
            <DatePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>
      </Row>

      <DescriptionArrayInput name={'translations'} inputName={'title'} isEditor />
      <Row gutter={[16, 0]} justify="start">
        <Col span={24}>
          <Form.Item required valuePropName="checked" name="must_accept_terms">
            <Checkbox>{t('Competition.AcceptTerms')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default CompetitionForm;

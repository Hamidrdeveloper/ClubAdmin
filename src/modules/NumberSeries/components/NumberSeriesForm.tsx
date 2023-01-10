import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Row, Space } from 'antd';
import moment from 'moment';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { NumberSeries, NumberSeriesType } from '../model/numberSeries.entity';
import NumberSeriesInput from './NumberSeriesInput';
import NumberSeriesTypeSelect from './NumberSeriesTypeSelect';

export default function NumberSeriesForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<NumberSeries>): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues?.numberSeriesPositions?.length && initialValues.numberSeriesPositions.length > 0) {
      form.setFieldsValue({
        ...initialValues,
        numberSeriesPositions: initialValues.numberSeriesPositions?.map((item) => ({
          ...item,
          available_from: moment(item.available_from),
        })),
      });
    } else {
      form.setFieldsValue({
        numberSeriesPositions: [
          {
            prefix: '',
            allow_gaps: false,
            is_default: false,
            last_number: null,
            ending_number: null,
            warning_number: null,
            starting_number: null,
            available_from: moment(),
            increment_by_number: null,
          },
        ],
      });
    }
  }, [initialValues]);

  const onNumberSeriesTypeChangeHandler = (numberSeriesType: NumberSeriesType) => {
    form.setFieldsValue({ numberSeriesType });
  };

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="number-series-form"
      initialValues={{
        active_manual: false,
        date_order: false,
        translate: [{ locale: undefined, description: '' }],
      }}
    >
      <Row gutter={[16, 15]}>
        <Col xs={12}>
          <Form.Item rules={[{ required: true }]} name="numberSeriesType" label={t('Global.Type')}>
            <NumberSeriesTypeSelect onChange={onNumberSeriesTypeChangeHandler} />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Space style={{ marginTop: '30px' }} align="center">
            <Form.Item name="active_manual" valuePropName="checked">
              <Checkbox>{t('NumberSeries.Field.ActiveManual')}</Checkbox>
            </Form.Item>
            <Form.Item name="date_order" valuePropName="checked">
              <Checkbox>{t('NumberSeries.Field.DateOrder')}</Checkbox>
            </Form.Item>
          </Space>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <Form.Item>
            <DescriptionArrayInput />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item>
            <NumberSeriesInput name="numberSeriesPositions" />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}

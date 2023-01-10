import { ColorPicker, FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import moment, { Moment } from 'moment';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CalendarCategorySelect from '../containers/CalendarCategorySelect';
import { CalendarEventPure } from '../model/event.entity';

export default function CalenderEventForm({
  onSubmit,
  initDate,
  isPending,
  initialValues,
  onEventDelete,
}: FormProps<CalendarEventPure> & { initDate?: string | string[]; onEventDelete: () => void }): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: [
          moment(`${initialValues.start_date}T${initialValues.start_time}`),
          moment(`${initialValues.end_date}T${initialValues.end_time}`),
        ],
      });
    } else if (initDate) {
      form.setFieldsValue({
        date: Array.isArray(initDate)
          ? [moment(initDate[0]), moment(initDate[1])]
          : [moment(initDate), moment(initDate)],
      });
    }
  }, [initialValues]);

  const disabledDate = (current: Moment): boolean => {
    return current && current < moment().startOf('day');
  };

  const handleSubmit = (values: CalendarEventPure & { date: Moment[] }): void => {
    const { date, ...restValues } = values;

    onSubmit({
      ...restValues,
      start_date: moment(date[0]).format('YYYY-MM-DD'),
      end_date: moment(date[1]).format('YYYY-MM-DD'),
      start_time: moment(date[0]).format('HH:mm'),
      end_time: moment(date[1]).format('HH:mm'),
    });
  };

  return (
    <Form
      form={form}
      name="country-form"
      layout={'vertical'}
      onFinish={handleSubmit}
      initialValues={{ is_full_day: false, is_repeating: false, color: '#ed2559' }}
    >
      <Suspense fallback={<Loader />}>
        <Row gutter={[32, 8]} align="bottom">
          <Col xs={24}>
            <Form.Item label={t('Calendar.Event.Field.Name')} name="title" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Event.Field.Name') })} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="date" rules={[{ required: true }]} label={t('Calendar.Event.Field.Date')}>
              <DatePicker.RangePicker
                showTime
                disabledDate={disabledDate}
                format={intlDateFormat(true)}
                placeholder={[t('Calendar.Event.Field.StartDate'), t('Calendar.Event.Field.EndDate')]}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="calendarCategories" label={t('Calendar.Category.Title')}>
              <CalendarCategorySelect isMulti />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label={t('Calendar.Event.Field.Location')} name="location">
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Event.Field.Location') })}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label={t('Calendar.Event.Field.MeetLink')} name="url">
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Event.Field.MeetLink') })}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label={t('Calendar.Event.Field.Color')} name="color">
              <ColorPicker />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item label={t('Calendar.Event.Field.Description')} name="description">
              <Input.TextArea
                rows={4}
                placeholder={t('Global.InputPlaceholder', { title: t('Calendar.Event.Field.Description') })}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="is_full_day" valuePropName="checked">
              <Checkbox>{t('Calendar.Event.Field.AllDay')}</Checkbox>
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="is_repeating" valuePropName="checked">
              <Checkbox>{t('Calendar.Event.Field.Repeat')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit
          isPending={isPending}
          Secondary={
            initialValues ? (
              <Button onClick={onEventDelete} ghost danger>
                Delete
              </Button>
            ) : null
          }
        />
      </Suspense>
    </Form>
  );
}

import i18n from '@src/core/i18n/config';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { DatePicker, Form } from 'antd';
import moment, { Moment } from 'moment';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

function disabledDate(current: Moment) {
  // enabling from 18 years ago or before.
  return current >= moment().subtract(18, 'years');
}

type Props = {
  name: string;
  label: string;
  isRequired: boolean;
};
const BirthdayPicker = ({
  name = 'birth_date',
  label = i18n.t('Global.BirthDate'),
  isRequired = false,
}: Partial<Props>): ReactElement => {
  const { t } = useTranslation();

  return (
    <Form.Item label={label} name={name} rules={[{ required: isRequired }]}>
      <DatePicker
        showToday={false}
        format={intlDateFormat()}
        disabledDate={disabledDate}
        picker={'date'}
        defaultPickerValue={moment().subtract(18, 'years')}
        placeholder={t('Global.SelectPlaceholder', { title: t('Global.BirthDate') })}
      />
    </Form.Item>
  );
};

export default BirthdayPicker;

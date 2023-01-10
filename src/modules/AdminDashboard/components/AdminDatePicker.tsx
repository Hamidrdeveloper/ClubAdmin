import { Button, Col, DatePicker, Row } from 'antd';
import moment, { Moment } from 'moment';
import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RangeDateProps, today, yesterday } from '../pages/AdminDashboard';

type Props = {
  setDate: Dispatch<SetStateAction<RangeDateProps>>;
};

const AdminDatePicker = ({ setDate }: Props): ReactElement => {
  const { t } = useTranslation();

  useEffect(() => {
    setDate({ from_date: yesterday, to_date: today });
  }, []);

  const [defaultFromDate, setDefaultFromDate] = useState(moment().subtract(1, 'days'));
  const [defaultToDate, setDefaultToDate] = useState(moment());

  const { RangePicker } = DatePicker;

  function disabledDates(current: Moment) {
    // disabling future dates
    return current >= moment();
  }

  const dateChangeHandler = (date: [Moment, Moment]) => {
    setDate({
      from_date: date[0].format('YYYY-MM-DD'),
      to_date: date[1].format('YYYY-MM-DD'),
    });
    setDefaultFromDate(date[0]);
    setDefaultToDate(date[1]);
  };

  const resetToDefault = () => {
    setDate({
      from_date: yesterday,
      to_date: today,
    });

    setDefaultFromDate(moment().subtract(1, 'days'));
    setDefaultToDate(moment());
  };

  return (
    <>
      <Row justify="end" gutter={12} style={{ marginBottom: '30px' }}>
        <Col>
          <Button onClick={resetToDefault}>{t('Global.ResetToDefault')}</Button>
        </Col>
        <Col>
          <RangePicker
            disabledDate={disabledDates}
            onChange={dateChangeHandler}
            value={[defaultFromDate, defaultToDate]}
          />
        </Col>
      </Row>
    </>
  );
};

export default AdminDatePicker;

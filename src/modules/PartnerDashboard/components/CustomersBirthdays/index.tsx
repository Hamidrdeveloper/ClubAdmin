import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import InfoLegend from '../InfoLegend';

const CustomersBirthdays = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<number>();
  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/customers-birthdays`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: { birthdays_this_month: number } }>) => {
        const data = resp.data.data;

        setData(data.birthdays_this_month);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <InfoLegend
          text={i18n.t('Dashboards.Partner.BirthdaysThisMonth')}
          amt={data ?? ''}
          link={'/admin/user/user'}
        />
      )}
    </>
  );
};

export default CustomersBirthdays;

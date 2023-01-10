import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import InfoLegend from '../InfoLegend';

const SeminarLadder = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<number>();
  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/seminar-leader`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: { number_of_seminars: number } }>) => {
        const data = resp.data.data;

        setData(data.number_of_seminars);

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
        <InfoLegend text={i18n.t('Dashboards.Partner.NumberOfSeminars')} amt={data ?? ''} />
      )}
    </>
  );
};

export default SeminarLadder;

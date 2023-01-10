import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import InfoLegend from '../InfoLegend';

const ManagersInMyDownLine = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<number>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/managers-downline`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: { club_members: number } }>) => {
        const data = resp.data.data;

        setData(data.club_members);

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
        <InfoLegend text={i18n.t('Dashboards.Partner.ClubMembers')} amt={data ?? ''} />
      )}
    </>
  );
};

export default ManagersInMyDownLine;

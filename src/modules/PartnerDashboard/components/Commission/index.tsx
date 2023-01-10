import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import AreaChart from '../Charts/AreaChart';
import { CommissionModel } from './model/Commission.entity';

const Commission = ({ id }: { id: number }): ReactElement => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState({} as CommissionModel);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/commission`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: CommissionModel }>) => {
        const data = resp.data.data;
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange]);

  return isLoading ? <Loader /> : <AreaChart data={data.chart_data} />;
};

export default Commission;

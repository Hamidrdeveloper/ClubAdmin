import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { Sector } from 'recharts';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import PieChart from '../Charts/PieChart';
import { LatestTeamMembersModel } from './model/LatestTeamMembers.entity';

const chartColors = ['#108AB2', '#FFD166', '#C60EFF', '#EF476F', '#08D6A1'];
const LatestTeamMembers = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<LatestTeamMembersModel>({} as LatestTeamMembersModel);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/latest-team-members`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: LatestTeamMembersModel }>) => {
        setLoading(false);
        setData(resp.data.data);
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
        <PieChart
          data={data.chart_data ?? []}
          colors={chartColors}
          renderer={renderActiveShape.bind(this, data)}
        />
      )}
    </>
  );
};

export default LatestTeamMembers;

const renderActiveShape = (data: LatestTeamMembersModel, props: any): ReactElement => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <text x={cx} y={cy - innerRadius / 3} textAnchor="middle" fill={'black'} style={{ fontSize: '1rem' }}>
        {i18n.t('Global.Total')}
      </text>

      <text x={cx} y={cy + innerRadius / 3} textAnchor="middle" fill={'#989898'} style={{ fontSize: '1rem' }}>
        {data?.total}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

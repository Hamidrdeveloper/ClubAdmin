// We no longer using this file
import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sector } from 'recharts';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import PieChart from '../Charts/PieChart';
import InfoLegend from '../InfoLegend';
import { GenerationModel } from './model/generation.entity';

const colors = ['#06D6A0', '#EF476F'];

const FourthGeneration = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<GenerationModel>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);
  const currentLanguage = i18n.resolvedLanguage;
  const fromDate = selectedDateRange?.from_date ? new Date(selectedDateRange.from_date) : new Date();
  const monthName = fromDate.toLocaleString(currentLanguage, { month: 'long' });
  const { t } = useTranslation();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/generation?generation=4`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: GenerationModel }>) => {
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
        <>
          <PieChart
            data={data?.chart_data ?? []}
            colors={colors}
            renderer={renderActiveShape.bind(this, data, monthName)}
          />
          <InfoLegend text={t('Dashboards.Partner.Points')} amt={data?.points} />
          <InfoLegend text="BFU" amt={data?.bfu} />
        </>
      )}
    </>
  );
};

export default FourthGeneration;

const renderActiveShape = (data: GenerationModel, monthName: string, props: any): ReactElement => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - innerRadius / 2}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {monthName}
      </text>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '0.6rem', fontWeight: 'lighter' }}
      >
        {i18n.t('Dashboards.Partner.AllPartners')}
      </text>
      <text
        x={cx}
        y={cy + innerRadius / 2}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {data?.all_partners}
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

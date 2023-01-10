import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Sector } from 'recharts';

import { partnerCurrencySymbolAtom, selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import PieChart from '../Charts/PieChart';
import InfoLegend from '../InfoLegend';
import { GenerationModel } from './model/generation.entity';

const colors = ['#06D6A0', '#EF476F'];

type props = {
  isLoading: boolean;
  data?: GenerationModel;
};
const SingleGeneration = ({ data, isLoading }: props): ReactElement => {
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);
  const { t } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;
  const fromDate = selectedDateRange?.from_date ? new Date(selectedDateRange.from_date) : new Date();
  const monthName = fromDate.toLocaleString(currentLanguage, { month: 'long' });
  const [currencySymbol] = useAtom(partnerCurrencySymbolAtom);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PieChart
            colors={colors}
            data={data?.chart_data ?? []}
            renderer={renderActiveShape.bind(this, data, monthName)}
          />
          <InfoLegend
            text={t('Dashboards.Partner.ProcessingBFU')}
            amt={`${data?.in_progress_bfu.toFixed(2)}${currencySymbol ?? ''}`}
          />
          <InfoLegend text={t('Dashboards.Partner.ProcessingPoints')} amt={data?.in_progress_points} />
          <InfoLegend text={t('Dashboards.Partner.Points')} amt={data?.points} />
          <InfoLegend
            text={t('Dashboards.Partner.CompletedBFU')}
            amt={`${data?.bfu.toFixed(2)}${currencySymbol?? ''}`}
          />
        </>
      )}
    </>
  );
};

export default SingleGeneration;

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

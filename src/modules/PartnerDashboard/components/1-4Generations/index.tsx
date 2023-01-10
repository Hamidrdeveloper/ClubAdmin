import { Loader } from '@src/shared/components';
import { Col, Row } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { partnerCurrencySymbolAtom } from '../../pages/PartnerDashboard';
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import InfoLegend from '../InfoLegend';
import { ChartData } from '../TotalCustomers.tsx/model/TotalSales.entity';
import { OneToFourGenerationsModel } from './model/OneToFourGenerations.entity';

const colors = ['#FAD9E7', '#B2E1F5', '#FFF3A1', '#BEF5BE'];
type props = {
  isLoading: boolean;
  data?: OneToFourGenerationsModel;
};
const OneToFourGenerations = ({ isLoading, data }: props): ReactElement => {
  const { t } = useTranslation();

  const [currencySymbol] = useAtom(partnerCurrencySymbolAtom);

  const numberToFix = useMemo(() => {
    return (num: string | number) => Number(num).toFixed(2);
  }, []);
  const chartDataToFix = useMemo(() => {
    return (chartData: ChartData[]) => chartData.map((el) => ({ ...el, amt: Number(el.amt).toFixed(2) }));
  }, []);

  const normalizedData = useMemo(() => {
    if (!data) return undefined;

    const finalValues: OneToFourGenerationsModel = {
      ...data,

      points: data.points,
      bfu: numberToFix(data.bfu),
      in_progress_points: data.in_progress_points,
      in_progress_bfu: numberToFix(data.in_progress_bfu),

      point_data: data.point_data,
      bfu_data: chartDataToFix(data.bfu_data),
      in_progress_point_data: data.in_progress_point_data,
      in_progress_bfu_data: chartDataToFix(data.in_progress_bfu_data),
    };

    return finalValues;
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row justify="space-around">
          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.all_partner_data ?? []} colors={colors} />

            <InfoLegend text={t('Dashboards.Partner.NumberOfPartners')} amt={normalizedData?.all_partners} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.active_partner_data ?? []} colors={colors} />

            <InfoLegend text={t('Dashboards.Partner.ActivePartners')} amt={normalizedData?.active_partners} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.bfu_data ?? []} colors={colors} />

            <InfoLegend text={t('Dashboards.Partner.BFU')} amt={`${normalizedData?.bfu}${currencySymbol ?? ''}`} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.in_progress_bfu_data ?? []} colors={colors} />

            <InfoLegend
              text={t('Dashboards.Partner.InProgressBFU')}
              amt={`${normalizedData?.in_progress_bfu}${currencySymbol ?? ''}`}
            />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.point_data ?? []} colors={colors} />

            <InfoLegend text={t('Dashboards.Partner.Points')} amt={normalizedData?.points} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={normalizedData?.in_progress_point_data ?? []} colors={colors} />

            <InfoLegend
              amt={normalizedData?.in_progress_points}
              text={t('Dashboards.Partner.InProgressPoints')}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default OneToFourGenerations;

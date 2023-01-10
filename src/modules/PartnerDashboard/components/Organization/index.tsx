import { Loader } from '@src/shared/components';
import { Col, Row } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import InfoLegend from '../InfoLegend';
import { OrganizationModel } from './model/Organization.entity';

const colors = ['#D8D9DA', '#F2F2F2'];
const Organization = ({ id }: { id: number }): ReactElement => {
  const { t } = useTranslation();
  const [data, setData] = useState<OrganizationModel>({} as OrganizationModel);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    axios
      .get(`partner-dashboard/${id}/organization`, { signal: controller.signal, params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: OrganizationModel }>) => {
        setLoading(false);
        setData(resp.data.data);
      })
      .catch(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedDateRange]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row justify="space-between">
          <Col span={11}>
            <HorizontalBarChart data={data?.all_partner_data} colors={colors} />
            <InfoLegend text={t('Dashboards.Partner.NumberOfPartners')} amt={data?.all_partners} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={data?.active_partner_data} colors={colors} />
            <InfoLegend text={t('Dashboards.Partner.ActivePartners')} amt={data?.active_partners} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={data?.point_data} colors={colors} />
            <InfoLegend text={t('Dashboards.Partner.Points')} amt={data?.points} />
          </Col>

          <Col span={11}>
            <HorizontalBarChart data={data?.bfu_data} colors={colors} />
            <InfoLegend text={t('Dashboards.Partner.BFU')} amt={data?.bfu} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Organization;

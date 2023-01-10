import { ArrowRightOutlined, CaretDownOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons';
import { Loader } from '@src/shared/components';
import { Avatar, Col, Row, Typography } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import BarChart from '../Charts/BarChartNegative';
import { CareerLevelChangeModel } from './model/careerChange.entity';

const CareerLevelsChange = ({ id }: { id: number }): ReactElement => {
  const { t } = useTranslation();
  const [data, setData] = useState<CareerLevelChangeModel>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/career-levels-change`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: CareerLevelChangeModel }>) => {
        setLoading(false);
        setData(resp.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange]);

  return (
    <RowContainer align="middle">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Col span={4}>
            <Typography.Title level={5}>{t('Dashboards.Partner.OwnSponsored')}</Typography.Title>
            <Row align="middle">
              <div className="info">
                <Text>{t('Dashboards.Partner.NumberOfQualifications')}</Text>
                <Text style={{ color: '#03D7A0' }}>
                  {data?.own_sponsored?.number_of_qualifications} <CaretUpOutlined color="#03D7A0" />
                </Text>
              </div>
            </Row>
            <Row align="middle">
              <div className="info">
                <Text>{t('Dashboards.Partner.NumberOfReturns')}</Text>
                <Text style={{ color: '#F14770' }}>
                  {data?.own_sponsored?.number_of_returns} <CaretDownOutlined color="#F14770" />
                </Text>
              </div>
            </Row>
          </Col>
          <Col span={4}>
            <BarChart data={data?.own_sponsored.chart_data ?? []} />
          </Col>
          <Col span={4}>
            <Typography.Title level={5}>{t('Dashboards.Partner.TwoToFourLevel')}</Typography.Title>
            <Row align="middle">
              <div className="info">
                <Text>{t('Dashboards.Partner.NumberOfQualifications')}</Text>
                <Text style={{ color: '#03D7A0' }}>
                  {data?.['2-4_level'].number_of_qualifications} <CaretUpOutlined color="#03D7A0" />
                </Text>
              </div>
            </Row>
            <Row align="middle">
              <div className="info">
                <Text>{t('Dashboards.Partner.NumberOfReturns')}</Text>
                <Text style={{ color: '#F14770' }}>
                  {data?.['2-4_level'].number_of_returns} <CaretDownOutlined color="#F14770" />
                </Text>
              </div>
            </Row>
          </Col>
          <Col span={4}>
            <BarChart data={data?.['2-4_level'].chart_data ?? []} />
          </Col>
          <Col span={8}>
            <Row justify="space-between">
              <Typography.Title level={5}>{t('Dashboards.Partner.YouMayHelpMsg')} </Typography.Title>
              <Text style={{ color: '#5DA06C' }}>" 20 {t('Dashboards.Partner.PeoplePending')} "</Text>
            </Row>
            <Row>
              <div className="approachBox">
                <Text>{t('Dashboards.Partner.ApproachToSupervisorLevel')}</Text>
                <div className="avatarGroup">
                  <Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <Avatar style={{ backgroundColor: '#1890ff' }} src="https://joeschmoe.io/api/v1/random" />
                  </Avatar.Group>
                  <Typography.Link href="/admin/partner/list">
                    {t('Global.SeeAll')} <ArrowRightOutlined />
                  </Typography.Link>
                </div>
              </div>
            </Row>
            <Row>
              <div className="approachBox">
                <Text>{t('Dashboards.Partner.ApproachToDeadline')}</Text>
                <div className="avatarGroup">
                  <Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <Avatar style={{ backgroundColor: '#1890ff' }} src="https://joeschmoe.io/api/v1/random" />
                  </Avatar.Group>
                  <Typography.Link href="/admin/partner/list">
                    {t('Global.SeeAll')} <ArrowRightOutlined />
                  </Typography.Link>
                </div>
              </div>
            </Row>
          </Col>
        </>
      )}
    </RowContainer>
  );
};

export default CareerLevelsChange;

const RowContainer = styled(Row)`
  .info {
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 8px 0;
    text-align: left;
    border-left: 1px solid #c9c9c9;
  }
  .approachBox {
    display: flex;
    flex-direction: column;
    text-align: left;

    padding: 12px;
  }
  .avatarGroup {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

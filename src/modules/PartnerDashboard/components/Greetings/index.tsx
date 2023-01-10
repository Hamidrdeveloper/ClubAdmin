/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { EyeOutlined } from '@ant-design/icons';
import Env from '@src/core/Configs/ConfigureEnv';
import { Subdomain } from '@src/modules/Subdomain';
import { Loader } from '@src/shared/components';
import { Button, Col, DatePicker, Divider, Row, Tag, Typography } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import { useAtom } from 'jotai';
import moment, { Moment } from 'moment';
import React, { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { partnerCurrencySymbolAtom, selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import GreetingCard from './GreetingCard';
import { AboutPartnerModel } from './model/about.entity';
import { CompetitionTextModel } from './model/headerTexts.entity';
import { getAboutData } from './model/service/getAboutData.service';
import { getCompetitionData } from './model/service/getCompetitionData.service';
import { getPartnerSubdomains } from './model/service/getSubdomainsData.service';
import TargetCashCard from './TargetCashCard';

const { Title, Paragraph } = Typography;

const Greetings = ({ id }: { id: number }): ReactElement => {
  const { t } = useTranslation();

  const today = useMemo(() => moment(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDateRange, setSelectedDateRange] = useAtom(selectedDateRangeAtom);

  const [, setPartnerCurrency] = useAtom(partnerCurrencySymbolAtom);

  const {
    data: competitionData,
    isLoading: competitionLoading,
    refetch: refetchCompetitionData,
  } = useQuery<CompetitionTextModel[]>({
    queryKey: ['competition-data', id, selectedDateRange],
    queryFn: () => getCompetitionData({ id, selectedDateRange }),
  });

  const { data: aboutData, isLoading: aboutDataLoading } = useQuery<AboutPartnerModel>({
    queryKey: ['about-data', id, selectedDateRange],
    queryFn: () => getAboutData({ id, selectedDateRange }),
    onSuccess: (data: AboutPartnerModel) => {
      const symbol = data.user_currency.symbol;

      setPartnerCurrency(symbol);
    },
  });

  const { data: subdomainData } = useQuery<Subdomain[]>({
    queryKey: ['subdomains', id],
    queryFn: () => getPartnerSubdomains(id),
  });

  const protocol = Env.SHOP_URL.split('//')[0];
  const shopDomain = Env.SHOP_URL.split('//')[1];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days after this month and this month
    return current && current > moment().endOf('day');
  };

  const resetToThisMonth = () => {
    setSelectedDate(today);
    setSelectedDateRange({
      from_date: today.startOf('M').format('YYYY-MM-DD'),
      to_date: today.endOf('M').format('YYYY-MM-DD'),
    });
  };
  const dateChangeHandler = (date: Moment) => {
    setSelectedDate(date);
    setSelectedDateRange({
      from_date: date.startOf('M').format('YYYY-MM-DD'),
      to_date: date.endOf('M').format('YYYY-MM-DD'),
    });
  };

  return (
    <>
      {aboutDataLoading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Title>{t('Global.HelloTo', { name: aboutData?.full_name })}</Title>
                  <Link to={`/admin/partner/list/tree/${id}`}>
                    <Tag color="magenta">
                      <EyeOutlined />
                      <span>{t('Dashboards.Partner.PartnerTree')}</span>
                    </Tag>
                  </Link>
                  <br />
                  {aboutData?.career_step_name && (
                    <Paragraph>
                      - {t('Dashboards.Partner.CurrentCareerService')} {aboutData.career_step_name}
                    </Paragraph>
                  )}
                </Col>
                <Col>
                  <Row style={{ gap: '8px' }}>
                    <Col>
                      <Button onClick={resetToThisMonth}>{t('Global.ResetToDefault')}</Button>
                    </Col>
                    <Col>
                      <DatePicker
                        onChange={dateChangeHandler}
                        value={selectedDate}
                        picker="month"
                        disabledDate={disabledDate}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          {subdomainData?.length !== 0 && (
            <Row>
              <Col>
                <Title>{t('Dashboards.Partner.Subdomains')}</Title>
                {subdomainData?.map((subdomain) => {
                  return (
                    <a href={`${protocol}//${subdomain?.name}.${shopDomain}`} target="_blank">
                      <Tag color="magenta">
                        <EyeOutlined />
                        <span>{subdomain?.name}</span>
                      </Tag>
                    </a>
                  );
                })}
              </Col>
            </Row>
          )}
        </>
      )}

      <Divider />
      <Row>
        <Col md={16} xs={24}>
          <Row
            style={{
              padding: '10px',
              flexWrap: 'nowrap',
              overflow: 'auto',
              height: '500px',
            }}
          >
            {competitionLoading ? (
              <Loader />
            ) : (
              <>
                {competitionData?.map((card, index) => (
                  <Col
                    span={6}
                    style={{
                      borderRight: '1px dashed #d9d9d9',
                      padding: '10px',
                    }}
                    key={index}
                  >
                    <GreetingCard {...card} refetchFn={refetchCompetitionData} />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Col>

        <Col md={8} xs={24} style={{ padding: '10px' }}>
          <TargetCashCard id={id} />
        </Col>
      </Row>
    </>
  );
};

export default Greetings;

import { Loader } from '@src/shared/components';
import { CheckboxOptionType, Col, Radio, RadioChangeEvent, Row, Typography } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  SHOULD_HAVE_CURRENCY_SYMBOL_COLUMNS,
  partnerCurrencySymbolAtom,
  selectedDateRangeAtom,
} from '../../pages/PartnerDashboard';
import SimpleBarChart from '../Charts/SimpleBarChart';
import { TotalSales } from '../TotalCustomers.tsx/model/TotalSales.entity';

type Props = {
  id: number;
};
const GroupTurnover = ({ id }: Props): ReactElement => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<CheckboxOptionType[]>([
    { label: t('Dashboards.Partner.Orders'), value: 'orders' },
    { label: t('Dashboards.Partner.Points'), value: 'points' },
    { label: t('Dashboards.Partner.BFU'), value: 'bfu' },
    { label: t('Dashboards.Partner.TotalSales'), value: 'total_sales' },
  ]);

  const [unsafeOptions, setUnsafeOptions] = useState<CheckboxOptionType[]>([
    { label: t('Dashboards.Partner.Orders'), value: 'in_progress_orders' },
    { label: t('Dashboards.Partner.Points'), value: 'in_progress_points' },
    { label: t('Dashboards.Partner.BFU'), value: 'in_progress_bfu' },
    { label: t('Dashboards.Partner.TotalSales'), value: 'in_progress_total_sales' },
  ]);

  const [value, setValue] = useState(options[1].value);
  const [data, setData] = useState<TotalSales>();
  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);
  const [currencySymbol] = useAtom(partnerCurrencySymbolAtom);

  const onChangeHandler = (e: RadioChangeEvent): void => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/group-turnover`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: TotalSales }>) => {
        const data = resp.data.data;

        // Don't judge these blocks of codes, they are trash I know, this happens when your CTO, PO, ... refuse to have Documentation and they require last minute updates to changes...
        // These should be handled in backend side, from endpoints.
        setOptions((prev) =>
          prev.map((item: CheckboxOptionType) => {
            const pureLabel = String(item.label).split(':')[0];

            let finalValue: string = data[String(item.value)];

            if (SHOULD_HAVE_CURRENCY_SYMBOL_COLUMNS.includes(String(item.value))) {
              if (!!currencySymbol) {
                finalValue += currencySymbol;
              }
            }

            return {
              ...item,
              label: `${pureLabel}: ${finalValue}`,
            };
          }),
        );

        setUnsafeOptions((prev) =>
          prev.map((item: CheckboxOptionType) => {
            const pureLabel = String(item.label).split(':')[0];

            let finalValue: string = data[String(item.value)];

            if (SHOULD_HAVE_CURRENCY_SYMBOL_COLUMNS.includes(String(item.value))) {
              if (!!currencySymbol) {
                finalValue += currencySymbol;
              }
            }

            return {
              ...item,
              label: `${pureLabel}: ${finalValue}`,
            };
          }),
        );

        setData(data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange, currencySymbol]);

  return (
    <MainContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content">
          <Row justify="space-around" className="options-container">
            <Col xs={24}>
              <Typography.Title level={5}>{t('Dashboards.Partner.Completed')}: </Typography.Title>
            </Col>
            <Col xs={24}>
              <Radio.Group
                value={value}
                options={options}
                optionType="button"
                buttonStyle="solid"
                onChange={onChangeHandler}
              />
            </Col>

            <Col xs={24}>
              <Typography.Title level={5}>{t('Dashboards.Partner.InProgress')}: </Typography.Title>
            </Col>
            <Col xs={24}>
              <Radio.Group
                value={value}
                optionType="button"
                buttonStyle="solid"
                options={unsafeOptions}
                onChange={onChangeHandler}
              />
            </Col>
          </Row>

          <Row justify="center" align="middle">
            <SimpleBarChart data={data?.chart_data[String(value)]} color={'#BEF4BE'} />
          </Row>
        </div>
      )}
    </MainContainer>
  );
};

export default GroupTurnover;

const MainContainer = styled.div`
  text-align: center;

  .ant-radio-button-checked {
    background-color: #039ddb;
    color: #fff;
  }
  & > * {
    padding: 12px;
  }

  .content {
    gap: 8px;
    display: flex;
    flex-direction: column;

    .options-container {
      row-gap: 6px !important;
      h5 {
        margin: 0;
      }
    }
  }
`;

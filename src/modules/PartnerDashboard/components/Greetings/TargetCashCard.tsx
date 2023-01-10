import { Loader } from '@src/shared/components';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import { TargetCashModel } from './model/targetCash.entity';
import StarLogo from './StarLogo';

type Props = {
  id: number;
};
const TargetCashCard = ({ id }: Props): ReactElement => {
  const { t } = useTranslation();
  const [data, setData] = useState<TargetCashModel>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/achievement`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: TargetCashModel }>) => {
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
        <MainContainer>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="flexContainer" style={{ flexGrow: 4, alignItems: 'center' }}>
              <StarLogo percent={data?.goal_percent ?? 100} />

              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
                <Title level={5}>{t('Dashboards.Partner.ToNextCareerStep')}</Title>
                <Title level={4}>
                  {data?.next_career_step_point} {t('Global.Point')}
                </Title>
              </div>
            </div>
            <div className="flexContainer" style={{ flexGrow: 1 }}>
              <Text style={{ color: '#8c8c8c' }}>
                {t('Global.Achieved')}: {data?.achieved} {t('Global.Point')}
              </Text>
              <Text style={{ color: '#1890ff' }}>
                {data?.goal_percent}% {t('Dashboards.Partner.OffYourGoal')}
              </Text>
            </div>
          </div>
        </MainContainer>
      )}
    </>
  );
};

export default TargetCashCard;

const MainContainer = styled.div`
  height: 100%;

  .flexContainer {
    display: flex;
    gap: 10px;
    justify-content: space-around;
  }
`;

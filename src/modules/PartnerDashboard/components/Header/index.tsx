import i18n from '@src/core/i18n/config';
import Title from 'antd/lib/typography/Title';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const PartnerDashHeader = (): ReactElement => {
  return (
    <MainContainer>
      <img src="/assets/favicon.ico" alt="Cleafin Logo" />
      <Title className="title" level={2}>
        {i18n.t('Dashboards.Partner.DashboardByPartner')}
      </Title>
    </MainContainer>
  );
};

export default PartnerDashHeader;
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  img {
    width: 35px;
  }
  .title {
    text-align: center;
    color: #de0077;
    margin: 0;
  }
`;

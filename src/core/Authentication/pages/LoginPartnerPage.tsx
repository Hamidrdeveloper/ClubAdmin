import { Col } from 'antd';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { PartnerLoginContainer } from '../containers';
import Styles from './styles/LoginPage.style';

export default function LoginPartnerPage(): ReactElement {
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    if (page === 'register') {
      navigate('/auth/register');
    } else if (page === 'forget') {
      navigate('/auth/forget-password');
    }
  };

  return (
    <Styles.MainContainer justify="center" align="middle">
      <Col lg={12} md={16} xs={22}>
        <PartnerLoginContainer onChangePage={handlePageChange} />
      </Col>
    </Styles.MainContainer>
  );
}

import { Col } from 'antd';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterContainer } from '../containers';
import Styles from './styles/LoginPage.style';

export default function RegisterPage(): ReactElement {
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    if (page === 'login') {
      // navigate('/auth/login');
    }
  };

  return (
    <Styles.MainContainer justify="center" align="middle">
      <Col lg={20} md={20} xs={22}>
        <RegisterContainer onCallback={() => navigate('/admin/dasboard')} onChangePage={handlePageChange} />
      </Col>
    </Styles.MainContainer>
  );
}

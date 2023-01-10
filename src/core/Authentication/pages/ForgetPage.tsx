import { Col } from 'antd';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgetContainer } from '../containers';
import Styles from './styles/LoginPage.style';

export default function LoginPage(): ReactElement {
  const navigate = useNavigate();

  return (
    <Styles.MainContainer justify="center" align="middle">
      <Col lg={12} md={16} xs={22}>
        <ForgetContainer onCallback={() => navigate('/')} />
      </Col>
    </Styles.MainContainer>
  );
}

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Col } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { AuthContext } from '../service/AuthProvider';
import ForgetPage from './ForgetPage';
import LegalsPage from './LegalsPage';
import LoginPage from './LoginPage';
import LoginPartnerPage from './LoginPartnerPage';
import RegisterPage from './RegisterPage';
import Styles from './styles/Index.style';

export default function LoginRoutes(): ReactElement {
  const navigate = useNavigate();
  const { isAuthenticated,isLoginOpen,setLoginOpen } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated()&&isLoginOpen) {
      navigate('/admin/dashboard');
    
    }
    setLoginOpen(false)
  }, [isLoginOpen]);
  return (
    <Styles.MainContainer>
      <Styles.LayoutSt>
        <Col xs={24} md={16} lg={10}>
          <Routes>
            <Route path={`login`} element={<LoginPage />} />
            <Route path={`login/legals`} element={<LegalsPage />} />
            <Route path={`login/partner/legals`} element={<LegalsPage />} />
            <Route path={`login/partner`} element={<LoginPartnerPage />} />
            <Route path={`login/supplier`} element={<LoginPage />} />
            <Route path={`register`} element={<RegisterPage />} />
            <Route path={`forget-password`} element={<ForgetPage />} />
          </Routes>
        </Col>

        <Styles.MainBackground md={8} lg={14}>
          <div className="inner-background">
            <div className="content-container">
              <div className="subtitle">
                <p>
                 Club Admin!<br/><br/> 
                </p>
              </div>
            </div>
          </div>
        </Styles.MainBackground>
      </Styles.LayoutSt>
    </Styles.MainContainer>
  );
}

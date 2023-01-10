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
import './core/i18n/config';

import GlobalStyle from '@core/Configs/ConfigureGlobalStyle';
import { ConfigProvider } from 'antd';
import deDE from 'antd/lib/locale/de_DE';
import enUS from 'antd/lib/locale/en_US';
import React, { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AuthContext, adminTheme } from './core';
import DataLegalPage from './core/Authentication/pages/DataLegalPage';
import i18n from './core/i18n/config';
import { Loader } from './shared/components';

const AdminRoutes = React.lazy(() => import('./modules/Router'));
const AuthPages = React.lazy(() => import('./core/Authentication/pages'));
const TwoFactorPage = React.lazy(
  () => import('./modules/TwoFactorAuthenticate/pages/TwoFactorAuthenticate.page'),
);

export const App = (): React.ReactElement => {
  const { role, isAuthenticated, onLogout } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener('LogoutUser', () => handleUserLogout(true));
    ConfigProvider.config({ theme: { primaryColor: adminTheme.colors.main } });

    return () => window.removeEventListener('LogoutUser', () => handleUserLogout(false));
  }, []);

  const handleUserLogout = (isDispatched: boolean) => {
    if (onLogout && isDispatched) onLogout();
  };

  return (
    <Suspense fallback={<Loader isFullPage />}>
      <ThemeProvider theme={adminTheme}>
        <ConfigProvider locale={i18n.language === 'en' ? enUS : deDE}>
          <BrowserRouter>
            <Routes>
              <Route path="auth/*" element={<AuthPages />} />
              <Route path={`legals/:legal_title`} element={<DataLegalPage />} />

              <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              <Route
                path="admin/*"
                element={
                  isAuthenticated() ? (
                    <AdminRoutes />
                  ) : (
                    <Navigate to={role === 'partner' ?  '/auth/login' : '/auth/login'} />
                  )
                }
              />
              {/* <Route path="auth/login/verify" element={<TwoFactorPage />} /> */}
            </Routes>
          </BrowserRouter>

          <GlobalStyle />
        </ConfigProvider>
      </ThemeProvider>
    </Suspense>
  );
};

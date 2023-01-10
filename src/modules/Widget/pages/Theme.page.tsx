import { Loader } from '@src/shared/components';
import Breadcrumb from '@src/shared/components/PageLayout/Breadcrumb/Breadcrumb';
import { Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { DefaultTheme } from 'styled-components';

import ThemeForm from '../components/ThemeForm';
import { ThemeContext } from '../model/widget.entity';
import { getAppTheme, updateAppTheme } from '../services/widget.service';

const ThemePage: React.FC = () => {
  const [theme, setTheme] = useState<ThemeContext>();
  const [isPending, setPending] = useState<boolean>(false);
  const [formPending, setFormPending] = useState<boolean>(false);
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('Widget.WebsiteTheme'),
    },
  ];

  useEffect(() => {
    setPending(true);
    getAppTheme()
      .then((theme) => {
        setTheme(theme);
        setPending(false);
      })
      .catch(() => setPending(false));
  }, []);

  const handleSubmit = (values: DefaultTheme) => {
    setFormPending(true);
    updateAppTheme({ ...theme, data: { ...theme?.data, colors: values.colors } } as ThemeContext)
      .then(() => {
        setFormPending(false);
        message.success(t('Widget.ThemeUpdated'));
      })
      .catch(() => setFormPending(false));
  };

  return (
    <div>
      <Breadcrumb routes={routes} />

      <MainContainer>
        <Header>
          <div className="title">
            <Typography.Title level={3}>{t('Widget.WebsiteTheme')}</Typography.Title>
          </div>
        </Header>

        {isPending ? (
          <Loader title={t('Widget.GettingWidgetDataLoading')} />
        ) : (
          <div className="tabs">
            <ThemeForm isPending={formPending} initialValues={theme?.data} onSubmit={handleSubmit} />
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default ThemePage;

const MainContainer = styled.div`
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;
  position: relative;
  overflow: hidden;
  min-height: 800px;

  & .tabs {
    padding: 16px;
  }
`;

const Header = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #8b8b8b;

  & .title h3 {
    margin: 0;
  }
`;

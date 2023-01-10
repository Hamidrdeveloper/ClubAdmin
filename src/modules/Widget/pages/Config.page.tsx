import { ConfigData } from '@src/modules/General/model/general.entity';
import { generalAtom } from '@src/modules/General/service/generalStore';
import Breadcrumb from '@src/shared/components/PageLayout/Breadcrumb/Breadcrumb';
import { Typography } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LogoUpsert from '../containers/LogoUpsert';
import TitleUpsert from '../containers/TitleUpsert';

const ThemePage: React.FC = () => {
  const [config] = useAtom<ConfigData>(generalAtom);
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: t('Widget.Title'),
    },
  ];

  return (
    <div>
      <Breadcrumb routes={routes} />

      <MainContainer>
        <Header>
          <div className="title">
            <Typography.Title level={3}>{t('Widget.Title')}</Typography.Title>
          </div>
        </Header>

        <div className="tabs">
          <TitleUpsert singleData={{ data: { title: config.saleSystem.website_title } }} />
        </div>

        <div className="tabs">
          <LogoUpsert
            slug="logo"
            name={t('Widget.WebsiteLogo')}
            singleData={{ file: config.saleSystem.logo }}
          />
        </div>

        <div className="tabs">
          <LogoUpsert
            slug="shop-logo"
            name={t('Widget.ShopLogo')}
            singleData={{ file: config?.saleSystem?.['shop-logo'] }}
          />
        </div>

        <div className="tabs">
          <LogoUpsert
            slug="favicon"
            name={t('Widget.WebsiteFavicon')}
            singleData={{ file: config.saleSystem.favicon }}
          />
        </div>
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

    margin-bottom: 16px;
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

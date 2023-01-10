import { Loader } from '@src/shared/components';
import Breadcrumb from '@src/shared/components/PageLayout/Breadcrumb/Breadcrumb';
import { Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import WidgetFileUpsert from '../containers/WidgetFileUpsert';
import WidgetSettingUpsert from '../containers/WidgetSettingsUpsert';
import { Widget } from '../model/widget.entity';
import { getWidgetBySlug } from '../services/widget.service';

const { TabPane } = Tabs;

type Props = { title: string; slug: string };
const WidgetPage: React.FC<Props> = ({ title, slug }) => {
  const [widget, setWidget] = useState<Widget>();
  const [isPending, setPending] = useState<boolean>(false);
  const { t } = useTranslation();
  const routes = [
    {
      path: '',
      breadcrumbName: title,
    },
  ];

  useEffect(() => {
    if (title) {
      setPending(true);
      getWidgetBySlug(slug).then((widget) => {
        setWidget(widget);
        setPending(false);
      });
    }
  }, [title]);

  return (
    <div>
      <Breadcrumb routes={routes} />

      <MainContainer>
        <Header>
          <div className="title">
            <Typography.Title level={3}>{title}</Typography.Title>
          </div>
        </Header>

        {isPending ? (
          <Loader title={t('Widget.GettingWidgetDataLoading')} />
        ) : (
          <div className="tabs">
            <Tabs defaultActiveKey="1" type="card" size="large" style={{ marginBottom: 32 }}>
              <TabPane tab={t('Widget.Settings')} key="1">
                <WidgetSettingUpsert singleData={widget} />
              </TabPane>
              <TabPane tab={t('Widget.Files')} key="2" disabled={!widget}>
                {widget && <WidgetFileUpsert widget_id={widget.id} data={widget.widgetFiles} />}
              </TabPane>
            </Tabs>
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default WidgetPage;

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

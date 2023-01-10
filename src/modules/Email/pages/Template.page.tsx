import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import { Col, Row, Tabs } from 'antd';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TemplateSideBar from '../components/TemplateSideBar';
import TemplateUpsert from '../container/TemplateUpsert';
import { EmailTemplates } from '../model/email.entity';
import { getTemplate } from '../services/email.service';
import Styles from './styles/Template.style';

const { TabPane } = Tabs;

interface TabContext {
  key: string;
  title?: string;
  content: ReactNode;
}

export default function TemplatePage(): ReactElement {
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useState('');
  const [tabs, setTabs] = useState<TabContext[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [templates, setTemplates] = useState<EmailTemplates[]>([]);

  const breadcrumbItem = [
    {
      breadcrumbName: i18n.t('Email.Title', { count: 1 }),
      path: `admin/email/*`,
    },
    {
      breadcrumbName: i18n.t('Email.Field.Template'),
      path: `admin/email/*`,
    },
  ];

  useEffect(() => {
    handleTemplates(true);
  }, []);

  const handleTemplates = (hasPending: boolean) => {
    if (hasPending) setPending(true);
    getTemplate({ per_page: 100 })
      .then((data: EmailTemplates[]) => setTemplates(data))
      .finally(() => hasPending && setPending(false));
  };

  const handleSelectTemplate = (index: string[]) => {
    const tabIndex = index[0];
    const selectedTemplate = templates.find((temp) => temp.id === Number(tabIndex));

    if (!tabs.some((tab) => tab.key === tabIndex)) {
      setTabs((prev) => [
        ...prev,
        {
          key: tabIndex,
          title: selectedTemplate?.name,
          content: <TemplateUpsert singleData={selectedTemplate} onCallback={() => handleTemplates(false)} />,
        },
      ]);
      setActiveKey(tabIndex);
    } else setActiveKey(tabIndex);
  };

  const handleEditTab = (targetKey: string, action: string) => {
    if (action === 'remove') {
      const prevDataIndex = tabs.findIndex((tab) => tab.key === targetKey);

      if (prevDataIndex > 0) {
        setActiveKey(tabs[prevDataIndex - 1].key);
      } else setActiveKey('');

      setTabs((prev) => prev.filter((tab) => tab.key !== targetKey));
    }
  };

  return (
    <div>
      <PageLayout.Breadcrumb routes={breadcrumbItem} />
      <PageLayout.Panel>
        {pending ? (
          <Loader title={t('Email.Template.Loader')} />
        ) : (
          <Styles.MainContainer>
            <Row gutter={32}>
              <Col xs={24} md={6}>
                <TemplateSideBar
                  selectedKeys={[activeKey]}
                  templates={templates}
                  onSelectMenu={handleSelectTemplate}
                />
              </Col>
              <Col xs={24} md={18} flex={1}>
                <Row>
                  <Col span={24}>
                    <Styles.TabsContainer>
                      <Tabs
                        hideAdd
                        type="editable-card"
                        onEdit={handleEditTab}
                        activeKey={activeKey}
                        style={{ overflow: 'initial' }}
                        onChange={(key) => setActiveKey(key)}
                      >
                        {tabs.map((tab) => (
                          <TabPane closable tab={tab.title} key={tab.key}>
                            {tab.content}
                          </TabPane>
                        ))}
                      </Tabs>
                    </Styles.TabsContainer>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Styles.MainContainer>
        )}
      </PageLayout.Panel>
    </div>
  );
}

import { EyeOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Language, LanguageSelect } from '@src/modules/Language';
import { Button, Col, Row, Space, Tabs, Typography, message } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getEmailPreviewForEmailTab, sendEmailPreview } from '../../controllers/email.controller';
import { OrderEmailModule } from '../../Order.module';
import { OrderEmailsModalFields, OrderModuleType } from '../..';
import OrderGeneralEmailTabUpsert from './modals/OrderGeneralEmailTabUpsert';
import { OrderGeneralEmailTab } from './OrderGeneralEmailTab';

const { Text } = Typography;
const { TabPane } = Tabs;

type Props = { orderId: number; moduleType: OrderModuleType };
export const OrderEmailTemplates = ({ orderId, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles?.find((role) => role.slug === 'partner');

  const [formSubmitPending, setFormSubmitPending] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(0);
  const [selectedLocale, setSelectedLocale] = useState<string>('de');
  const [mailPreview, setMailPreview] = useState<OrderEmailsModalFields>();
  const [isModalVisible, setModalVisible] = useState(false);

  const onModalSubmit = (body: OrderEmailsModalFields) => {
    setFormSubmitPending(true);
    sendEmailPreview(
      { ...body, template_id: selectedTemplateId, language: selectedLocale },
      orderId,
      moduleType,
    ).finally(() => {
      setFormSubmitPending(false);
      setModalVisible(false);
    });
  };

  const onViewContentTagClicked = () => {
    if (selectedTemplateId) {
      setFormSubmitPending(true);
      getEmailPreviewForEmailTab(orderId, { template_id: selectedTemplateId }, moduleType)
        .then((preview) => {
          setMailPreview(preview);
          setModalVisible(true);
        })
        .finally(() => setFormSubmitPending(false));
    } else message.error(t('Order.Email.TemplateSelectError'));
  };

  return (
    <EmailTemplatesContainer>
      <Row className="first-row">
        <Col span={12}>
          <Space>
            <Text type="secondary">{t('Order.Titles.Language')}: </Text>
            <div style={{ width: '200px', marginLeft: '8px' }}>
              <LanguageSelect
                disabled={isOrderReadOnly}
                isClearable={false}
                value={selectedLocale}
                onChange={(lang) => setSelectedLocale((lang as Language).locale)}
              />
            </div>
          </Space>
        </Col>
        <Col span={12}>
          <TagHolder>
            <Button
              disabled={isOrderReadOnly}
              icon={<EyeOutlined />}
              color="blue"
              onClick={() => onViewContentTagClicked()}
              loading={formSubmitPending}
            >
              {t('Order.Email.ViewContent')}
            </Button>
          </TagHolder>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Tabs size="small" type="card" defaultActiveKey="1">
            <TabPane forceRender tab={t('Order.Email.GeneralEmail')} key="1">
              <OrderGeneralEmailTab
                isFormPending={formSubmitPending}
                moduleType={moduleType}
                orderId={orderId}
                language={selectedLocale}
                selectedLocale={selectedLocale}
                setTemplateId={(id) => setSelectedTemplateId(id)}
              />
            </TabPane>
            <TabPane forceRender tab={t('Order.Email.MyEmail')} key="2" disabled />
            <TabPane forceRender tab={t('Order.Email.MyEmailFromOthers')} disabled key="3" />
          </Tabs>
        </Col>
      </Row>
      {!isOrderReadOnly && (
        <OrderGeneralEmailTabUpsert
          module={new OrderEmailModule()}
          onSubmit={onModalSubmit}
          visible={isModalVisible}
          setVisible={(isV) => setModalVisible(isV)}
          isPending={formSubmitPending}
          initialValues={mailPreview}
        />
      )}
    </EmailTemplatesContainer>
  );
};

const EmailTemplatesContainer = styled.div`
  padding: 16px;
  box-shadow: 0 0 10px #eaece4;
  width: 100%;

  & .first-row {
    margin-bottom: 12px;
  }

  & .ant-space {
    width: 100%;
    gap: 0px !important;
    border-radius: 5px;
  }

  & .ant-radio-group {
    padding: 8px;
    width: 100%;

    & .ant-radio-wrapper {
      padding: 8px;
      margin: 8px;
      width: 100%;
      background-color: #e5e7e9;
    }
  }
`;
const TagHolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    cursor: pointer;
  }
`;

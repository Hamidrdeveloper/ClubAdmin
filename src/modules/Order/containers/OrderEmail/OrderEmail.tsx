import { Loader } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { OrderModuleType } from '../../model/order.entity';
import { OrderEmailSentMails } from './OrderEmailSentMails';
import { OrderEmailTemplates } from './OrderEmailTemplates';

const { TabPane } = Tabs;

type Props = { orderId: number | null; moduleType: OrderModuleType };
const OrderEmail = ({ orderId, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  if (!orderId) return <Loader title={t('Order.Email.Loader')} />;

  return (
    <MainContainer>
      <Tabs type="card" defaultActiveKey="1" destroyInactiveTabPane>
        <TabPane tab={t('Order.Email.Templates')} key="1">
          <OrderEmailTemplates orderId={orderId} moduleType={moduleType} />
        </TabPane>
        <TabPane tab={t('Order.Email.SentEmails')} key="2">
          <OrderEmailSentMails orderId={orderId} moduleType={moduleType} />
        </TabPane>
      </Tabs>
    </MainContainer>
  );
};

export default OrderEmail;

const MainContainer = styled.div`
  margin: 16px;
`;

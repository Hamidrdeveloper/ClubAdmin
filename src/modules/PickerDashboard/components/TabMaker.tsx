import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

function TabMaker({
  data,
  sendKey,
  children,
}: {
  data: { id: number; title: string }[];
  sendKey: string;
  children: ReactElement;
}): JSX.Element {
  const { t } = useTranslation();
  return (
    <TabsContainer>
      <Tabs type="card">
        <Tabs.TabPane tab={t('PickerDashboard.All')} key="all">
          {React.cloneElement(children, { [sendKey]: -1 })}
        </Tabs.TabPane>
        {data.map(({ title, id }) => (
          <Tabs.TabPane tab={<span style={{ fontSize: '28px' }}>{title}</span>} key={id}>
            {React.cloneElement(children, { [sendKey]: id })}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </TabsContainer>
  );
}

export default TabMaker;

const TabsContainer = styled.div`
  .ant-tabs-tab-active {
    background: #1890ff;
    color: #fff;
  }
`;

import { InfoCircleFilled, LinkOutlined } from '@ant-design/icons';
import { DetailColumnTypes } from '@src/shared/models';
import { Col, Row, Spin, Tabs, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { usePageLayout } from '../PageLayoutPanel';
import Styles from './DetailContainer.style';

export default function DetailContainer<T>({
  data,
  columns,
  isPending,
}: {
  data?: T;
  isPending: boolean;
  columns?: DetailColumnTypes[];
}): ReactElement {
  const { t } = useTranslation();

  const { isDetailVisible } = usePageLayout();

  const getColumnKey = (key: string[] | (string | number)[], data?: T) => {
    if (!data) return '';

    let value: string | number | boolean = -1;

    key.forEach((subKey) => {
      if (Array.isArray(value)) {
        value = Object.assign({}, value);
      }

      if (value === -1) {
        value = data[subKey];
      } else {
        value = value ? value[subKey] : '-';
      }
    });

    return value;
  };

  const DetailValue = (data?: string | boolean | number | React.ElementType, Render?: React.FC<any>) => {
    return typeof Render !== 'function' ? (
      typeof data === 'boolean' ? (
        <Typography.Text strong>{data ? 'Yes' : 'No'}</Typography.Text>
      ) : (
        <Typography.Text strong>{data ?? '-'}</Typography.Text>
      )
    ) : (
      React.createElement(Render, { data })
    );
  };

  return (
    <Styles.DetailContainer isOpen={isDetailVisible}>
      <Styles.MainContainer>
        <Spin tip="Loading ..." spinning={isPending}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              key="1"
              tab={
                <span>
                  <InfoCircleFilled /> {t('Global.Details')}
                </span>
              }
            >
              <Styles.Details>
                <div className="header">
                  <Typography.Text strong>{t('Global.Details')}</Typography.Text>

                  <Typography.Text strong className="amount">
                    {t('Global.Amount')}
                  </Typography.Text>
                </div>

                {(columns || []).map((col, index) => (
                  <Row key={`detail-${index}`} className="content" justify="end">
                    <Col flex={1}>
                      <Typography.Text>{col.label}</Typography.Text>
                    </Col>
                    <Col flex={1} style={{ textAlign: 'end' }}>
                      {!Array.isArray(col.key)
                        ? DetailValue(data?.[col.key], col.render)
                        : DetailValue(getColumnKey(col.key, data), col.render)}
                    </Col>
                  </Row>
                ))}
              </Styles.Details>
            </Tabs.TabPane>
            <Tabs.TabPane
              disabled
              tab={
                <span>
                  <LinkOutlined /> {t('Global.Attachments')}
                </span>
              }
              key="2"
            >
              {t('Global.AttachmentTabs')}
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </Styles.MainContainer>
    </Styles.DetailContainer>
  );
}

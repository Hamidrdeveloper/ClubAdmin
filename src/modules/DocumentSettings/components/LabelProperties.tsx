import { Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import BasicProperties from './BasicProperties';

type Props = {
  dataKey: (string | number)[];
};
const LabelProperties = ({ dataKey }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <div key={dataKey.join(' ')}>
      <Row gutter={16} justify={'space-between'}>
        <Col xs={24} lg={12}>
          <Form.Item
            name={[...dataKey, 'label']}
            rules={[{ required: true }]}
            initialValue={[...dataKey, 'label'].filter((l) => !/\d+/.test(String(l))).join(' ')}
            label={t('DocumentSettings.Label')}
          >
            <Input placeholder={t('Global.InputPlaceholder', { title: t('DocumentSettings.Label') })} />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item name={[...dataKey, 'priority']} initialValue={1} label={t('DocumentSettings.Priority')}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder={t('Global.InputPlaceholder', { title: t('DocumentSettings.Priority') })}
            />
          </Form.Item>
        </Col>
      </Row>
      <BasicProperties dataKey={[...dataKey]} />
    </div>
  );
};

export default LabelProperties;

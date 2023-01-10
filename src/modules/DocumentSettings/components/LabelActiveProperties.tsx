import { Checkbox, Col, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  dataKey: (string | number)[];
};
const LabelActiveProperties = ({ dataKey }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Row gutter={16} justify={'space-around'}>
      <Col span={20}>
        <Form.Item
          name={[...dataKey, 'label']}
          rules={[{ required: true }]}
          initialValue={[...dataKey, 'label'].filter((l) => !/\d+/.test(String(l))).join(' ')}
          label={t('DocumentSettings.Label')}
        >
          <Input placeholder={t('Global.InputPlaceholder', { title: t('DocumentSettings.Label') })} />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          initialValue={false}
          label={t('Global.IsActive')}
          name={[...dataKey, 'is-active']}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default LabelActiveProperties;

import { Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import BasicProperties from './BasicProperties';
import Styles from './styles/Form.style';

type Props = {
  dataKey: (string | number)[];
};
const LabelValueProperties = ({ dataKey }: Props): ReactElement => {
  const { t } = useTranslation();
  const colSpan = 12;

  return (
    <div key={dataKey.join(' ')}>
      <Styles.FieldSet>
        <legend>{t('DocumentSettings.Label').toUpperCase()}</legend>

        <Row gutter={16} justify={'space-between'}>
          <Col xs={24} lg={colSpan}>
            <Form.Item
              name={[...dataKey, 'label', 'label']}
              rules={[{ required: true }]}
              initialValue={[...dataKey, 'label'].filter((l) => !/\d+/.test(String(l))).join(' ')}
              label={t('DocumentSettings.Label')}
            >
              <Input placeholder={t('Global.InputPlaceholder', { title: t('DocumentSettings.Label') })} />
            </Form.Item>
          </Col>

          <Col xs={24} lg={colSpan}>
            <Form.Item name={[...dataKey, 'label', 'width']} label={t('DocumentSettings.Width')}>
              <InputNumber
                addonAfter="px"
                style={{ width: '100%' }}
                placeholder={t('Global.InputPlaceholder', { title: t('DocumentSettings.Width') })}
              />
            </Form.Item>
          </Col>
        </Row>
        <BasicProperties dataKey={[...dataKey, 'label']} />
      </Styles.FieldSet>

      <Styles.FieldSet>
        <legend>{t('Global.Value').toUpperCase()}</legend>

        <BasicProperties dataKey={[...dataKey, 'value']} />
      </Styles.FieldSet>
    </div>
  );
};

export default LabelValueProperties;

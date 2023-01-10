import { Checkbox, Col, Form, InputNumber, Row, Select, Tooltip } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export const InputWithTooltip = ({
  title,
  name,
  label,
}: {
  title: string;
  name: (number | string)[];
  label?: string;
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Form.Item name={name} label={label ?? title}>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          addonAfter="px"
          placeholder={t('Global.InputPlaceholder', { title })}
        />
      </Form.Item>
    </Tooltip>
  );
};
const BasicProperties = ({ dataKey }: { dataKey: (string | number)[] }): ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <Row gutter={16} justify={'space-between'}>
        <Col xs={24} sm={12} lg={6}>
          <InputWithTooltip name={[...dataKey, 'margin-top']} title={t('DocumentSettings.MarginTop')} />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <InputWithTooltip name={[...dataKey, 'margin-left']} title={t('DocumentSettings.MarginLeft')} />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <InputWithTooltip name={[...dataKey, 'margin-right']} title={t('DocumentSettings.MarginRight')} />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <InputWithTooltip name={[...dataKey, 'margin-bottom']} title={t('DocumentSettings.MarginBottom')} />
        </Col>
      </Row>
      <Row gutter={16} justify={'space-between'} align={'middle'}>
        <Col xs={24} lg={6}>
          <InputWithTooltip
            name={[...dataKey, 'font-size']}
            title={t('DocumentSettings.FontSize')}
            label={t('DocumentSettings.FontSize')}
          />
        </Col>

        <Col xs={24} lg={6}>
          <Form.Item name={[...dataKey, 'font-weight']} label={t('DocumentSettings.FontWeight')}>
            <Select
              placeholder={t('Global.SelectPlaceholder', { title: t('DocumentSettings.FontWeight') })}
              options={[
                { label: t('DocumentSettings.Bold'), value: 'bold' },
                {
                  label: t('DocumentSettings.Normal'),
                  value: 'normal',
                },
                {
                  label: t('DocumentSettings.Bolder'),
                  value: 'bolder',
                },
                {
                  label: t('DocumentSettings.Lighter'),
                  value: 'lighter',
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} lg={6}>
          <Form.Item name={[...dataKey, 'text-align']} label={t('DocumentSettings.TextAlign')}>
            <Select
              placeholder={t('Global.SelectPlaceholder', { title: t('DocumentSettings.TextAlign') })}
              options={[
                { label: t('DocumentSettings.Left'), value: 'left' },
                {
                  label: t('DocumentSettings.Center'),
                  value: 'center',
                },
                {
                  label: t('DocumentSettings.Right'),
                  value: 'right',
                },
                {
                  label: t('DocumentSettings.Justify'),
                  value: 'justify',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={6}>
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
    </>
  );
};

export default BasicProperties;

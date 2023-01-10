import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Space } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { VatArrayInputProps } from './VatArrayInput.entity';
import Styles from './VatInput.style';

export default function VatArrayInput({ name, title }: VatArrayInputProps): ReactElement {
  const { t } = useTranslation();

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.length === 0 ? (
            <Button block type="dashed" onClick={() => add()}>
              {t('Global.CreateTitle', { title: t('Global.Vat', { title: `${title}` }) })}
            </Button>
          ) : (
            fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
              <Styles.VatInputContainer key={key}>
                <Row gutter={[8, 8]} style={{ flex: 1 }}>
                  <Col flex="1">
                    <Form.Item
                      {...restField}
                      name={[name, 'number']}
                      label={t('Global.VatNumber')}
                      fieldKey={[fieldKey, 'number']}
                      rules={[{ required: true, message: `Vat Number is required` }]}
                    >
                      <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.VatNumber') })} />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      label={t('Global.VatValue')}
                      fieldKey={[fieldKey, 'value']}
                      rules={[{ required: true, message: `Vat Value is required ` }]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        placeholder={t('Global.InputPlaceholder', { title: t('Global.VatValue') })}
                      />
                    </Form.Item>
                  </Col>
                  <Col flex="1">
                    <Form.Item
                      {...restField}
                      name={[name, 'valid_from']}
                      label={t('Global.VatFrom')}
                      fieldKey={[fieldKey, 'valid_from']}
                      rules={[{ required: true, message: `Valid From Date is required` }]}
                    >
                      <DatePicker
                        format={intlDateFormat()}
                        placeholder={t('Global.SelectPlaceholder', { title: t('Global.VatFrom') })}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {index < 1 ? (
                  <Form.Item label=" ">
                    <Space>
                      <Button
                        ghost
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                      <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add(null, 0)} />
                    </Space>
                  </Form.Item>
                ) : (
                  <Form.Item label=" ">
                    <Button
                      ghost
                      danger
                      type="primary"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Form.Item>
                )}
              </Styles.VatInputContainer>
            ))
          )}
        </>
      )}
    </Form.List>
  );
}

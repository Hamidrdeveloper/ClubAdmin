import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CompanySelect from '@src/modules/Company/container/CompanySelect';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './NumberSeriesInput.style';

export interface NumberSeriesInputProps {
  name: string;
}

export default function NumberSeriesInput({ name }: NumberSeriesInputProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <Button block type="dashed" onClick={() => add()}>
                {t('Global.CreateTitle', { title: 'Number Series' })}
              </Button>
            ) : (
              fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
                <Styles.NumberSeriesContainer key={key}>
                  <div style={{ flex: '1' }}>
                    <Row gutter={[16, 0]} style={{ width: '100%' }}>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'starting_number']}
                          fieldKey={[fieldKey, 'starting_number']}
                          label={t('NumberSeries.Field.StartingNo')}
                        >
                          <InputNumber
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.StartingNo'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'ending_number']}
                          fieldKey={[fieldKey, 'ending_number']}
                          label={t('NumberSeries.Field.EndingNo')}
                        >
                          <InputNumber
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.EndingNo'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'increment_by_number']}
                          fieldKey={[fieldKey, 'increment_by_no']}
                          label={t('NumberSeries.Field.IncrementByNo')}
                        >
                          <InputNumber
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.IncrementByNo'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'warning_number']}
                          fieldKey={[fieldKey, 'warning_number']}
                          label={t('NumberSeries.Field.WarningNo')}
                        >
                          <Input
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.WarningNo'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'available_from']}
                          fieldKey={[fieldKey, 'available_from']}
                          label={t('NumberSeries.Field.AvailableFrom')}
                        >
                          <DatePicker
                            format={intlDateFormat()}
                            mode="date"
                            placeholder={t('Global.SelectPlaceholder', {
                              title: t('NumberSeries.Field.AvailableFrom'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'last_number']}
                          fieldKey={[fieldKey, 'last_number']}
                          label={t('NumberSeries.Field.LastNumber')}
                        >
                          <InputNumber
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.LastNumber'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col xl={12}>
                        <Form.Item
                          rules={[{ required: true }]}
                          {...restField}
                          name={[name, 'prefix']}
                          fieldKey={[fieldKey, 'prefix']}
                          label={t('NumberSeries.Field.Prefix')}
                        >
                          <Input
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('NumberSeries.Field.Prefix'),
                            })}
                          />
                        </Form.Item>
                      </Col>

                      <Col xl={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'company']}
                          fieldKey={[fieldKey, 'company']}
                          label={t('NumberSeries.Field.Company')}
                        >
                          <CompanySelect />
                        </Form.Item>
                      </Col>

                      <Col xl={12}>
                        <Row style={{ marginTop: '30px' }}>
                          <Col xl={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'allow_gaps']}
                              fieldKey={[fieldKey, 'allow_gaps']}
                              valuePropName="checked"
                              initialValue={false}
                            >
                              <Checkbox>{t('NumberSeries.Field.AllowGaps')}</Checkbox>
                            </Form.Item>
                          </Col>
                          <Col xl={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'is_default']}
                              fieldKey={[fieldKey, 'is_default']}
                              valuePropName="checked"
                              initialValue={false}
                            >
                              <Checkbox>{t('Global.IsDefault')}</Checkbox>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <Row align="bottom">
                    {index < 1 ? (
                      <Row justify="end" gutter={8}>
                        <Col>
                          <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add(null, 0)} />
                        </Col>

                        {fields.length > 1 && (
                          <Col>
                            <Button
                              ghost
                              danger
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        )}
                      </Row>
                    ) : (
                      <Button
                        ghost
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Row>
                </Styles.NumberSeriesContainer>
              ))
            )}
          </>
        )}
      </Form.List>
    </div>
  );
}

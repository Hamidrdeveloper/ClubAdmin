import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CountrySelect } from '@src/modules/Country';
import { CurrencySelect } from '@src/modules/Currency';
import { PriceTypeSelect } from '@src/modules/PriceType';
import { UserSelect } from '@src/modules/User';
import { EmptyCreate } from '@src/shared/components';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Col, DatePicker, Form, InputNumber, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import FormStyles from './styles/Form.style';

export default function VariationUserPriceForm(): ReactElement {
  const { t } = useTranslation();

  const makePlaceholder = (title: string) => t('Global.InputPlaceholder', { title });

  return (
    <Form.List name="userVariationPrices">
      {(fields, { add, remove }) => (
        <>
          {fields.length === 0 ? (
            <EmptyCreate title={t('Product.Variation.NoUserPriceMsg')} onClick={() => add(null, 0)} />
          ) : (
            fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
              <FormStyles.FieldListDivider key={key}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'user']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'user']}
                      label={t('Product.Variation.UserPrice.User')}
                    >
                      <UserSelect />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'price', 'currency']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'price', 'currency']}
                      label={t('Product.Variation.UserPrice.Currency')}
                    >
                      <CurrencySelect />
                    </Form.Item>
                  </Col>

                  {/* We Changed into single select without changing backend structure -- @Rahimi Asked */}
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'price', 'countries']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'price', 'countries']}
                      label={t('Product.Variation.UserPrice.Countries')}
                    >
                      <CountrySelect />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'price', 'priceType']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'price', 'priceType']}
                      label={t('Product.Variation.UserPrice.PriceType')}
                    >
                      <PriceTypeSelect />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'price', 'unit_price']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'price', 'unit_price']}
                      label={t('Product.Variation.UserPrice.UnitPrice')}
                    >
                      <InputNumber
                        min={0}
                        placeholder={makePlaceholder(t('Product.Variation.UserPrice.UnitPrice'))}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'value']}
                      label={t('Product.Variation.UserPrice.Value')}
                    >
                      <InputNumber
                        min={0}
                        placeholder={makePlaceholder(t('Product.Variation.UserPrice.Value'))}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      rules={[{ required: true }]}
                      name={[name, 'available_from']}
                      fieldKey={[fieldKey, 'available_from']}
                      label={t('Product.Variation.UserPrice.AvailableFrom')}
                    >
                      <DatePicker
                        format={intlDateFormat()}
                        placeholder={makePlaceholder(t('Product.Variation.UserPrice.AvailableFrom'))}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      hidden
                      initialValue={1}
                      name={[name, 'minimum_quantity']}
                      fieldKey={[fieldKey, 'minimum_quantity']}
                      label={t('Product.Variation.UserPrice.MinimumQuantity')}
                    >
                      <InputNumber
                        min={0}
                        placeholder={makePlaceholder(t('Product.Variation.UserPrice.MinimumQuantity'))}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12} style={{ alignSelf: 'end' }}>
                    <Form.Item {...restField} name={[name, 'buy_with_vat']} valuePropName="checked">
                      <Checkbox>{t('Product.Variation.UserPrice.BuyWithVAT')}</Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="end" gutter={8}>
                  {index === 0 && (
                    <Col>
                      <Button ghost type="primary" onClick={() => add(null, 0)} icon={<PlusOutlined />} />
                    </Col>
                  )}

                  <Col>
                    <Button
                      ghost
                      danger
                      type="primary"
                      onClick={() => remove(name)}
                      icon={<MinusOutlined />}
                    />
                  </Col>
                </Row>
              </FormStyles.FieldListDivider>
            ))
          )}
        </>
      )}
    </Form.List>
  );
}

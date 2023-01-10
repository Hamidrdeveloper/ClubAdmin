import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CountrySelect } from '@src/modules/Country';
import { CurrencySelect } from '@src/modules/Currency';
import { PriceTypeSelect } from '@src/modules/PriceType';
import { EmptyCreate } from '@src/shared/components';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Form, InputNumber, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import FormStyles from './styles/Form.style';

type Props = {
  NETCalcFunc: (name: number) => void;
  grossCalcFunc: (name: number) => void;
};

const VariationPriceForm: React.FC<Props> = ({ NETCalcFunc, grossCalcFunc }) => {
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  const makePlaceholder = (title: string) => t('Global.InputPlaceholder', { title });

  return (
    <Form.List name="productVariationPrices">
      {(fields, { add, remove }) => (
        <>
          {fields.length === 0 ? (
            <EmptyCreate title={t('Product.Variation.NoPriceMsg')} onClick={() => add(null, 0)} />
          ) : (
            fields.map(({ key, name, fieldKey, ...restField }, index: number) => {
              return (
                <FormStyles.FieldListDivider key={key}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'price', 'currency']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'price', 'currency']}
                        label={t('Currency.Title')}
                      >
                        <CurrencySelect />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'price', 'priceType']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'price', 'priceType']}
                        label={t('PriceType.Title')}
                      >
                        <PriceTypeSelect />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'value']}
                        label={t('Product.Variation.Prices.ValueNET')}
                      >
                        <InputNumber
                          min={0}
                          precision={2}
                          onChange={() => grossCalcFunc(name)}
                          placeholder={makePlaceholder(t('Global.Value'))}
                        />
                      </FormItem>
                    </Col>

                    {/* We Changed into single select without changing backend structure -- @Rahimi Asked */}
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'price', 'countries']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'price', 'countries']}
                        label={t('Country.Title')}
                      >
                        <CountrySelect onChange={() => grossCalcFunc(name)} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        rules={[{ type: 'number', min: 1 }]}
                        name={[name, 'price', 'unit_price']}
                        fieldKey={[fieldKey, 'price', 'unit_price']}
                        label={t('Product.Variation.Prices.PricesUnit')}
                      >
                        <InputNumber
                          placeholder={makePlaceholder(t('Product.Variation.Prices.PricesUnit'))}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        {...restField}
                        name={[name, 'gross']}
                        fieldKey={[fieldKey, 'gross']}
                        label={t('Product.Variation.Prices.GrossPrice')}
                      >
                        <InputNumber
                          precision={2}
                          onChange={() => NETCalcFunc(name)}
                          placeholder={makePlaceholder(t('Product.Variation.Prices.GrossPrice'))}
                        />
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        {...restField}
                        rules={[{ required: true }]}
                        name={[name, 'available_from']}
                        fieldKey={[fieldKey, 'available_from']}
                        label={t('Product.Variation.Prices.AvailableFrom')}
                      >
                        <DatePicker
                          format={intlDateFormat()}
                          placeholder={makePlaceholder(t('Product.Variation.Prices.AvailableFrom'))}
                        />
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        {...restField}
                        hidden
                        initialValue={1}
                        name={[name, 'minimum_quantity']}
                        fieldKey={[fieldKey, 'minimum_quantity']}
                        label={t('Product.Variation.Prices.MinimumQuantity')}
                        rules={[{ type: 'number', min: 1 }]}
                      >
                        <InputNumber
                          placeholder={makePlaceholder(t('Product.Variation.Prices.MinimumQuantity'))}
                        />
                      </FormItem>
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
              );
            })
          )}
        </>
      )}
    </Form.List>
  );
};

export default VariationPriceForm;

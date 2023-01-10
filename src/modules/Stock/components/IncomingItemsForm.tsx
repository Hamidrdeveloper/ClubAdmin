/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { SettingFilled } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Currency, CurrencySelect } from '@src/modules/Currency';
import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { SupplierSelect } from '@src/modules/Supplier';
import { FormSubmit, Loader, Upload } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import {
  Alert,
  Select as AntdSelect,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
} from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, Suspense, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import StorageVariationAsyncSelect from '../containers/StorageVariationAsyncSelect';
import { IncomingItems } from '../model/incomingItems';
import { warehouseIdAtom } from '../pages/StockManage.page';
import FormStyle from './styles/Form.style';

interface FormProps {
  isPending: boolean;
  hasVariation: boolean;
  onSubmit: ({ data, form }: { data: IncomingItems; form: FormInstance }) => void;
}
const IncomingItemsForm = ({ onSubmit, isPending, hasVariation }: FormProps): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [warehouseId] = useAtom(warehouseIdAtom);

  const ctx = useContext(AuthContext);
  useEffect(() => {
    const defaultCurrency = ctx.profile?.country?.currency;
    currencyChangeHandler(defaultCurrency);
  }, [ctx]);

  const currencyChangeHandler = (option: Currency) => {
    const fieldValues: IncomingItems = form.getFieldsValue();
    const { items, ...restValues } = fieldValues;
    const { ...restItems } = items[0];

    const fieldsValueResult: IncomingItems = {
      items: [{ ...restItems, exchange_rate: option?.ratio, currency: option }],
      ...restValues,
    };

    form.setFieldsValue(fieldsValueResult);
  };

  const onFormFinishHandler = (data: IncomingItems) => {
    onSubmit?.({ data, form });
  };

  return (
    <CustomStyle>
      <FormStyle.Container
        form={form}
        colspace={8}
        colon={false}
        labelAlign="left"
        layout="horizontal"
        onFinish={onFormFinishHandler}
        name="stock-incoming-items"
        labelCol={{ xs: { span: 8 } }}
        wrapperCol={{ xs: { span: 16 } }}
        initialValues={{
          items: [{ exchange_rate: 1 }],
        }}
      >
        <Suspense fallback={<Loader />}>
          <Row justify="space-between">
            <Col xs={24} lg={12} className="leftCol">
              <div className="box-container">
                {warehouseId && (
                  <Alert message={`${t('Stock.Setting.WarehouseId')} : ${warehouseId} `} type="info" />
                )}

                <Suspense fallback={FallbackSelect(t('Stock.IncomingItems.StorageVariation'))}>
                  <Form.Item
                    label={t('Stock.IncomingItems.StorageVariation')}
                    name={['items', 0, 'storage_variation']}
                    rules={[{ required: true }]}
                  >
                    <StorageVariationAsyncSelect hasNew={!!warehouseId} />
                  </Form.Item>
                </Suspense>

                {/* If it has a variationId or variation it means the form is running from Product Variation Tabs */}
                {!hasVariation && (
                  <Form.Item
                    label={t('Stock.IncomingItems.ProductVariation')}
                    name={['items', 0, 'product_variation']}
                    rules={[{ required: true }]}
                  >
                    <VariationSelect />
                  </Form.Item>
                )}

                <Form.Item label={t('Stock.IncomingItems.DeliveryDate')} name="delivery_date">
                  <DatePicker
                    format={intlDateFormat()}
                    placeholder={t('Global.SelectPlaceholder', {
                      title: t('Stock.IncomingItems.DeliveryDate'),
                    })}
                  />
                </Form.Item>

                <Form.Item
                  label={t('Stock.IncomingItems.DeliveryNote')}
                  name="description"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder={t('Global.InputPlaceholder', {
                      title: t('Stock.IncomingItems.DeliveryNote'),
                    })}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.IncomingItems.UploadDeliveryNote')} name="file">
                  <Upload form={form} />
                </Form.Item>
                <Form.Item hidden name="file_id">
                  <></>
                </Form.Item>

                <Suspense fallback={FallbackSelect(t('Stock.IncomingItems.Supplier'))}>
                  <Form.Item label={t('Stock.IncomingItems.Supplier')} name={['items', 0, 'supplier']}>
                    <SupplierSelect isClearable />
                  </Form.Item>
                </Suspense>
              </div>
            </Col>

            <Col xs={24} lg={12} className="rightCol">
              <div className="box-container">
                <Form.Item label={t('Stock.IncomingItems.Reason')} name="reason" rules={[{ required: true }]}>
                  <AntdSelect
                    showSearch
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.IncomingItems.Reason') })}
                    options={[
                      { label: 'Incoming', value: 'Incoming' },
                      { label: 'Stock correction', value: 'Stock correction' },
                      {
                        label: 'Correction Stock Taking',
                        value: 'Stock correction because of stocktaking',
                      },
                      {
                        label: 'Correction manufacturer error',
                        value: 'Stock correction because of manufacturer error',
                      },
                      {
                        label: 'Correction maculature',
                        value: 'Stock correction because of maculature',
                      },
                      {
                        label: 'Correction packing error',
                        value: 'Stock correction because of packing error',
                      },
                      {
                        label: 'Correction damage',
                        value: 'Stock correction because of damage',
                      },
                      {
                        label: 'Correction (internal offset)',
                        value: 'Stock correction (internal offset)',
                      },
                      {
                        label: 'Correction BBD',
                        value: 'Stock correction because of BBD',
                      },
                      {
                        label: 'Correction shipping items to FBA',
                        value: 'Stock correction because of shipping items to FBA',
                      },
                      {
                        label: 'Correction shipping items to fulfilment service provider',
                        value: 'Stock correction because of shipping items to fulfilment service provider',
                      },
                      {
                        label: 'Correction sample for interested parties',
                        value: 'Stock correction because of sample for interested parties',
                      },
                      {
                        label: 'Correction sample for customers',
                        value: 'Stock correction because of sample for customers',
                      },
                      {
                        label: 'Correction sample',
                        value: 'Stock correction because of sample',
                      },
                      {
                        label: 'Correction cause quality models are booked in',
                        value: 'Stock correction because quality models are booked in',
                      },
                      {
                        label: 'Correction cause quality models are booked out',
                        value: 'Stock correction because quality models are booked out',
                      },
                      {
                        label: 'Correction gift',
                        value: 'Stock correction because of gift',
                      },
                      {
                        label: 'Correction malfunction (without return)',
                        value: 'Stock correction because of malfunction (without return)',
                      },
                      {
                        label: 'Correction loss',
                        value: 'Correct stock because of loss',
                      },
                      {
                        label: 'Correction own use',
                        value: 'Stock correction because of own use',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label={t('Stock.IncomingItems.Quantity')}
                  name={['items', 0, 'quantity']}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.IncomingItems.Quantity') })}
                    min={0}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.IncomingItems.EXP')} name={['items', 0, 'expire_date']}>
                  <DatePicker
                    format={intlDateFormat()}
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.IncomingItems.EXP') })}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.IncomingItems.Batch')} name={['items', 0, 'batch']}>
                  <Input
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.IncomingItems.Batch') })}
                  />
                </Form.Item>

                <Suspense fallback={FallbackSelect(t('Stock.IncomingItems.Currency'))}>
                  <Form.Item
                    label={t('Stock.IncomingItems.Currency')}
                    name={['items', 0, 'currency']}
                    rules={[{ required: true }]}
                  >
                    <CurrencySelect fetchAll menuPlacement="top" onChange={currencyChangeHandler} />
                  </Form.Item>
                </Suspense>

                <Form.Item
                  label={t('Stock.IncomingItems.ExchangeRate')}
                  name={['items', 0, 'exchange_rate']}
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    placeholder={t('Global.InputPlaceholder', {
                      title: t('Stock.IncomingItems.ExchangeRate'),
                    })}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  label={t('Stock.IncomingItems.PurchasePrice')}
                  name={['items', 0, 'purchase_price']}
                >
                  <InputNumber
                    placeholder={t('Global.InputPlaceholder', {
                      title: t('Stock.IncomingItems.PurchasePrice'),
                    })}
                    min={0}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <FormSubmit
            isPending={isPending}
            title={t('Stock.IncomingItems.BookIncomingItems')}
            // TODO: change Icon
            icon={<SettingFilled />}
          />
        </Suspense>
      </FormStyle.Container>
    </CustomStyle>
  );
};

export default IncomingItemsForm;

const CustomStyle = styled.div`
  .vatInput {
    display: flex;
    justify-content: space-between;
  }
`;

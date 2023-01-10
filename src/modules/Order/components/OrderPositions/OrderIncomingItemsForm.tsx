/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SettingFilled } from '@ant-design/icons';
import { IncomingItems } from '@modules/Stock/model/incomingItems';
import { warehouseIdAtom } from '@modules/Stock/pages/StockManage.page';
import { AuthContext } from '@src/core';
import { Currency, CurrencySelect } from '@src/modules/Currency';
import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { SupplierSelect } from '@src/modules/Supplier';
import { FormSubmit, Loader, Upload } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Alert, Select as AntdSelect, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, Suspense, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface FormProps {
  isPending: boolean;
  hasVariation: boolean;
  onSubmit: ({ data: IncomingItems, form: Form }) => void;
}

const OrderIncomingItemsForm = ({ onSubmit, isPending, hasVariation }: FormProps): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [warehouseId] = useAtom(warehouseIdAtom);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    const defaultCurrency = ctx.profile.country.currency;
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
      <Container
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
                    <SupplierSelect />
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
                      { label: t('Order.Purchase.Incoming'), value: 'Incoming' },
                      { label: t('Order.Purchase.StockCorrection'), value: 'Stock correction' },
                      {
                        label: t('Order.Purchase.CorrectionStocktaking'),
                        value: 'Stock correction because of stocktaking',
                      },
                      {
                        label: t('Order.Purchase.CorrectionManufacturerError'),
                        value: 'Stock correction because of manufacturer error',
                      },
                      {
                        label: t('Order.Purchase.CorrectionMaculature'),
                        value: 'Stock correction because of maculature',
                      },
                      {
                        label: t('Order.Purchase.CorrectionPackingError'),
                        value: 'Stock correction because of packing error',
                      },
                      {
                        label: t('Order.Purchase.CorrectionDamage'),
                        value: 'Stock correction because of damage',
                      },
                      {
                        label: t('Order.Purchase.CorrectionInternalOffset'),
                        value: 'Stock correction (internal offset)',
                      },
                      {
                        label: t('Order.Purchase.CorrectionBBD'),
                        value: 'Stock correction because of BBD',
                      },
                      {
                        label: t('Order.Purchase.CorrectionShippingItemsToFBA'),
                        value: 'Stock correction because of shipping items to FBA',
                      },
                      {
                        label: t('Order.Purchase.CorrectionShippingItemsToFulfilment'),
                        value: 'Stock correction because of shipping items to fulfilment service provider',
                      },
                      {
                        label: t('Order.Purchase.CorrectionSampleForInterestedParties'),
                        value: 'Stock correction because of sample for interested parties',
                      },
                      {
                        label: t('Order.Purchase.CorrectionSampleForCustomers'),
                        value: 'Stock correction because of sample for customers',
                      },
                      {
                        label: t('Order.Purchase.CorrectionSample'),
                        value: 'Stock correction because of sample',
                      },
                      {
                        label: t('Order.Purchase.CorrectionBookedIn'),
                        value: 'Stock correction because quality models are booked in',
                      },
                      {
                        label: t('Order.Purchase.CorrectionBookedOut'),
                        value: 'Stock correction because quality models are booked out',
                      },
                      {
                        label: t('Order.Purchase.CorrectionGift'),
                        value: 'Stock correction because of gift',
                      },
                      {
                        label: t('Order.Purchase.CorrectionMalfunctionWithoutReturn'),
                        value: 'Stock correction because of malfunction (without return)',
                      },
                      {
                        label: t('Order.Purchase.CorrectionLoss'),
                        value: 'Correct stock because of loss',
                      },
                      {
                        label: t('Order.Purchase.CorrectionOwnUse'),
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
      </Container>
    </CustomStyle>
  );
};

export default OrderIncomingItemsForm;

const CustomStyle = styled.div`
  .vatInput {
    display: flex;
    justify-content: space-between;
  }
`;

const Container = styled(Form)<{ colspace?: number }>`
  .ant-form-item {
    margin-bottom: 0;
    padding: 12px 12px 24px 12px;

    justify-content: space-between;

    :nth-child(even) {
      background-color: #fbfbfb;
    }
    :nth-child(odd) {
      background-color: rgb(242, 242, 242);
    }
  }

  .ant-form-item-control-input {
    height: auto;
    display: flex;
    align-items: center;
  }

  .ant-form-item-label {
    white-space: normal;
    display: flex;
    align-items: center;

    & > label {
      height: auto;
    }
  }

  /* TODO: See if we can remove these paddings */
  .leftCol {
    padding-right: ${(props) => props.colspace}px;
  }
  .rightCol {
    padding-left: ${(props) => props.colspace}px;
  }

  .header-margin {
    margin-top: 1em;
  }

  .box-container {
    padding: 20px;
    border: 1px solid #f2f2f2;
    margin: 10px;
    border-radius: 3px;
  }

  .header {
    background-color: green;
  }
`;

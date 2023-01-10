import CompanySelect from '@src/modules/Company/container/CompanySelect';
import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DocumentTypeSelect from '../container/DocumentTypeSelect';
import { DocumentSettingsModel } from '../model/DocumentSettings.entity';
import BasicProperties, { InputWithTooltip } from './BasicProperties';
import LabelActiveProperties from './LabelActiveProperties';
import LabelProperties from './LabelProperties';
import LabelValueProperties from './LabelValueProperties';
import Styles from './styles/Form.style';

export default function DocumentSettingsForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<DocumentSettingsModel>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Styles.MainContainer radius={10}>
      <Form
        form={form}
        name="document-settings-form"
        layout={'vertical'}
        onFinish={onSubmit}
        scrollToFirstError
      >
        <Form.Item required>
          <NameArrayInput />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item
              name="documentType"
              rules={[{ required: true }]}
              label={t('DocumentSettings.DocumentType')}
            >
              <DocumentTypeSelect />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="company" rules={[{ required: true }]} label={t('DocumentSettings.Company')}>
              <CompanySelect />
            </Form.Item>
          </Col>
        </Row>
        {/* ----------------- */}
        <Styles.FieldSet>
          <legend>{t('DocumentSettings.Header').toUpperCase()}</legend>
          <BasicProperties dataKey={['data', 0, 'header']} />
        </Styles.FieldSet>

        <Styles.FieldSet>
          <legend>{t('DocumentSettings.Logo').toUpperCase()}</legend>
          <InputWithTooltip title={t('DocumentSettings.Width')} name={['data', 0, 'logo', 'width']} />

          <BasicProperties dataKey={['data', 0, 'logo']} />
        </Styles.FieldSet>

        <Styles.FieldSet>
          <legend>{t('DocumentSettings.Footer').toUpperCase()}</legend>
          <BasicProperties dataKey={['data', 0, 'footer']} />
        </Styles.FieldSet>

        <Styles.FieldSet>
          <legend>{t('DocumentSettings.Body').toUpperCase()}</legend>
          <BasicProperties dataKey={['data', 0, 'body']} />
        </Styles.FieldSet>

        {/* ----------------- */}
        <Styles.FieldSet>
          <legend>{t('DocumentSettings.ExtraElements').toUpperCase()}</legend>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.InvoiceAddress').toUpperCase()}</legend>
            <LabelValueProperties dataKey={['extra_elements', 0, 'invoice_address', 0]} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.DeliveryAddress').toUpperCase()}</legend>
            <LabelValueProperties dataKey={['extra_elements', 0, 'delivery_address', 0]} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.PageNumber').toUpperCase()}</legend>
            <LabelValueProperties dataKey={['extra_elements', 0, 'page_number', 0]} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.DocumentName').toUpperCase()}</legend>
            <LabelActiveProperties dataKey={['extra_elements', 0, 'document_name']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Comment').toUpperCase()}</legend>
            <LabelValueProperties dataKey={['extra_elements', 0, 'comment', 0]} />
          </Styles.FieldSet>
        </Styles.FieldSet>

        {/* ----------------- */}
        <Styles.FieldSet>
          <legend>{t('DocumentSettings.StockUnitElements').toUpperCase()}</legend>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Position').toUpperCase()}</legend>
            <LabelProperties dataKey={['stock_unit_elements', 0, 'position']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Price').toUpperCase()}</legend>
            <LabelProperties dataKey={['stock_unit_elements', 0, 'price']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Quantity').toUpperCase()}</legend>
            <LabelProperties dataKey={['stock_unit_elements', 0, 'quantity']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.ItemID').toUpperCase()}</legend>
            <LabelProperties dataKey={['stock_unit_elements', 0, 'item_id']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.ItemName').toUpperCase()}</legend>
            <LabelProperties dataKey={['stock_unit_elements', 0, 'item_name']} />

            <Styles.FieldSet>
              <legend>{t('DocumentSettings.Header').toUpperCase()}</legend>
              <LabelProperties dataKey={['stock_unit_elements', 0, 'header']} />
            </Styles.FieldSet>

            <Styles.FieldSet>
              <legend>{t('DocumentSettings.Vat').toUpperCase()}</legend>
              <LabelProperties dataKey={['stock_unit_elements', 0, 'VAT']} />
            </Styles.FieldSet>

            <Styles.FieldSet>
              <legend>{t('DocumentSettings.Discount').toUpperCase()}</legend>
              <LabelProperties dataKey={['stock_unit_elements', 0, 'discount']} />
            </Styles.FieldSet>
          </Styles.FieldSet>
        </Styles.FieldSet>

        {/* -------------- */}
        <Styles.FieldSet>
          <legend>{t('DocumentSettings.MandatoryElements').toUpperCase()}</legend>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.OrderID').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'order_id']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('Global.Date').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'date']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.OrderOn').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'order_on']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.CustomerID').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'customer_id']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Currency').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'currency']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Referrer').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'referrer']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.CustomerClass').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'customer_class']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.VatNumber').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'vat_number']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.OwnVatNumber').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'own_vat_number']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.InvoiceNumber').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'invoice_number']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.PaymentMethod').toUpperCase()}</legend>
            <LabelProperties dataKey={['mandatory_elements', 0, 'payment_method']} />
          </Styles.FieldSet>
        </Styles.FieldSet>

        {/* ------------ */}
        <Styles.FieldSet>
          <legend>
            {
              <Form.Item
                className="checkbox-legend"
                name={['mlm_elements', 0, 'show_mlm']}
                valuePropName="checked"
              >
                <Checkbox>{t('DocumentSettings.ShowMLM')}</Checkbox>
              </Form.Item>
            }
          </legend>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Point').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'point']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.BFU').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'bfu']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.EMPVK').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'emp_vk']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Rabatt').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'rabatt']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.CareerLevelBonus').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'career_level_bonus']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.Header').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'header']} />
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('DocumentSettings.CareerLevel').toUpperCase()}</legend>
            <LabelProperties dataKey={['mlm_elements', 0, 'career_level']} />
          </Styles.FieldSet>
        </Styles.FieldSet>

        <FormSubmit isPending={isPending} />
      </Form>
    </Styles.MainContainer>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import CompanySelect from '@src/modules/Company/container/CompanySelect';
import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { PaymentMethod, PaymentMethodSelect } from '@src/modules/PaymentMethod';
import { PaymentTerm, PaymentTermSelect } from '@src/modules/PaymentTerm';
import { ShippingProfile, ShippingProfileSelect } from '@src/modules/ShippingProfile';
import { ContactGroup } from '@src/modules/Subdomain';
import ContactGroupsSelect from '@src/modules/Subdomain/containers/ContactGroupSelect';
import { Supplier, SupplierSelect } from '@src/modules/Supplier';
import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Col, DatePicker, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PurchaseForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<FormModel>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [supplier, setSupplier] = useState<Supplier>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const [paymentMethodFilters, setPaymentMethodFilters] = useState<Record<string, unknown>>({});

  const onCompanySelect = (company: CompanyModel) => {
    setPaymentMethodFilters({ company_id: company.id });

    const prevValues = form.getFieldsValue();
    form.setFieldsValue({ ...prevValues, payment_method: null });
  };

  return (
    <Form name="purchase-form" form={form} layout={'vertical'} onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="supplier" label={t('Order.Field.SupplierName')} rules={[{ required: true }]}>
            <SupplierSelect onChange={(data) => setSupplier(data as Supplier)} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Suspense fallback={FallbackSelect(t('Order.Field.Company'))}>
            <Form.Item name="company" label={t('Order.Field.Company')} rules={[{ required: true }]}>
              <CompanySelect showOnlyMainCompanies isClearable={false} onChange={onCompanySelect} />
            </Form.Item>
          </Suspense>
        </Col>

        <Col span={12}>
          <Form.Item
            name="payment_method"
            label={t('Order.Field.PaymentMethod')}
            rules={[{ required: true }]}
          >
            <PaymentMethodSelect filter={paymentMethodFilters} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="invoice_contact_group"
            label={t('Order.Field.InvoiceContactGroupAddress')}
            rules={[{ required: true }]}
          >
            <ContactGroupsSelect supplierId={supplier?.id} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="delivery_contact_group"
            label={t('Order.Field.DeliveryContactGroup')}
            rules={[{ required: true }]}
          >
            <ContactGroupsSelect />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="early_payment_discount_days"
            label={t('Order.Field.EarlyPaymentDiscountDays')}
            rules={[{ required: false }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="early_payment_discount_percentage"
            label={t('Order.Field.EarlyPaymentDiscountPercentage')}
            rules={[{ required: false }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="shipping_profile" label={t('Order.Field.ShippingProfile')}>
            <ShippingProfileSelect />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="delivery_date" label={t('Order.Field.DeliveryDate')}>
            <DatePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="estimate_payment_date" label={t('Order.Field.EstimatedPaymentDate')}>
            <DatePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="payment_term" label={t('Order.Field.PaymentTerm')}>
            <PaymentTermSelect />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="pay_date" label={t('Order.Field.PayDate')}>
            <DatePicker format={intlDateFormat()} />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}

interface FormModel {
  supplier: Supplier;
  company: CompanyModel;
  invoice_contact_group: ContactGroup;
  delivery_contact_group: ContactGroup;
  payment_method: PaymentMethod;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  payment_status: string;
  shipping_profile: ShippingProfile | null;
  delivery_date: string | null;
  estimate_payment_date: string | null;
  incoming_items: string | null;
  payment_term: PaymentTerm;
  pay_date: string | null;
}

import { DeleteOutlined } from '@ant-design/icons';
import { CountrySelect } from '@src/modules/Country';
import DeletePrompt from '@src/shared/components/DeletePrompt';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps, RequireOnlyOne } from '@src/shared/models';
import { Button, Checkbox, Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { VariationMLM } from '../model/VariationMLM.entity';

type Props = {
  effectivePrice: number;
  provisionPrice: number;
  percentageOfProvision: number;
};

function VariationMLMForm({
  onSubmit,
  onRemove,
  isPending,
  initialValues,
}: FormProps<VariationMLM> & { onRemove: () => void }): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) return;

    // calculate effective price
    const provisionPrice = initialValues.provision_price;
    const percentage = initialValues.percentage_of_provision;

    // we need to confirm that these values exist (using !)
    const effectivePrice = provisionPrice! * (percentage! / 100);

    form.setFieldsValue({ ...initialValues, effective_provision_price: effectivePrice });
  }, [initialValues]);

  const calculatePrices = ({
    provisionPrice,
    effectivePrice,
    percentageOfProvision,
  }: RequireOnlyOne<Props>): void => {
    const allFormValues = form.getFieldsValue();
    const percentage = allFormValues?.['percentage_of_provision'];

    const setEffectiveValueViaProvisionPrice = (provisionPrice: number): void => {
      const effectivePrice = provisionPrice * (percentage / 100);
      form.setFieldsValue({ ...allFormValues, effective_provision_price: effectivePrice });
    };
    const setProvisionPriceValueViaEffectivePrice = (effectivePrice: number): void => {
      const provisionPrice = (effectivePrice * 100) / percentage;
      form.setFieldsValue({ ...allFormValues, provision_price: provisionPrice });
    };

    const setEffectiveValueViaPercentageOfProvision = (percentageOfProvision: number): void => {
      const effectivePrice = allFormValues?.['provision_price'] * (percentageOfProvision / 100);
      form.setFieldsValue({ ...allFormValues, effective_provision_price: effectivePrice });
    };

    if (provisionPrice) {
      setEffectiveValueViaProvisionPrice(provisionPrice);
    } else if (effectivePrice) {
      setProvisionPriceValueViaEffectivePrice(effectivePrice);
    } else if (percentageOfProvision) {
      setEffectiveValueViaPercentageOfProvision(percentageOfProvision);
    }
  };

  return (
    <DescriptionInputContainer>
      <Form
        form={form}
        name="variation-mlm-form"
        labelAlign={'left'}
        layout={'horizontal'}
        labelCol={{ xs: { span: 8 } }}
        wrapperCol={{ xs: { span: 16 } }}
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col xs={24} xl={12}>
            <Suspense fallback={FallbackSelect(t('Product.Variation.MLM.Country'))}>
              <Form.Item
                name={'country'}
                fieldKey={'country'}
                rules={[{ required: true }]}
                label={t('Product.Variation.MLM.Country')}
              >
                <CountrySelect />
              </Form.Item>
            </Suspense>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item name={'qv'} fieldKey={'qv'} label={t('Product.Variation.MLM.QualificationPointsUP')}>
              <InputNumber precision={2} />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item
              name={'percentage_of_provision'}
              fieldKey={'percentage_of_provision'}
              label={t('Product.Variation.MLM.PercentageOfProvision')}
            >
              <InputNumber
                className="full-width"
                onChange={(percentageOfProvision) => calculatePrices({ percentageOfProvision })}
                precision={2}
                min={0}
                max={100}
                addonAfter={'%'}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item
              name={'provision_price'}
              fieldKey={'provision_price'}
              label={t('Product.Variation.MLM.ProvisionPrice')}
            >
              <InputNumber
                min={0}
                precision={2}
                onChange={(provisionPrice) => calculatePrices({ provisionPrice })}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item
              name={'effective_provision_price'}
              fieldKey={'effective_provision_price'}
              label={t('Product.Variation.MLM.EffectiveProvisionPrice')}
            >
              <InputNumber
                min={0}
                precision={2}
                onChange={(effectivePrice) => calculatePrices({ effectivePrice })}
              />
            </Form.Item>
          </Col>

          <Col xs={24} xl={6}>
            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>{t('Product.Variation.MLM.ActiveProvision')}</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} xl={6}>
            <Form.Item name="has_discount" valuePropName="checked">
              <Checkbox>{t('Product.Variation.MLM.HasDiscount')}</Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} xl={12}>
            <Form.Item name="has_organization_bonus" valuePropName="checked">
              <Checkbox>{t('Product.Variation.MLM.HasOrganizationBonusDiscountable')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button style={{ minWidth: 180 }} type="primary" htmlType="submit" loading={isPending}>
              {t('Global.Submit')}
            </Button>
          </Col>

          <Col>
            <DeletePrompt onConfirm={onRemove}>
              <Button ghost danger type="primary" icon={<DeleteOutlined />} />
            </DeletePrompt>
          </Col>
        </Row>
      </Form>
    </DescriptionInputContainer>
  );
}
export default VariationMLMForm;

const DescriptionInputContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  .full-width {
    width: 100%;
  }
`;

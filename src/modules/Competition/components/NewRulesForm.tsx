import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AsyncRuleTypeSelect from '../containers/AsyncRuleTypeSelect';
import CareerStepSelect from '../containers/CareerStepSelect';
import { RuleModel } from '../model/Rule.entity';
import { RuleTypeModel } from '../model/RulesType.entity';

interface Props {
  initialValues?: RuleModel;
  isPending: boolean;
  onSecondaryClick?: () => void;
  onSubmit: (formResetFn: () => void, data: RuleModel) => void;
}
const NewRulesForm = ({ initialValues, isPending, onSubmit }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [selectedRuleType, setSelectedRuleType] = useState(initialValues?.competitionRuleType);

  const { Item } = Form;

  const onTypeChange = (ruleType: RuleTypeModel) => {
    setSelectedRuleType(ruleType);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        translations: initialValues?.translations ?? [{ locale: undefined, description: '' }],
      });
    }
  }, [initialValues]);

  const dynamicRuleTypeInput = useMemo(() => {
    switch (selectedRuleType?.slug) {
      case 'Career Step':
        return (
          <Suspense fallback={FallbackSelect(t('Competition.Rule.AchieveCareerStep'))}>
            <Item
              name="achieveCareerStep"
              rules={[{ required: true }]}
              label={t('Competition.Rule.AchieveCareerStep')}
            >
              <CareerStepSelect />
            </Item>
          </Suspense>
        );
      case 'Ordered Products':
        return (
          <Item
            name="productVariations"
            label={t('Competition.Rule.ProductVariation')}
            rules={[{ required: true }]}
          >
            <VariationSelect isMulti menuPlacement="bottom" />
          </Item>
        );
      default:
        return (
          <Item name="min_amount" label={t('Global.Amount')} rules={[{ required: true }]}>
            <InputNumber min={0} placeholder={t('Global.InputPlaceholder', { title: t('Global.Amount') })} />
          </Item>
        );
    }
  }, [selectedRuleType]);

  return (
    <Form
      form={form}
      name="rules-form"
      layout={'vertical'}
      onFinish={onSubmit.bind(this, form.resetFields)}
      initialValues={{
        translations: initialValues?.translations ?? [{ locale: undefined, description: '' }],
      }}
    >
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Suspense fallback={FallbackSelect(t('Competition.Rule.RuleType'))}>
            <Item
              name="competitionRuleType"
              label={t('Competition.Rule.RuleType')}
              rules={[{ required: true }]}
            >
              <AsyncRuleTypeSelect onChange={onTypeChange} />
            </Item>
          </Suspense>
        </Col>
        <Col span={12}>
          <Item name="points" label={t('Competition.Rule.Point')} rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Competition.Rule.Point') })}
            />
          </Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]}>
        <Col span={12}>{dynamicRuleTypeInput}</Col>
        <Col span={12}>
          <Item name="careerSteps" label={t('SidePanel.CareerStep')}>
            <CareerStepSelect isMulti />
          </Item>
        </Col>
      </Row>

      <DescriptionArrayInput
        isDescriptionRequired={false}
        hasLocale={true}
        isTitleRequired={false}
        name={'translations'}
        inputName={'title'}
        isEditor
      />

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default NewRulesForm;

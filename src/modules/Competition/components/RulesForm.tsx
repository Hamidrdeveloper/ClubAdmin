import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { UserSelect } from '@src/modules/User';
import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AsyncRuleTypeSelect from '../containers/AsyncRuleTypeSelect';
import CareerStepSelect from '../containers/CareerStepSelect';
import { RuleModel } from '../model/Rule.entity';
import { RuleTypeModel } from '../model/RulesType.entity';

interface Props extends FormProps<RuleModel> {
  onSecondaryClick?: () => void;
}
const RulesForm = ({ initialValues, isPending, onSubmit, onSecondaryClick }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [selectedRuleType, setSelectedRuleType] = useState(initialValues?.competitionRuleType);

  const { Item } = Form;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const onTypeChange = (ruleType: RuleTypeModel) => {
    setSelectedRuleType(ruleType);
  };

  const dynamicRuleTypeInput = useMemo(() => {
    if (!selectedRuleType) return <></>;

    switch (selectedRuleType.slug) {
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
            <VariationSelect isMulti menuPlacement="top" />
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
    <Form form={form} name="rules-form" layout={'vertical'} onFinish={onSubmit}>
      <Suspense fallback={FallbackSelect(t('Competition.Rule.RuleType'))}>
        <Item name="competitionRuleType" label={t('Competition.Rule.RuleType')} rules={[{ required: true }]}>
          <AsyncRuleTypeSelect onChange={onTypeChange} />
        </Item>
      </Suspense>

      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={selectedRuleType ? 12 : 24}>
          <Item name="points" label={t('Competition.Rule.Point')} rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Competition.Rule.Point') })}
            />
          </Item>
        </Col>

        <Col span={12}>{dynamicRuleTypeInput}</Col>
      </Row>

      <Row justify="space-between" gutter={[16, 0]}>
        <Col span={12}>
          {/* NOTE: Different API Call than rules */}
          <Suspense fallback={FallbackSelect(t('Competition.Rule.BlockedUser'))}>
            <Item name="blocked_users" label={t('Competition.Rule.BlockedUser')}>
              <UserSelect isMulti menuPlacement="top" />
            </Item>
          </Suspense>
        </Col>
        <Col span={12}>
          <Item name="careerSteps" label={t('SidePanel.CareerStep')}>
            <CareerStepSelect isMulti />
          </Item>
        </Col>
      </Row>

      <FormSubmit
        isPending={isPending}
        Secondary={
          onSecondaryClick && <Button onClick={onSecondaryClick}>{t('Competition.Previous')}</Button>
        }
      />
    </Form>
  );
};

export default RulesForm;

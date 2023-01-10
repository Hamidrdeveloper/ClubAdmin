import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { FormSubmit, TextEditor } from '@src/shared/components';
import { Button, Col, Form, InputNumber, Row, Select } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RewardModel } from '../model/Reward.entity';

const { Item } = Form;

interface Props {
  initialValues?: RewardModel;
  isPending: boolean;
  onSecondaryClick?: () => void;
  onSubmit: (formResetFn: () => void, values: RewardModel) => void;
}
const RewardsForm = ({ isPending, initialValues, onSubmit, onSecondaryClick }: Props): ReactElement => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const [selectedRewardType, setSelectedRewardType] = useState(initialValues?.type ?? 'point');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        translations: initialValues?.translations ?? [{ locale: undefined, description: '' }],
      });
    }
  }, [initialValues]);

  const onTypeChange = (val: string) => {
    setSelectedRewardType(val);
  };

  return (
    <Form
      form={form}
      name="reward-form"
      layout={'vertical'}
      onFinish={onSubmit.bind(this, form.resetFields)}
      initialValues={{
        translations: [{ locale: undefined, description: '' }],
        type: selectedRewardType,
      }}
    >
      <Row gutter={[16, 0]}>
        <Col span={8}>
          <Item name="points" label={t('Competition.Reward.Points')} rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Competition.Reward.Points') })}
            />
          </Item>
        </Col>

        <Col span={8}>
          <Item name="type" label={t('Competition.Attendee.RewardType')}>
            <Select
              onChange={onTypeChange}
              options={[
                { label: t('Competition.Reward.Point'), value: 'point' },
                { label: t('Competition.Reward.ProductVariation'), value: 'product_variation' },
                { label: t('Global.Amount'), value: 'amount' },
              ]}
            />
          </Item>
        </Col>

        <Col span={8}>
          {selectedRewardType === 'product_variation' && (
            <Item
              name={'productVariations'}
              label={t('Competition.Reward.ProductVariation')}
              rules={[{ required: true }]}
            >
              <VariationSelect isMulti menuPlacement="bottom" />
            </Item>
          )}

          {(selectedRewardType === 'amount' || selectedRewardType === 'point') && (
            <Item name={'amount'} label={t('Global.Amount')} rules={[{ required: true }]}>
              <InputNumber placeholder={t('Global.InputPlaceholder', { title: t('Global.Amount') })} />
            </Item>
          )}
        </Col>
      </Row>

      <Form.List name="translations">
        {(fields) =>
          fields.map(({ name, fieldKey, ...restField }) => (
            <>
              <Item
                {...restField}
                name={[name, 'description']}
                fieldKey={[fieldKey, 'description']}
                rules={[{ required: true }]}
                label={t('Global.Description')}
              >
                <TextEditor />
              </Item>
            </>
          ))
        }
      </Form.List>

      <FormSubmit
        isPending={isPending}
        Secondary={
          onSecondaryClick && <Button onClick={onSecondaryClick}>{t('Competition.Previous')}</Button>
        }
      />
    </Form>
  );
};

export default RewardsForm;

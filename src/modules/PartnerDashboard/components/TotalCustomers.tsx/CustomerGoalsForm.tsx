import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, InputNumber } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PartnerDashboardGoalsData } from './model/customerGoals.entity';

const CustomerGoalsForm = ({
  initialValues,
  onSubmit,
  isPending,
}: FormProps<PartnerDashboardGoalsData>): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form} name="customer-goal-form" layout="vertical" onFinish={onSubmit}>
      <Form.Item name={'bfu_goal'} label={t('Dashboards.Partner.BFU_Goal')}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name={'target_cash'} label={t('Dashboards.Partner.TargetCashGoal')}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name={'orders_goal'} label={t('Dashboards.Partner.OrdersGoal')}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name={'points_goal'} label={t('Dashboards.Partner.PointsGoal')}>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name={'total_sales_goal'} label={t('Dashboards.Partner.TotalSalesGoal')}>
        <InputNumber min={0} />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default CustomerGoalsForm;

import i18n from '@src/core/i18n/config';
import { GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import CustomerGoalsForm from './CustomerGoalsForm';
import { CustomerGoalsFormCtx, PartnerDashboardGoalsData } from './model/customerGoals.entity';
import { updateCustomerGoalsService } from './service/updateCustomerGoals.service';

interface Props extends GlobalUpsertProps<PartnerDashboardGoalsData> {
  partnerId: number;
  onCallback: () => void;
}
const CustomerGoalUpdate = ({ singleData, onCallback, partnerId }: Props): ReactElement => {
  const { mutate, isLoading } = useMutation(updateCustomerGoalsService);

  const formSubmitHandler = (formValues: PartnerDashboardGoalsData) => {
    const finalValues: CustomerGoalsFormCtx = {
      data: {
        dashboard: { ...formValues },
      },
    };
    mutate(
      { partnerId, values: finalValues },
      {
        onSuccess: () => {
          onCallback?.();
        },
        onError: () => {
          message.error(i18n.t("PartnerDashboard.Couldn'tUpdateGoals"));
        },
      },
    );
  };

  return <CustomerGoalsForm initialValues={singleData} isPending={isLoading} onSubmit={formSubmitHandler} />;
};

export default CustomerGoalUpdate;

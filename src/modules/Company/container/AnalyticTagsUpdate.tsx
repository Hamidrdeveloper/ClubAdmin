import i18n from '@src/core/i18n/config';
import { AnalyticTagsForm } from '@src/modules/ShopSettings/components/AnalyticTags.form';
import { Loader } from '@src/shared/components';
import { message } from 'antd';
import React, { ReactElement } from 'react';
import { useMutation, useQuery } from 'react-query';

import { AnalyticTagsDataModel, AnalyticTagsFullModel } from '../model/analytic.entity';
import { getAnalyticTagsViaCompanyId, updateAnalyticTags } from '../services/analyticTags.service';

type Props = {
  companyId: string;
};
const UpdateAnalyticTags = ({ companyId }: Props): ReactElement => {
  const { mutate, isLoading: updateLoading } = useMutation(updateAnalyticTags);

  const { data, isFetching } = useQuery<AnalyticTagsFullModel>({
    queryKey: `get-analyticTags-companyId:${companyId}`,
    queryFn: getAnalyticTagsViaCompanyId.bind(null, companyId),
  });

  const formSubmitHandler = (formValues: AnalyticTagsDataModel[]) => {
    if (!data) return;

    const values: AnalyticTagsFullModel = {
      ...data,
      data: { ...formValues },
      company_id: +companyId,
    };

    console.log(values);
    mutate(values, {
      onSuccess: () => {
        message.success(i18n.t('Company.SuccessfullyUpdated'));
      },
    });
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <AnalyticTagsForm initialValues={data?.data} onSubmit={formSubmitHandler} isPending={updateLoading} />
      )}
    </>
  );
};

export default UpdateAnalyticTags;

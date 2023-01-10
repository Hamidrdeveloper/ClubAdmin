import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import SettingsForm from '../components/SettingsForm';
import { Widget, WidgetTranslate } from '../model/widget.entity';
import { createWidget, updateWidget } from '../services/widget.service';

const WidgetSettingUpsert = ({ singleData }: GlobalUpsertProps<Widget>): ReactElement => {
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Widget>) => {
    return id ? updateWidget(id, values) : createWidget(values);
  });

  const formSubmitHandler = (formValues: Partial<{ translate: WidgetTranslate[] }>) => {
    const values: Partial<Widget> = {
      ...singleData,
      translate: formValues.translate,
    };
    mutate({ id: singleData?.id, values });
  };

  return <SettingsForm initialValues={singleData} isPending={isLoading} onSubmit={formSubmitHandler} />;
};

export default WidgetSettingUpsert;

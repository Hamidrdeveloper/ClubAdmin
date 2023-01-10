/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import CalendarModule from '../Calendar.module';
import CalendarForm from '../components/CalendarForm';
import { Calendar, CalendarFormContext } from '../model';

const CalendarUpsert: React.FC<GlobalUpsertProps<Calendar>> = ({ onCallback, singleData }) => {
  const module = new CalendarModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CalendarFormContext>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (
    formValues: Partial<Calendar & { is_editable: boolean; is_visible: boolean }>,
  ) => {
    const { user, users, is_editable, is_visible, ...restValues } = formValues;

    const values: Partial<CalendarFormContext> = {
      ...restValues,
      user_id: user?.id,
      users: {
        is_visible,
        is_editable,
        ids: (users || []).map((user) => user.id),
      },
    };

    mutate(
      { id: singleData ? singleData.id : undefined, values },
      { onSuccess: (data) => onCallback?.(data) },
    );
  };

  return <CalendarForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CalendarUpsert;

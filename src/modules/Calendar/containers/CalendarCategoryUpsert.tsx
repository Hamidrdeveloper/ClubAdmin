/* eslint-disable @typescript-eslint/ban-types */
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
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CalendarCategoryModule from '../CalendarCategory.module';
import CalendarCategoryForm from '../components/CalendarCategoryForm';
import { CalendarCategory, CalendarCategoryPure } from '../model';

const CalendarCategoryUpsert: React.FC<GlobalUpsertProps<CalendarCategory>> = ({
  onCallback,
  singleData,
}) => {
  const module = new CalendarCategoryModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CalendarCategoryPure>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<CalendarCategoryPure>) => {
    const { translate, parent, ...restValues } = formValues;

    const values: Partial<CalendarCategoryPure> = {
      ...restValues,
      parent_id: parent ? parent.id : null,
      translate: normalizeTranslate(translate),
    };

    mutate(
      { id: singleData ? singleData.id : undefined, values },
      { onSuccess: (data) => onCallback?.(data) },
    );
  };

  return (
    <CalendarCategoryForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
};

export default CalendarCategoryUpsert;

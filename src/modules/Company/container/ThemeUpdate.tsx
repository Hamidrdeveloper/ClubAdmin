import ThemeForm from '@src/modules/Widget/components/ThemeForm';
import { Loader } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useMutation, useQuery } from 'react-query';
import { DefaultTheme } from 'styled-components';

import { CompanyThemesFullModel } from '../model/theme.entity';
import { getThemeViaCompanyId, updateThemeSettings } from '../services/theme.service';

type Props = {
  companyId: string;
};
const ThemeUpdate = ({ companyId }: Props): ReactElement => {
  console.log(companyId);
  const { mutate, isLoading } = useMutation(updateThemeSettings);

  const { data: themeData, isFetching } = useQuery<CompanyThemesFullModel>(
    ['getThemesSetting-companyId', companyId],
    getThemeViaCompanyId.bind(null, companyId),
  );

  const handleFormSubmit = (formValues: DefaultTheme) => {
    if (!themeData) return;

    const values: CompanyThemesFullModel = {
      ...themeData,
      company_id: +companyId,
      data: { ...themeData.data, ...formValues },
    };

    mutate(values);
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <ThemeForm isPending={isLoading} initialValues={themeData?.data} onSubmit={handleFormSubmit} />
      )}
    </>
  );
};

export default ThemeUpdate;

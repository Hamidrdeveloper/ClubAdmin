import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React, { FC, ReactElement } from 'react';

import CompanyModule from '../Company.module';
import { CompanyModel } from '../model/company.entity';

const AsyncCompanySelect: FC<Partial<SuperSelectProps<CompanyModel>>> = (props): ReactElement => {
  const companyModule = new CompanyModule();

  return (
    <SuperSelect
      searchParam="search"
      module={companyModule}
      optionSelector={{ label: 'name', value: 'id' }}
      {...props}
    />
  );
};

export default AsyncCompanySelect;

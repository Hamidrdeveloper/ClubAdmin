import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React, { FC, ReactElement } from 'react';

import SubdomainModule from '../Subdomain.module';
import { Subdomain } from '..';

const AsyncSubdomainSelect: FC<Partial<SuperSelectProps<Subdomain>>> = (props): ReactElement => {
  const subModule = new SubdomainModule();
  return (
    <SuperSelect
      module={subModule}
      searchParam="search"
      optionSelector={{ label: 'name', value: 'id' }}
      {...props}
    />
  );
};

export default AsyncSubdomainSelect;

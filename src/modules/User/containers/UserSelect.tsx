import { User } from '@modules/User';
import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import UsersModule from '../User.module';

const UserSelect: React.FC<Partial<SuperSelectProps<User>>> = (props) => {
  return (
    <SuperSelect
      searchParam="search"
      module={new UsersModule()}
      query={{ isActive: true }}
      optionSelector={{ label: 'person.full_name', value: 'id' }}
      getCustomLabelProperty={(option) => `[${option.id}] ${option.person.full_name} `}
      {...props}
    />
  );
};

export default UserSelect;

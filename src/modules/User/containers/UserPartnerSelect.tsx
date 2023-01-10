import { User } from '@modules/User';
import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { UserPartnerModule } from '../User.module';

const UserPartnerSelect: React.FC<Partial<SuperSelectProps<User>>> = (props) => {
  return (
    <SuperSelect
      searchParam="search"
      module={new UserPartnerModule()}
      optionSelector={{ label: 'person.full_name', value: 'id' }}
      getCustomLabelProperty={(option) => `[${option.id}] ${option.person.full_name} `}
      {...props}
    />
  );
};

export default UserPartnerSelect;

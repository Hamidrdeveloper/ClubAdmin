import { User } from '@modules/User';
import { CreateOrderUserModule } from '@src/modules/Order/Order.module';
import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

const CreateOrderUserSelect: React.FC<Partial<SuperSelectProps<User>>> = (props) => {
  return (
    <SuperSelect
      searchParam="search"
      module={new CreateOrderUserModule()}
      query={{ isActive: true }}
      optionSelector={{ label: 'person.full_name', value: 'id' }}
      getCustomLabelProperty={(option) => `[${option.id}] ${option.person.full_name} `}
      {...props}
    />
  );
};

export default CreateOrderUserSelect;

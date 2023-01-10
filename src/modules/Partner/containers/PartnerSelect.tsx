import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { Partner } from '../model/partner.entity';
import PartnerModule from '../Partner.module';

const PartnerSelect: React.FC<Partial<SuperSelectProps<Partner>>> = (props) => {
  return (
    <SuperSelect
      hasNew={false}
      searchParam="search"
      query={{ isActive: true }}
      module={new PartnerModule()}
      optionSelector={{ label: 'user.person.full_name', value: 'id' }}
      getCustomLabelProperty={(option) =>
        `[${option.id}] ${option?.user ? option?.user?.person?.full_name : option?.fullname}`
      }
      {...props}
    />
  );
};

export default PartnerSelect;

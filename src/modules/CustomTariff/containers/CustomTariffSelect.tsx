import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import CustomTariffModule from '../CustomTariff.module';
import { CustomTariff } from '../model/customTariff.entity';

const CustomTariffSelect: React.FC<Partial<SuperSelectProps<CustomTariff>>> = (props) => {
  return (
    <SuperSelect
      searchParam="search"
      module={new CustomTariffModule()}
      getCustomLabelProperty={(option) => `${option.number} - ${option.value} `}
      {...props}
    />
  );
};

export default CustomTariffSelect;

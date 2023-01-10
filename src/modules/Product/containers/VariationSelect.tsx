import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { ProductVariation } from '../model/ProductVariation.entity';
import VariationModule from '../Variation.module';

const VariationSelect: React.FC<Partial<SuperSelectProps<ProductVariation>>> = (props) => {
  return (
    <SuperSelect
      {...props}
      hasNew={false}
      searchParam={'search'}
      module={new VariationModule()}
      optionSelector={{ label: 'number-name', value: 'id' }}
    />
  );
};

export default VariationSelect;

import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { StorageVariation } from '../model/storageVariation';
import { StorageVariationModule } from '../Stock.module';

const StorageVariationSuperSelect: React.FC<
  Partial<SuperSelectProps<StorageVariation>> & { productVariationId: number }
> = (props) => {
  return (
    <SuperSelect
      hasNew={false}
      searchParam="search"
      module={new StorageVariationModule()}
      optionSelector={{ label: 'name', value: 'id' }}
      query={{ productVariationId: props.productVariationId }}
      getCustomLabelProperty={(option) => `${option.name} `}
      {...props}
    />
  );
};

export default StorageVariationSuperSelect;

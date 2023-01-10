import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React, { FC } from 'react';

import BarcodeModule from '../Barcode.module';
import { Barcode } from '../model/barcode.entity';

const BarcodeAsyncSelect: FC<Partial<SuperSelectProps<Barcode>>> = (props) => {
  return (
    <SuperSelect
      {...props}
      hasNew={false}
      searchParam={'search'}
      module={new BarcodeModule()}
      optionSelector={{ label: 'type-value', value: 'id' }}
    />
  );
};

export default BarcodeAsyncSelect;

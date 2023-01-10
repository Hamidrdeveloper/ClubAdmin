import { SuperSelect } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { NumberSeriesTypeModule } from '../NumberSeries.module';

interface NumberSeriesType {
  id: number;
  slug: string;
}

export interface NumberSeriesTypeSelectProps {
  value: NumberSeriesType;
  onChange: (data: NumberSeriesType) => void;
}

function NumberSeriesTypeSelect({ value, onChange }: Partial<NumberSeriesTypeSelectProps>): ReactElement {
  return (
    <SuperSelect
      module={new NumberSeriesTypeModule()}
      optionSelector={{ label: 'slug', value: 'id' }}
      hasNew={false}
      value={value}
      onChange={onChange}
    />
  );
}

export default NumberSeriesTypeSelect;

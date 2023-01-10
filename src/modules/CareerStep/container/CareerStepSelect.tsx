import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { CareerStep } from '../model/careerstep.entity';
import { careerStepAtom } from '../service/careerStepStore';

interface Props {
  isMulti: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value: CareerStep;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: CareerStep | CareerStep[]) => void;
}

function CareerStepSelect({
  value,
  onChange,
  maxHeight,
  isMulti = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('CareerStep.Title_other') }),
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {
  const [careerSteps] = useAtom<CareerStep[]>(careerStepAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as CareerStep[]) : (data as CareerStep));

  return (
    <Select
      isClearable
      isMulti={isMulti}
      options={careerSteps}
      isDisabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      classNamePrefix="react-select"
      value={value}
    />
  );
}

export default CareerStepSelect;

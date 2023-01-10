import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { RuleTypeModel } from '../model/RulesType.entity';
import { ruleTypeAtom } from '../service/ruleTypeStore';

interface Props {
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value: RuleTypeModel;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: RuleTypeModel) => void;
}

function RulesTypeSelect({
  value,
  onChange,
  maxHeight,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Competition.Rule.RuleType') }),
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {
  const [ruleTypes] = useAtom<RuleTypeModel[]>(ruleTypeAtom);

  const handleChange = (data: OptionTypeBase) => onChange?.(data as RuleTypeModel);

  return (
    <Select
      isClearable
      options={ruleTypes}
      isDisabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      menuPlacement={menuPlacement}
      getOptionLabel={(option) => option?.slug}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix="react-select"
      value={value}
    />
  );
}

export default RulesTypeSelect;

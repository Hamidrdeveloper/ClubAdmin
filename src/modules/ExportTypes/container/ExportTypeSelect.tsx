import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { ExportTypeModel } from '../model/ExportsTypes.entity';
import { exportTypeAtom } from '../service/ExportTypeStore';

interface Props {
  isMulti: boolean;
  loading?: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value: ExportTypeModel | ExportTypeModel[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: ExportTypeModel | ExportTypeModel[]) => void;
}

function ExportTypeSelect({
  value,
  onChange,
  maxHeight,
  loading = false,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', {
    title: i18n.t('ExportTypes.Title', { count: isMulti ? 2 : 1 }),
  }),
}: Partial<Props>): ReactElement {
  const [exportTypes] = useAtom<ExportTypeModel[]>(exportTypeAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as ExportTypeModel[]) : (data as ExportTypeModel));

  return (
    <Select
      isClearable
      isLoading={loading ? true : undefined}
      isMulti={isMulti}
      options={exportTypes}
      isDisabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => String(option?.id)}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix="react-select"
      value={value}
    />
  );
}

export default ExportTypeSelect;

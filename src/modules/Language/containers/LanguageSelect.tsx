import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import cn from 'classnames';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { OptionTypeBase } from 'react-select';
import Select from 'react-select';

import { Language } from '../model/language.entity';
import { languageAtom } from '../service/languageStore';

export interface LanguageSelectProps {
  isMulti: boolean;
  loading?: boolean;
  isClearable?: boolean;
  isGroup: boolean;
  disabled?: boolean;
  placeholder?: string;
  value: string | Language;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Language | Language[]) => void;
}

function LanguageSelect({
  isMulti,
  loading = false,
  isGroup,
  isClearable = true,
  value,
  onChange,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Language.Title') }),
  menuPlacement = 'bottom',
}: Partial<LanguageSelectProps>): ReactElement {
  const [languages] = useAtom<Language[]>(languageAtom);

  const handleChange = (data: OptionTypeBase) => onChange?.(isGroup ? data?.locale : data);

  return (
    <Select
      isClearable={isClearable}
      isLoading={loading ? true : undefined}
      isMulti={isMulti}
      options={languages}
      maxMenuHeight={250}
      isDisabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      getOptionLabel={(op) => op?.title ?? languages.find((language) => language.locale === op.locale)?.title}
      getOptionValue={(op) => op.locale}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      styles={{ menuPortal: (provided) => ({ ...provided, zIndex: 9999 }) }}
      classNamePrefix={cn('react-select', { 'group-style': isGroup })}
      value={
        isGroup
          ? languages.find((op) => String(op.locale) === String(value))
          : typeof value === 'string'
          ? languages.find((op) => String(op.locale) === String(value))
          : value
      }
    />
  );
}

export default LanguageSelect;

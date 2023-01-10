import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { DownloadCategoryModel } from '../model/DownloadCategory.entity';
import { downloadCategoryAtom } from '../service/DownloadCategory.store';

interface Props {
  isMulti: boolean;
  exceptId: number;
  loading?: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value: DownloadCategoryModel;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: DownloadCategoryModel | DownloadCategoryModel[]) => void;
}

function DownloadCategorySelect({
  value,
  onChange,
  // when we want to exclude one of options we send this parameter
  exceptId,
  maxHeight,
  isMulti = false,
  loading = false,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Download.Category.Title') }),
}: Partial<Props>): ReactElement {
  const [categories] = useAtom<DownloadCategoryModel[]>(downloadCategoryAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as DownloadCategoryModel[]) : (data as DownloadCategoryModel));

  const filteredCategories = categories.filter((cat) => cat.id !== exceptId);

  return (
    <Select
      isClearable
      value={value}
      isMulti={isMulti}
      isDisabled={disabled}
      onChange={handleChange}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      options={filteredCategories}
      menuPlacement={menuPlacement}
      classNamePrefix="react-select"
      menuPortalTarget={document.body}
      isLoading={loading ? true : undefined}
      getOptionLabel={(option) => option?.slug}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
}

export default DownloadCategorySelect;

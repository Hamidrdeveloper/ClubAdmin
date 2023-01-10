import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { DocumentTypeModel } from '../model/DocumentType.entity';
import { documentTypeAtom } from '../services/documentTypeStore';

interface Props {
  loading?: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value: DocumentTypeModel;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: DocumentTypeModel) => void;
}

function DocumentTypeSelect({
  value,
  loading = false,
  onChange,
  maxHeight,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('DocumentSettings.DocumentType') }),
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {
  const [documentTypes] = useAtom<DocumentTypeModel[]>(documentTypeAtom);

  const handleChange = (data: OptionTypeBase) => onChange?.(data as DocumentTypeModel);

  return (
    <Select
      isClearable
      isLoading={loading ? true : undefined}
      options={documentTypes}
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

export default DocumentTypeSelect;

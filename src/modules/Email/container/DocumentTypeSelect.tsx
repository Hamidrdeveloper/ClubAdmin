import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select from 'react-select';

import { EmailDocumentType } from '../model/email.entity';
import { documentTypeAtom } from '../services/emailStore';

export interface DocumentTypeSelectProps {
  isMulti: boolean;
  value: EmailDocumentType | EmailDocumentType[];
  onChange: (data: EmailDocumentType | EmailDocumentType[]) => void;
}

function DocumentTypeSelect({ value, isMulti, onChange }: Partial<DocumentTypeSelectProps>): ReactElement {
  const [documents] = useAtom(documentTypeAtom);

  const handleChange = (data: EmailDocumentType | EmailDocumentType[]) => onChange?.(data);

  return (
    <Select
      value={value}
      isMulti={isMulti}
      options={documents}
      onChange={handleChange}
      classNamePrefix="react-select"
      getOptionLabel={(op) => op['name']}
      getOptionValue={(op) => String(op['id'])}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
    />
  );
}

export default DocumentTypeSelect;

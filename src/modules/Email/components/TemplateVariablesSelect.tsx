import i18n from '@src/core/i18n/config';
import { Select } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import { variablesAtom } from '../services/emailStore';

export interface VariablesSelectProps {
  onChange: (data: string) => void;
}

function VariablesSelect({ onChange }: Partial<VariablesSelectProps>): ReactElement {
  const [variables] = useAtom(variablesAtom);

  const handleChange = (data: string) => onChange?.(data);

  return (
    <Select
      style={{ width: 250 }}
      showSearch={true}
      placeholder={i18n.t('Global.SelectVariable')}
      onChange={(value: string) => handleChange(value)}
    >
      {variables.map((variable, index) => (
        <Select.Option key={`variable-${index}`} value={variable.name}>
          {variable.label}
        </Select.Option>
      ))}
    </Select>
  );
}

export default VariablesSelect;

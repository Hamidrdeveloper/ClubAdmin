import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { EmailTemplates } from '../model/email.entity';
import { emailTemplateAtom } from '../services/emailStore';
import TemplateUpsert from './TemplateUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: EmailTemplates | EmailTemplates[] | number;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: EmailTemplates | EmailTemplates[]) => void;
}

function EmailTemplateSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [emails, update] = useAtom<EmailTemplates[], AtomWithQueryAction, Promise<void>>(emailTemplateAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as EmailTemplates[]) : (data as EmailTemplates));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={emails ?? []}
        isLoading={!emails ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) =>
          option?.name ?? option?.translate?.find((language) => language.id === option.id)?.name
        }
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={typeof value === 'number' ? emails.find((email) => email.id === value) : value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'EmailTemplates.Title'}>
        <TemplateUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default EmailTemplateSelect;

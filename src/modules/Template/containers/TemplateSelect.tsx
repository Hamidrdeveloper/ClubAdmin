import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Template } from '../model/template.entity';
import { templateAtom } from '../service/templateStore';
import TemplateUpsert from './TemplateUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Template | Template[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Template | Template[]) => void;
}

function TemplateSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [templates, update] = useAtom<Template[], AtomWithQueryAction, Promise<void>>(templateAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Template[]) : (data as Template));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={templates ?? []}
        isLoading={!templates ? true : undefined}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.title}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Template.Title'}>
        <TemplateUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default TemplateSelect;

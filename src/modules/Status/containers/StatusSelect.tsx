import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { normalizeTranslate, reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Status } from '../model/status.entity';
import { statusAtom } from '../service/statusStore';
import StatusUpsert from './StatusUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Status | Status[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Status | Status[]) => void;
}

function StatusSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [status, update] = useAtom<Status[], AtomWithQueryAction, Promise<void>>(statusAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Status[]) : (data as Status));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={status ?? []}
        isLoading={!status ? true : undefined}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) =>
          normalizeTranslate(option?.translate)[i18n.language]?.name ?? `${option?.id}. ${option?.number}`
        }
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Status.Title'}>
        <StatusUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default StatusSelect;

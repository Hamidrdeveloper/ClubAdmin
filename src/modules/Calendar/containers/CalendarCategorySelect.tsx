import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { CalendarCategory } from '../model/calendar.entity';
import { calendarCategoryAtom } from '../service/calendarCategoryStore';
import CalendarCategoryUpsert from './CalendarCategoryUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: CalendarCategory | CalendarCategory[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: CalendarCategory | CalendarCategory[]) => void;
}

function CalendarCategorySelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [categories, update] = useAtom<CalendarCategory[], AtomWithQueryAction, Promise<void>>(
    calendarCategoryAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as CalendarCategory[]) : (data as CalendarCategory));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={categories ?? []}
        isLoading={!categories ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Calendar.Category.Title'}>
        <CalendarCategoryUpsert
          onCallback={(data) => {
            if (Array.isArray(value)) {
              handleChange([...value, data]);
            } else {
              handleChange(isMulti ? [data] : data);
            }
            setVisible(false);
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default CalendarCategorySelect;

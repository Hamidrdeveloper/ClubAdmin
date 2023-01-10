import { ResponseContext } from '@src/shared/models';
import { ApiBuilder, reactSelectTheme } from '@src/shared/utils';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

interface Props {
  url: string;
  value: unknown;
  isMulti: boolean;
  onChange: (data: unknown) => void;
}

type SelectType = { value: string | number; label: string };

function makeCustomLabel(item: any): string {
  // we make combination string labels here
  // ("" ?? "something") returns ""
  if (item?.people?.first_name && item?.people?.last_name)
    return `${item?.people?.first_name} ${item?.people?.last_name}`;
  else if (item?.description && item?.due_days) return `${item?.description} - ${item?.due_days}`;
  else return '';
}

function FilterSelect({ value, url, onChange, isMulti }: Partial<Props>): ReactElement {
  const [data, setData] = useState<SelectType[]>([]);

  useEffect(() => {
    const api = new ApiBuilder(String(url));
    api.getAll({ pagination: { per_page: 500 } }).then(({ data }: ResponseContext<any[]>) => {
      setData(
        data.map((item) => {
          const globalLabel: string | undefined =
            item?.name ??
            item?.title ??
            item?.label ??
            item?.number ??
            item?.username ??
            item?.user?.username;

          return {
            value: item.id,
            label: globalLabel ?? makeCustomLabel(item),
          };
        }),
      );
    });
  }, []);

  const handleChange = (data: OptionTypeBase) => {
    onChange?.(data);
  };

  return (
    <Select
      isClearable
      key={url}
      value={value}
      isMulti={isMulti}
      options={data ?? []}
      onChange={handleChange}
      maxMenuHeight={300}
      minMenuHeight={300}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      isLoading={!data ? true : undefined}
      getOptionLabel={(option) => {
        return String(option?.label);
      }}
      getOptionValue={(option) => String(option?.value)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix="react-select"
    />
  );
}

export default FilterSelect;

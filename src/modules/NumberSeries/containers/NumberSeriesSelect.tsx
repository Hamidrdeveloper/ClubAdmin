import { reactSelectTheme } from '@src/shared/utils';
import cn from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { OptionTypeBase } from 'react-select';

import { NumberSeriesSelectPositions } from '../model/numberSeries.entity';
import NumberSeriesModule from '../NumberSeries.module';

export interface NumberSeriesSelectProps {
  isMulti: boolean;
  slug: string;
  value: number;
  isPending?: boolean;
  disabled?: boolean;
  onChange: (data?: NumberSeriesSelectPositions) => void;
  menuPlacement: 'top' | 'bottom' | 'auto';
}

function NumberSeriesSelect({
  slug,
  value,
  onChange,
  disabled = false,
  isPending: isPendingInput = undefined,
  menuPlacement = 'bottom',
}: Partial<NumberSeriesSelectProps>): ReactElement {
  const { t } = useTranslation();
  const module = new NumberSeriesModule();
  const [isPending, setPending] = useState(false);
  const [numberSeries, setNumberSeries] = useState<NumberSeriesSelectPositions[]>([]);

  const handleChange = (data: OptionTypeBase) => (data ? onChange?.(data.id) : onChange?.(undefined));

  useEffect(() => {
    setPending(true);
    module.apiService
      .request<NumberSeriesSelectPositions[]>({
        url: `number-series-positions/get-by-slug?slug=${slug}`,
        method: 'GET',
      })
      .then((data) => {
        setNumberSeries(data);
      })
      .finally(() => setPending(false));
  }, []);

  return (
    <Select
      isClearable
      value={numberSeries.find((op) => op.id === value)}
      isDisabled={disabled}
      options={numberSeries}
      menuPlacement={menuPlacement}
      onChange={handleChange}
      isLoading={isPendingInput ?? isPending}
      getOptionValue={(op) => op.id}
      getOptionLabel={(op: NumberSeriesSelectPositions) =>
        `ID: [${op?.id}]  ${op?.number_series.name} ${op?.prefix} ${op?.starting_number} - ${
          op?.ending_number ?? '∞'
        }`
      }
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix={cn('react-select')}
      placeholder={t('Global.SelectPlaceholder', { title: t('NumberSeries.Title') })}
    />
  );
}

export default NumberSeriesSelect;

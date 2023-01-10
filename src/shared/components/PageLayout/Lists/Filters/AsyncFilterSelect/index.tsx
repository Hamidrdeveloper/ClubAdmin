import { ApiBuilder, reactSelectTheme } from '@shared/utils';
import { ResponseContext } from '@src/shared/models';
import axios, { CancelTokenSource } from 'axios';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptionTypeBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';

import { AsyncFilterSelectProps, LoadOptionFunc } from './AsyncFilteSelect.entity';

export default function AsyncFilterSelect<Type>({
  url,
  value,
  title,
  query,
  isMulti,
  onChange,
  pending = false,
  isClearable = true,
  menuPlacement = 'bottom',
  maxItemsToShow = undefined,
}: AsyncFilterSelectProps): ReactElement {
  let cancelToken: CancelTokenSource;
  const { t } = useTranslation();

  const [searchParam] = useState('search');

  const loadOptions: LoadOptionFunc<Type> = async (
    inputValue: string,
    _: unknown,
    { page }: { page: number },
  ) => {
    if (typeof cancelToken != typeof undefined) cancelToken.cancel('Operation canceled due to new request.');
    cancelToken = axios.CancelToken.source();

    const fixedQueries = query ? { ...query, page } : { page };

    return new ApiBuilder(url)
      .getAll({
        cancelToken: cancelToken.token,
        params: inputValue ? { [searchParam]: inputValue, ...fixedQueries } : fixedQueries,
      })
      .then((data: ResponseContext<Type[]>) => {
        return {
          options: data.data,
          hasMore: data.data.length >= 10,
          additional: { page: inputValue ? 2 : page + 1 },
        };
      });
  };

  const getLabelProperty = (option: any): string => {
    const probableLabels = [
      'name',
      'title',
      'label',
      'number',
      'person.full_name',
      'user.person.full_name',
      'username',
      'user.username',
      'type-value',
    ];

    let value: string | undefined;
    for (const probableLabel of probableLabels) {
      value = getObjectValueByString(option, probableLabel);

      if (value) {
        break;
      }
    }

    if (!value && probableLabels.map((el) => el.includes('-'))) {
      // label might be a mixture of properties

      // probable labels that have '-' in it.
      const labelsWithDash = probableLabels.filter((labels) => labels.includes('-'));
      labelsWithDash.forEach((probableLabel) => {
        // [type, value] => option[type] - option[value]
        value = probableLabel
          .split('-')
          .map((l) => option[l])
          .join(' - ');
      });
    }

    return value ?? 'NO LABEL';
  };

  const getObjectValueByString = function (obj, str): string | undefined {
    if (!obj) return;
    if (typeof obj === 'string') return obj;

    const fields = str.split('.');

    return getObjectValueByString(obj[fields[0]], fields.slice(1).join('.'));
  };

  const handleChange = (data: OptionTypeBase) => {
    onChange?.(data);
  };

  return (
    <AsyncPaginate
      cacheOptions
      value={value}
      isMulti={isMulti}
      defaultOptions={false}
      onChange={handleChange}
      additional={{ page: 1 }}
      isClearable={isClearable}
      loadOptions={loadOptions}
      menuPlacement={menuPlacement}
      classNamePrefix="react-select"
      menuPortalTarget={document.body}
      getOptionLabel={getLabelProperty}
      getOptionValue={(op: any) => op.id}
      isLoading={pending ? true : undefined}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      placeholder={t('Global.SelectPlaceholder', { title: title })}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      maxMenuHeight={maxItemsToShow ? maxItemsToShow * 33 : undefined}
    />
  );
}

import { PlusCircleOutlined } from '@ant-design/icons';
import { ApiBuilder, reactSelectTheme } from '@shared/utils';
import { ContactGroups } from '@src/modules/User';
import AddressUpsert from '@src/modules/User/containers/AddressUpsert';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { ResponseContext } from '@src/shared/models';
import { FactoryChild, FactoryModule } from '@src/shared/models';
import { Space } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionMeta, MenuProps, OptionTypeBase, components } from 'react-select';
import { GroupTypeBase } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { LoadOptions } from 'react-select-async-paginate';

import Styles from './styles/Select.style';

export type LoadOptionFunc<Type extends OptionTypeBase> = LoadOptions<
  Type,
  GroupTypeBase<Type>,
  {
    page: number;
  }
>;

interface SuperSelect<Type> {
  value: Type;
  hasNew: boolean;
  isMulti: boolean;
  isClearable?: boolean;
  searchParam: string;
  menuPlacement?: 'top' | 'bottom';
  onChange: (data: Type | Type[]) => void;
  optionSelector: { label: string; value: string };
}

type SuperSelectProps<Type> = Partial<SuperSelect<Type>> & {
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  maxItemsToShow?: number;
  pending?: boolean;
  query?: Record<string, any>;
  title?: string;
  orderBy?: Record<string, 'ASC' | 'DESC'>;
  getCustomLabelProperty?: (item: Type) => string;
  module?: FactoryModule<Type> | FactoryChild<Type>;
};

export default function AsyncContactGroupSelect({
  loading = false,
  disabled = false,
  hasNew = true,
  isMulti,
  orderBy,
  isClearable = true,
  maxItemsToShow = undefined,
  menuPlacement = 'bottom',
  pending = false,
  query,
  searchParam = 'search',
  value: _value,
  onChange,
}: SuperSelectProps<ContactGroups>): ReactElement {
  let cancelToken: CancelTokenSource;

  const { t } = useTranslation();
  const apiService = new ApiBuilder('contact-groups', t('Global.ContactGroup'));

  const [isModalVisible, setModalVisible] = useState<'info' | 'edit' | 'none'>('none');
  const [value, setValue] = useState(_value);

  useEffect(() => {
    if (_value) {
      setValue(_value);
    }
  }, [_value]);

  const loadOptions: LoadOptionFunc<ContactGroups> = async (
    inputValue: string,
    _: unknown,
    { page }: { page: number },
  ) => {
    if (typeof cancelToken != typeof undefined) cancelToken.cancel('Operation canceled due to new request.');
    cancelToken = axios.CancelToken.source();

    const fixedQueries = query ? { ...query, page } : { page };

    return apiService
      .getAll({
        orderBy,
        cancelToken: cancelToken.token,
        params: inputValue ? { [searchParam]: inputValue, ...fixedQueries } : fixedQueries,
      })
      .then((data: ResponseContext<ContactGroups[]>) => {
        return {
          options: data.data,
          hasMore: data.data.length >= 10,
          additional: { page: inputValue ? 2 : page + 1 },
        };
      });
  };

  const makeLabel = (option: ContactGroups): string => {
    try {
      const completeAddressHTML = option.address.address_complete;
      const completeAddress = completeAddressHTML.replace(/<br>/g, ', ');

      return completeAddress;
    } catch (e) {
      return `No Title!`;
    }
  };

  const handleChange = (data: OptionTypeBase, action?: ActionMeta<OptionTypeBase>) => {
    if (action?.action === 'clear') setValue(undefined);

    onChange?.(isMulti ? (data as ContactGroups[]) : (data as ContactGroups));
  };

  const Menu: React.FC = (props: MenuProps<ContactGroups, false>) => {
    return (
      <components.Menu<ContactGroups, false> {...props}>
        <>
          {props.children}

          {hasNew && (
            <Styles.NewItemContainer>
              <Space onClick={() => setModalVisible('edit')}>
                <PlusCircleOutlined />
                <span>Add New Item</span>
              </Space>
            </Styles.NewItemContainer>
          )}
        </>
      </components.Menu>
    );
  };

  const IndicatorSeparator = () => {
    return <span style={{ width: 0 }} />;
  };

  return (
    <>
      <AsyncPaginate
        isClearable={isClearable}
        cacheOptions
        isDisabled={disabled}
        value={value}
        isMulti={isMulti}
        defaultOptions={false}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        isLoading={pending || loading ? true : undefined}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        onChange={handleChange}
        additional={{ page: 1 }}
        loadOptions={loadOptions}
        classNamePrefix="react-select"
        components={{ Menu, IndicatorSeparator }}
        getOptionLabel={makeLabel}
        maxMenuHeight={maxItemsToShow ? maxItemsToShow * 33 : undefined}
        getOptionValue={(op: ContactGroups) => String(op.id)}
        placeholder={t('Global.SelectPlaceholder', { title: t('Company.ContactGroup') })}
      />

      <SelectWrapper
        isVisible={isModalVisible === 'edit'}
        setVisible={(status) => setModalVisible(status ? 'edit' : 'none')}
        title={'Global.ContactGroup'}
      >
        <AddressUpsert
          api={async (values) => {
            apiService.createOne(values).then((createdContactGroup) => {
              setValue(createdContactGroup as unknown as ContactGroups);
              handleChange(createdContactGroup as unknown as ContactGroups);
            });
          }}
          onCallback={() => {
            setModalVisible('none');
          }}
        />
      </SelectWrapper>
    </>
  );
}

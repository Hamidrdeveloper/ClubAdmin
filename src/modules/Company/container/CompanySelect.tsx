/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';

import { CompanyModel } from '../model/company.entity';
import { companyAtom } from '../services/companyStore';
import ReferrerUpsert from '@src/modules/Referrer/containers/ReferrerUpsert';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { companyAtom } from '../services/companyStore';
import { AtomWithQueryAction } from 'jotai/query';
import CompanyUpsert from './CompanyUpsert';
import { Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  loading?: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  isClearable: boolean;
  showOnlyMainCompanies: boolean;
  value:number;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: () => void;
}

function CompanySelect({
  value,
  onChange,
  maxHeight,
  loading = false,
  isMulti = false,
  hasNew = true,
  disabled = false,
  isClearable = true,
  menuPlacement = 'bottom',
  showOnlyMainCompanies = false,
  placeholder = i18n.t('Global.SelectPlaceholder', {
    title: i18n.t('Company.Title', { count: isMulti ? 2 : 1 }),
  }),
}: Partial<Props>): ReactElement {
  const [companies] = useAtom<CompanyModel[]>(companyAtom);
  const [isVisible, setVisible] = useState(false);
  const [company, update] = useAtom<CompanyModel[], AtomWithQueryAction, Promise<void>>(companyAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as CompanyModel[]) : (data as CompanyModel));

  return (
    <>  
    {/* <Select
      isMulti={isMulti}
      isDisabled={disabled}
      onChange={handleChange}
      isClearable={isClearable}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      components={{
        Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
        IndicatorSeparator: () => <span style={{ width: 0 }} />,
      }}
      isLoading={loading ? true : undefined}
      getOptionLabel={(option) => option?.title}
      getOptionValue={(option) => String(option?.id)}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      options={showOnlyMainCompanies ? companies.filter((company) => company.is_main) : companies}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix="react-select"
      value={value}
    /> */}
     <Button type="primary" ghost  icon={<PlusOutlined />} onClick={ (props) => setVisible(true)} />
      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Lyric'}>
    <CompanyUpsert
      chantId={value}
      onCallback={() => {
        update({ type: 'refetch' });
        onChange()
      }}
    />
  </SelectWrapper>
  </>
  );
}

export default CompanySelect;

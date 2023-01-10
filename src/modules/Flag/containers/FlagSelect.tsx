/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { IconPack } from '@src/shared/components';
import { Button, Select } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Flag } from '../model/flag.entity';
import { flagAtom } from '../service/flagStore';
import { AtomWithQueryAction } from 'jotai/query';
import { PlusOutlined } from '@ant-design/icons';
import FlagUpsert from './FlagUpsert';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';

export interface FlagSelectProps {
  value: any;
  isMulti: boolean;
  disabled?: boolean;
  isPending?: boolean;
  onChange: () => void;
}

function FlagSelect({
  value,
  onChange,
  isMulti = false,
  disabled = false,
  isPending = false,
}: Partial<FlagSelectProps>): ReactElement {
  const { t } = useTranslation();
 
  const [isVisible, setVisible] = useState(false);
  const [flag, update] = useAtom<Flag[], AtomWithQueryAction, Promise<void>>(flagAtom);
  

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
      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Audio'}>
    <FlagUpsert
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

export default FlagSelect;

const FlagContainer = styled.div<{ color: string }>`
  display: flex;
  align-items: center;

  & .icon {
    font-size: 1rem;
    margin-top: 4px;
    margin-right: 8px;
    & svg {
      color: ${(props) => props.color} !important;
    }
  }
`;

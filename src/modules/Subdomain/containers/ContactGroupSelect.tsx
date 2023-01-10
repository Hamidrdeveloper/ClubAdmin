import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddressUpsert from '@src/modules/User/containers/AddressUpsert';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { ApiBuilder, reactSelectTheme } from '@src/shared/utils';
import { Modal, Tooltip } from 'antd';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { OptionTypeBase, components } from 'react-select';
import styled from 'styled-components';

import { ContactGroup } from '../model/Subdomain.entity';
import { contactGroupAtom, contactGroupSupplierId } from '../services/contactGroupStore';

interface Props {
  isMulti: boolean;
  supplierId?: number;
  hasNew?: boolean;
  disabled?: boolean;
  value: ContactGroup | ContactGroup[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: ContactGroup | ContactGroup[]) => void;
}

function ContactGroupsSelect({
  value: _value,
  hasNew = true,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  supplierId,
  onChange,
}: Partial<Props>): ReactElement {
  const [contactGroups, update] = useAtom<ContactGroup[], AtomWithQueryAction, Promise<void>>(
    contactGroupAtom,
  );
  const [, setSupplierId] = useAtom(contactGroupSupplierId);
  const [isModalVisible, setModalVisible] = useState<'info' | 'edit' | 'none'>('none');
  const [value, setValue] = useState(_value);
  const [fullAddress, setFullAddress] = useState('');
  const { t } = useTranslation();

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as ContactGroup[]) : (data as ContactGroup));

  useEffect(() => {
    if (supplierId) setSupplierId(supplierId);
    update({ type: 'refetch' });
  }, [supplierId]);

  const Control = (props) => (
    <components.Control {...props}>
      <ControlIconContainer
        disabled={!props.hasValue || !props.getValue()?.[0]?.address?.address_complete}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (props.hasValue && !!props.getValue()?.[0]?.address?.address_complete) {
            //
            setModalVisible('info');
            setFullAddress(props.getValue()?.[0]?.address?.address_complete);
          }
        }}
      >
        <Tooltip title={'Address Information'}>
          <ExclamationCircleOutlined />
        </Tooltip>
      </ControlIconContainer>{' '}
      {props.children}
    </components.Control>
  );

  const makeLabel = (option: ContactGroup) => {
    try {
      const completeAddressHTML = option.address.address_complete;
      const completeAddress = completeAddressHTML.replace(/<br>/g, ', ');

      return completeAddress;
    } catch (e) {
      return 'No Title';
    }
  };

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={contactGroups}
        isLoading={!contactGroups ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionValue={(option) => String(option.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        getOptionLabel={(option) => makeLabel(option)}
        components={{
          Control,
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setModalVisible('edit') }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <Modal
        visible={isModalVisible === 'info'}
        footer={false}
        destroyOnClose
        closable={true}
        onCancel={() => setModalVisible('none')}
      >
        <div dangerouslySetInnerHTML={{ __html: fullAddress }} />
      </Modal>

      {hasNew && (
        <SelectWrapper
          isVisible={isModalVisible === 'edit'}
          setVisible={(status) => setModalVisible(status ? 'edit' : 'none')}
          title={'Global.ContactGroup'}
        >
          <AddressUpsert
            api={async (values) => {
              await new ApiBuilder('contact-groups', t('Global.ContactGroup')).createOne(values);
              setValue(values as unknown as ContactGroup);
              handleChange(values as OptionTypeBase);
            }}
            onCallback={() => {
              update({ type: 'refetch' });
              setModalVisible('none');
            }}
          />
        </SelectWrapper>
      )}
    </>
  );
}

const ControlIconContainer = styled.span<{ disabled: boolean }>`
  margin-left: 8px;
  margin-right: 4px;
  transition: 0.3s all;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.7' : '1')};

  &:hover {
    opacity: 0.7;
  }
`;

export default ContactGroupsSelect;

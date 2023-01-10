import { PlusCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuProps, OptionTypeBase, components } from 'react-select';
import styled from 'styled-components';

export const SelectMenu: React.FC<{
  props: MenuProps<OptionTypeBase, boolean>;
  hasNew: boolean;
  onClick: () => void;
}> = ({ hasNew, props, onClick }) => {
  const { t } = useTranslation();

  return (
    <components.Menu<OptionTypeBase, boolean> {...props}>
      <>
        {props.children}

        {hasNew && (
          <NewItemContainer>
            <Space onClick={onClick}>
              <PlusCircleOutlined />
              <span>{t('Global.AddNewItem')}</span>
            </Space>
          </NewItemContainer>
        )}
      </>
    </components.Menu>
  );
};

const NewItemContainer = styled.div`
  padding: 16px;
  color: ${(props) => props.theme.colors.main};
  border-top: 1px solid ${(props) => props.theme.colors.grey};

  & .ant-space {
    cursor: pointer;
  }
`;

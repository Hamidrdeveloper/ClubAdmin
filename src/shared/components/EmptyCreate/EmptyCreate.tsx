import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import InlineSvg from '../InlineSVG/InlineSvg';

const EmptyCreate: React.FC<{ title: string; onClick?: () => void; hasIcon?: boolean }> = ({
  title,
  onClick,
  hasIcon = true,
}) => {
  const { t } = useTranslation();
  return (
    <MainContainer onClick={onClick}>
      {hasIcon && <InlineSvg src="/global/create.svg" width={50} height={50} />}
      <Typography.Title type="secondary" level={4}>
        {title}
      </Typography.Title>
      {onClick && (
        <Typography.Title type="secondary" level={5}>
          {t('Global.CreateNew')}
        </Typography.Title>
      )}
    </MainContainer>
  );
};

export default EmptyCreate;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  flex-direction: column;
  text-align: center;
  cursor: pointer;
  border: 1px dashed #cacaca;
  margin-top: 32px;

  & h4 {
    margin-top: 16px;
  }

  & h5 {
    margin: 0 !important;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

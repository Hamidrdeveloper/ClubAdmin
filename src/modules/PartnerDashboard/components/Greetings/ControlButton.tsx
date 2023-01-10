import { SettingOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  onArrowClick: () => void;
  collapsed: boolean;
  onClose: () => void;
  onSettingClick?: () => void;
};
const ControlButtons = ({
  collapsed,
  onClose,
  onSettingClick,
  onArrowClick: onCollapse,
}: Props): ReactElement => {
  return (
    <MainContainer collapsed={collapsed}>
      <Button icon={<UpOutlined className="arrowBtn" />} onClick={onCollapse} />
      {onSettingClick && <Button icon={<SettingOutlined />} onClick={onSettingClick} />}
      <Button icon={<span>X</span>} onClick={onClose} />
    </MainContainer>
  );
};

export default ControlButtons;

const MainContainer = styled.div<{ collapsed?: boolean }>`
  display: flex;
  gap: 10px;
  & > span {
    color: #004c81;
  }
  .arrowBtn {
    transition: all 0.3s ease;
    transform: ${(props) => (props.collapsed ? 'rotate(-180deg)' : 'rotate(0deg)')};
    transform-origin: center;
  }

  .ant-btn {
    border-radius: 5px;
    background-color: #f9f9f9;
  }
`;

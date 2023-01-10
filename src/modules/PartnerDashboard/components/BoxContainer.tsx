import { ArrowRightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';

import ControlButtons from './Greetings/ControlButton';

type Props = {
  input: ReactNode;
  noRadius?: boolean;
  foldable?: boolean;
  title?: string;
  infoLink?: string;
  hasBorder?: boolean;
  moreInfo?: boolean;
  disabled?: boolean;
  onSettingClick?: () => void;
};
const BoxContainer = ({
  moreInfo,
  input,
  noRadius,
  foldable,
  title,
  disabled,
  infoLink,
  onSettingClick,
  hasBorder = false,
}: Props): ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);

  return (
    <>
      {!closed && (
        <MainContainer disabled={disabled} noRadius={noRadius} border={hasBorder}>
          {title || foldable ? (
            <div className="header">
              <Title level={5}>{title}</Title>

              {foldable && (
                <ControlButtons
                  collapsed={collapsed}
                  onClose={() => setClosed(true)}
                  onSettingClick={onSettingClick ?? undefined}
                  onArrowClick={() => setCollapsed((folded) => !folded)}
                />
              )}
            </div>
          ) : (
            ''
          )}
          <div className="content">{!collapsed && input}</div>

          {infoLink && (
            <Typography.Link strong href={infoLink ? infoLink : '#'} target="_blank">
              {moreInfo && (
                <footer>
                  More Info <ArrowRightOutlined />
                </footer>
              )}
            </Typography.Link>
          )}
        </MainContainer>
      )}
    </>
  );
};

export default BoxContainer;

const MainContainer = styled.div<{
  noRadius?: boolean;
  foldable?: boolean;
  border?: boolean;
  disabled?: boolean;
}>`
  ${(props) =>
    props.disabled &&
    `
      filter:blur(3px) grayscale(1);
    `}

  min-height: 50px;
  background-color: #ffffff;
  text-align: left;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 12px;

    h5 {
      font-size: 14px;
    }
  }
  .content {
    padding: 12px;
  }

  footer {
    margin-top: auto;
    padding: 12px;
    background-color: #f9f9f9;
    font-size: 12px;
    color: #003177;
    text-align: center;
  }

  /* top-left | top-right | bottom-right | bottom-left */
  border-radius: ${(props) => (props?.noRadius ? '0' : '9px 9px 0 0')};
  border: ${(props) => (props?.border ? '1px solid #e8e8e8' : 'none')};
`;

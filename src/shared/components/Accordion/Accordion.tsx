import { Collapse } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import InlineSvg from '../InlineSVG/InlineSvg';

const { Panel } = Collapse;

type Props = {
  title: ReactNode;
  children: ReactNode;
  size?: 'small' | 'default';
  defaultActive?: boolean;
  otherIcons?: () => ReactElement | null;
};
export default function Accordion({
  title,
  children,
  size = 'default',
  defaultActive = false,
  otherIcons,
}: Props): ReactElement {
  return (
    <AccordionContainer isSmall={size === 'small'}>
      <Collapse
        defaultActiveKey={defaultActive ? '1' : undefined}
        expandIconPosition="right"
        expandIcon={(props) =>
          props.isActive ? (
            <div className="chevron active">
              <InlineSvg
                src="/global/chevron-down.svg"
                color="#326D94"
                width={size === 'default' ? 14 : 12}
                height={size === 'default' ? 14 : 12}
              />
            </div>
          ) : (
            <div className="chevron">
              <InlineSvg
                src="/global/chevron-down.svg"
                color="#326D94"
                width={size === 'default' ? 14 : 12}
                height={size === 'default' ? 14 : 12}
              />
            </div>
          )
        }
      >
        <Panel forceRender header={title} key="1" extra={otherIcons?.()}>
          {children}
        </Panel>
      </Collapse>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.article<{ isSmall: boolean }>`
  margin-bottom: ${(props) => (props.isSmall ? '0' : '16px')};

  & .ant-collapse {
    border: none;
    border: ${(props) => (props.isSmall ? '1px solid #E4E4EB' : '')};

    & .ant-collapse-header {
      font-weight: bold;
      font-size: 0.9rem;
      background: #fff;
      color: ${(props) => props.theme.colors.main};
      padding: ${(props) => (props.isSmall ? '16px' : '32px')};
      text-transform: ${(props) => (props.isSmall ? 'none' : 'uppercase')};

      & .ant-collapse-arrow {
        right: 32px;
      }

      & .chevron {
        width: 30px;
        height: 30px;
        background: #dbf0fe;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;

        &.active {
          transform: translateY(-50%) rotate(-180deg);
        }
      }
    }

    & .ant-collapse-item {
      border: none;
      border-radius: 0 0 10px 10px;
    }

    & .ant-collapse-content {
      border: none;
      border-radius: 0 0 10px 10px;
      &-box {
        padding: 0;
      }
    }
  }
`;

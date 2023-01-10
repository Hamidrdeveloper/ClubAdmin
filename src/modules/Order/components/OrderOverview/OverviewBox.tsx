import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

type Props = { title: string; children: ReactNode };
export default function OverviewBox({ title, children }: Props): ReactElement {
  return (
    <MainContainer>
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="description">{children}</div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  & .title {
    color: #fff;
    background: #4a5161;
    text-align: center;
    border-radius: 2px;
    padding: 0 16px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .description {
    margin-top: 2px;
    background: #f2f2f2;
    max-width: 100%;
    color: #4a5161;
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    padding: 0 8px;
    font-weight: 500;
  }
`;

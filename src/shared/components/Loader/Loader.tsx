import { Spin } from 'antd';
import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  width: 100%;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  & h3 {
    margin-bottom: 16px;
  }

  &.isFullPage {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2222222;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
  }
`;

const Loader: React.FC<{ isFullPage?: boolean; title?: string }> = ({ isFullPage = false, title }) => {
  return (
    <LoaderContainer className={isFullPage ? 'isFullPage' : ''}>
      {title && <h3>{title}</h3>}
      <Spin />
    </LoaderContainer>
  );
};

export default Loader;

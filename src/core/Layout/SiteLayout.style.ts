import styled from 'styled-components';

import { SidebarContainerProps } from './types/Layout';

const MainContainer = styled.section`
  position: relative;
`;

const ErrorContainer = styled.div`
  padding: 105px 32px 52px 32px;
  min-height: 100vh;
  background: #e8ebf2;

  .error-icon {
    color: red;
  }
`;

const AppContainer = styled.div<SidebarContainerProps>`
  transition: padding-left 0.5s;

  min-height: 100vh;
  background: #e8ebf2;
  padding-left: ${(props) => (props.isPartner ? '0px' : !props.collapsed ? '280px' : '60px')};

  & .contents-container {
    padding: 105px 32px 52px 32px;
    min-height: 100vh;

    & .content-body {
      width: 100%;
      margin: 0 auto;
      padding-bottom: 100px;
      transition: max-width 0.5s;
    }
  }

  & textarea {
    z-index: 0 !important;
  }
`;

export default { AppContainer, MainContainer, ErrorContainer };

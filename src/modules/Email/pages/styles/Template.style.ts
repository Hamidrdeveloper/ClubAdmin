import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 32px;
`;

export const TabsContainer = styled.div`
  & .ant-tabs-nav::before {
    border: none;
  }

  & .ant-tabs-tab {
    background: #fff !important;
    border-radius: 4px !important;
  }

  & .ant-tabs-tab-active {
    background: #009ddc !important;
    border-radius: 4px !important;

    & .anticon-close {
      color: #fff;
    }

    & .ant-tabs-tab-btn {
      color: #fff !important;
    }
  }
`;

export default { MainContainer, TabsContainer };

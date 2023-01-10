import styled from 'styled-components';

const TabsContainer = styled.div`
  padding: 20px 0;

  .stock-tabs {
    overflow: initial !important;

    .ant-tabs-tab.single-tab.ant-tabs-tab-active {
      background-color: #37b053;
    }
    .ant-tabs-nav::before {
      border: none;
    }
  }
`;

export default { TabsContainer };

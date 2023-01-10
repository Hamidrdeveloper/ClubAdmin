import styled from 'styled-components';

const TabsContainer = styled.div`
  padding: 20px 0;

  & .variation-tabs {
    overflow: initial !important;

    & .ant-tabs-nav::before {
      border: none;
    }

    & .multi-switch.ant-switch-checked {
      background-color: green !important;
    }
  }
`;

export default { TabsContainer };

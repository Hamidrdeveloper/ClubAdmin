import styled from 'styled-components';

const TabsContainer = styled.div`
  padding: 20px;

  & .product-tabs {
    overflow: initial !important;

    & .ant-tabs-nav::before {
      border: none;
    }

    & .single-tab {
      &.ant-tabs-tab {
        background: #fff;
        border-radius: 4px;
      }

      &.ant-tabs-tab-active {
        background: #009ddc;
        border-radius: 4px;

        & .anticon-close {
          color: #fff;
        }

        & .ant-tabs-tab-btn {
          color: #fff !important;
        }
      }
    }
  }
`;

export default { TabsContainer };

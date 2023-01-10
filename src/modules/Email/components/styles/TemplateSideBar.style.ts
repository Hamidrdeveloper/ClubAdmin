import styled from 'styled-components';

const MainContainer = styled.div`
  & .menu {
    position: relative;
    border-radius: 4px;
    border: 1px solid #f0f0f0;

    & .ant-menu-sub.ant-menu-inline {
      background: #ebf7ed;
    }

    & .ant-menu-item-selected {
      color: #fff;
      border-radius: 8px;
      background-color: #38b153;

      &::after {
        content: none;
        display: none;
      }
    }

    & .item-selected {
      color: #fff;
      border-radius: 8px;
      background-color: #38b153;
    }
  }
`;

export default { MainContainer };

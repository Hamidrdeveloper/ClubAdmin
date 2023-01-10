import styled from 'styled-components';

const MainContainer = styled.div``;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .shopSettings-tabs .ant-tabs-nav-list {
    width: 100%;
    margin-left: 0;

    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-active {
      background-color: #009ddc;

      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

const PositionTabs = styled.div`
  margin-top: 20px;
  width: 100%;
  & .ant-tabs-nav {
    margin-bottom: 0px;
  }
  & .shopSettings-tabs .ant-tabs-nav-list {
    margin-left: 0;
    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-btn {
      padding: 0px 28px;
      min-width: 18vh;
      text-align: center;
      font-weight: 500;
    }
    & .ant-tabs-tab-active {
      background-color: #009ddc;
      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;

const PositionsContainer = styled.div`
  padding: 16px 0;
`;

export default { MainContainer, TabsContainer, PositionsContainer, PositionTabs };

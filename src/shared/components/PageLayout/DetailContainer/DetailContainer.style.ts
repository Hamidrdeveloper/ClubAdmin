import styled from 'styled-components';

const DetailContainer = styled.div<{ isOpen: boolean }>`
  top: 81px;
  right: 0;
  bottom: 0;
  width: 320px;
  z-index: 100;
  overflow-y: auto;
  min-height: 740px;
  position: absolute;
  background: #f6f9fb;
  border-bottom-right-radius: 12px;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1), box-shadow 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
`;

const MainContainer = styled.div`
  & .ant-tabs-nav-list {
    width: 100%;

    & .ant-tabs-tab {
      flex: 1;
      justify-content: center;
    }
  }
`;

const Details = styled.div`
  padding: 16px 24px;

  div.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;

    & .amount {
      color: ${(props) => props.theme.colors.main};
    }
  }

  div.content {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export default { DetailContainer, MainContainer, Details };

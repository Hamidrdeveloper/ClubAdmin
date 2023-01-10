import styled from 'styled-components';

const Header = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #8b8b8b;

  & .extra {
    display: flex;
    align-items: center;
  }
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & .ant-btn-primary {
    border-radius: 2px;
  }

  div.contents {
    flex: 1;
    padding-left: 40px;
    position: relative;

    & .search-overlay {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      left: 16px;
      background: #fff;

      & .anticon {
        cursor: pointer;
      }

      & input {
        height: 50px;
      }
    }

    & .ant-typography {
      cursor: pointer;

      & .anticon {
        margin-right: 4px;
        color: ${(props) => props.theme.colors.main};
      }
    }
  }

  div.group-func {
    padding: 0 44px 0 32px;
    border-left: 2px solid #9d9d9d;

    & button {
      border: none !important;
      background: rgba(74, 81, 97, 0.5);

      &:hover {
        background: rgba(74, 81, 97, 0.5);
      }
    }
  }

  div.title {
    & h3 {
      margin: 0;
    }
  }
`;

export default { MainContainer, Header };

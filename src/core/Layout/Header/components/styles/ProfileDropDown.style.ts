import styled from 'styled-components';

const MainContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  width: 260px;


  overflow: hidden;
  border-radius: 4px;

  & .header {
    padding: 24px;
    background: #f5f6fa !important;

    & .user-card {
      display: flex;
      cursor: pointer;
      align-items: center;

      & .avatar {
        padding-right: 16px;
      }

      & .username {
        & .name {
          font-weight: 600;
          font-size: 1rem;
          color: ${(props) => props.theme.colors.main};
        }

        & .email {
          font-size: 0.8rem;
          color: ${(props) => props.theme.colors.secondary};
        }
      }
    }
  }
`;

const WalletInfo = styled.div`
  padding: 24px;
  border-top: 1px solid #e5e9f2;
  border-bottom: 1px solid #e5e9f2;

  & h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 0.15em;
    font-size: 11px;
    color: #8094ae;
    text-transform: uppercase;
  }

  & .btc-balance {
    padding: 0.325rem 0 0.375rem;
    font-size: 1.5rem;
    line-height: 1;
    color: ${(props) => props.theme.colors.secondary};

    & small {
      margin-left: 8px;
    }
  }

  & .btc-balance-alt {
    font-size: 15px;
    color: #526484;
    font-weight: 700;

    & small {
      color: #8094ae;
    }
  }
`;

const MenuContainer = styled.div`
  padding: 8px 0;

  & .d-none {
    display: none;
  }
  & .menus {
    list-style: none;
    margin: 0;
    padding: 0;

    & li.menu-item {
      padding: 2px 0;

      &.log-out {
        margin-top: 8px;
        border-top: 1px solid #e5e9f2;
      }

      & a {
        border-radius: 40px;
        vertical-align: middle;
        display: flex;
        position: relative;
        align-items: center;
        padding: 8px 24px;
        color: #6e82a5;
        font-family: Nunito, sans-serif;
        font-size: 13px;
        letter-spacing: 0.01em;
        text-transform: none;
        line-height: 1.25rem;

        & label {
          margin-left: 16px;
          cursor: pointer;
        }

        &:hover {
          color: ${(props) => props.theme.colors.secondary};
        }
      }
    }
  }
`;

export default { MainContainer, WalletInfo, MenuContainer };

import styled from 'styled-components';

const MainContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 800;
  left: 0;
  min-width: 320px;
  background: #fff;
  padding: 0 24px;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  display: flex;
  justify-content: space-between;

  & .inner {
    display: flex;
    position: relative;
    align-items: center;
    flex: 1;
    max-width: 1180px;
    overflow-x: auto;
    overflow-y: hidden;

    & img {
      height: 50px;
    }
  }
  & .d-none {
    display: none !important;
  }
`;

const MenuContainer = styled.div`
  height: 100%;
  flex: 1;

  & ul.menu {
    height: 100%;
    padding: 0 16px;

    & li.ant-menu-item,
    & li.ant-menu-submenu {
      height: 100%;
      font-size: 1rem;
      display: flex;
      align-items: center;
      position: relative;

      &:hover {
        color: ${(props) => props.theme.colors.secondary};

        &::after {
          border-color: ${(props) => props.theme.colors.secondary} !important;
        }
      }

      &.ant-menu-item-active,
      &.ant-menu-submenu-active {
        &::after {
          border-color: ${(props) => props.theme.colors.secondary} !important;
        }
        & a,
        & span {
          color: ${(props) => props.theme.colors.secondary};
        }
      }

      & a,
      & span {
        color: #4a5161;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: ${(props) => props.theme.colors.secondary};
        }
      }
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  & .search {
    padding: 0 16px;

    & .ant-input-affix-wrapper {
      border-radius: 16px;
      background: #ededed;

      & input {
        background: #ededed;
      }
    }
  }

  & .icons {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 16px;

    & .single-menu {
      display: flex;

      & .anticon {
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
`;

const ProfileContainer = styled.div`
  padding: 16px 0;
  position: relative;
  min-width: 200px;

  & .user-dropdown {
    display: flex;
    cursor: pointer;
    align-items: center;

    & .avatar {
      padding: 0 16px;
    }

    & .username {
      & .status {
        font-size: 11px;
        color: ${(props) => props.theme.colors.success};
      }

      & .name {
        display: flex;
        align-items: center;

        & span {
          font-weight: 600;
          margin-right: 4px;
        }
      }
    }
  }
`;

export default { MainContainer, ProfileContainer, MenuContainer, ActionsContainer };

import styled from 'styled-components';

import { SidebarContainerProps } from '../types/Layout';

const SidebarContainer = styled.aside<SidebarContainerProps>`
  position: fixed;
  height: calc(100vh - 180px);
  top: 100px;
  left: 0;
  z-index: 999;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: width 0.5s;
  overflow-x: hidden;
  background: ${(props) => props.theme.colors.main};
  display: ${(props) => (props.isPartner ? 'none' : 'block')};
  border-right: 1px solid ${(props) => props.theme.colors.main};
  width: ${(props) => (props.isPartner ? '0' : props.collapsed ? '62px' : '280px')};
  padding: 2px;

  ::-webkit-scrollbar {
    width: ${(props) => (props.collapsed ? '0' : '8px')};
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 16px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #f2f2f2;
  }

  & .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 1.5rem ${(props) => (props.collapsed ? '20px' : '16px')};

    & span {
      color: #fff;
      font-size: 25px;
    }

    & span:first-child {
      font-size: 18px;
    }

    & h3 {
      color: #fff;
      margin: 0;
      white-space: nowrap;
    }

    & .ant-space {
      display: ${(props) => (props.collapsed ? 'none' : 'inline-flex')};
    }

    & .menu {
      cursor: pointer;
    }
  }

  .panelHeaders {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: ${(props) => (props.collapsed ? '8px' : '16px')};
    color: white;

    div {
      display: inline-block;
    }

    span {
      margin-left: 10px;
    }
  }

  .active.panelHeaders {
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 5px;
      background: ${(props) => props.theme.colors.secondary};
    }
  }

  .ant-collapse-header {
    background-color: none;
  }

  .menu-items {
    background-color: ${(props) => props.theme.colors.main_accent_dark};
    border-radius: 0 0 10px 10px;
    border: none;
    list-style: none;
    padding: 0;
    display: ${(props) => (props.collapsed ? 'none' : 'block')};
  }

  .sub_active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .searchBox {
    border: none;
    border-radius: 48px;
    min-height: 36px;
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.main_accent};

    & .ant-input-suffix {
      top: 50%;
      right: 12px;
      position: absolute;
      transform: translateY(-50%);

      & .anticon {
        color: #fff;
      }
    }
  }

  .searchBox input {
    color: #fff;
    padding-left: 4px;
    display: ${(props) => (props.collapsed ? 'none' : 'block')};
    background-color: ${(props) => props.theme.colors.main_accent};
  }

  .searchBoxHolder {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => (props.collapsed ? '0 8px 0 4px' : '0 8px 0 8px')};
    margin-bottom: 24px;
    cursor: pointer;
  }
`;

const SidebarMenus = styled.div`
  padding: 1.5rem 0 1.5rem;

  & .title {
    padding: 0.25rem 24px 0.5rem;

    & h6 {
      font-size: 11px;
      line-height: 1.2;
      letter-spacing: 0.2em;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  & .menus {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.colors.main};
    border: none;

    & .ant-collapse-header {
      position: relative;
    }

    & .ant-collapse-content-box {
      padding: 0;
      border: none;
      background-color: ${(props) => props.theme.colors.main};
    }
    & .ant-collapse-content {
      border: none;
      background: none;
    }
    & .active.menu-item {
      background-color: ${(props) => props.theme.colors.main_accent_dark};
    }

    & .menu-item {
      margin-bottom: 4px;
      background-color: ${(props) => props.theme.colors.main_accent};
      border-radius: 10px;
      border: none;

      & a {
        vertical-align: middle;
        display: flex;
        position: relative;
        align-items: center;
        transition: color 0.3s, background-color 0.3s;
        padding: 0.4rem 40px 0.4rem 24px;
        color: #fff;
        font-size: 14px;
        text-transform: none;
        width: 100%;
        line-height: 1.25rem;
      }
      & li {
        display: flex;
        align-items: baseline;
        padding-left: 16px;
      }
      & li:last-child {
        border-radius: 0 0 10px 10px;
      }
      & li div,
      li div svg {
        margin-bottom: 3px;
        margin-left: 8px;
      }
      & li:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: ${(props) => props.theme.colors.secondary};

        & path,
        & g {
          fill: ${(props) => props.theme.colors.secondary};
        }
      }
    }
  }
`;

export default { SidebarContainer, SidebarMenus };

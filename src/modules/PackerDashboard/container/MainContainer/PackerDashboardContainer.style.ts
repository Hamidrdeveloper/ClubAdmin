// @ts-ignore
import styled from 'styled-components';

export namespace PackerDashboard {
  export const Container = styled.div`
    min-height: 100vh;
    background-color: #fefefe;
    border-radius: 8px;

    & .content,
    & .title {
      padding: 8px 16px;
    }

    & h2 {
      margin-bottom: 0 !important;
    }

    & hr {
      width: 100% !important;
    }

    & .ant-divider-vertical {
      height: auto;
    }

    & .ant-collapse-header,
    & .ant-collapse-content-box {
      padding: 0 !important;
    }

    & .ant-image-img {
      width: 100%;
      max-width: 200px;
      margin: auto !important;
    }

    & .ant-image {
      width: 100%;
    }

    & .packer-col:not(:first-child) {
      border-left: 1px solid rgba(0, 0, 0, 0.06);
    }

    & .icons {
      font-size: 18px;
    }

    & #arrow {
      transition: 0.3s ease-in-out;
    }

    & #arrow {
      transform: rotate(0deg);
    }

    & .ant-collapse-item.ant-collapse-item-active.ant-collapse-no-arrow {
      & #arrow {
        transform: rotate(-180deg);
      }
    }

    & .done-holder {
      height: 75%;
      display: flex;
      justify-content: center;
      align-items: end;

      & .done {
        margin-left: auto;
        width: 12vh;
      }
    }
  `;
}
// @ts-ignore

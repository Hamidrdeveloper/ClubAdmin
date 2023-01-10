import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 24px 64px;
  max-height: 525px;
  overflow-y: auto;

  & .ant-card {
    &.active {
      & .ant-card-body {
        background: ${(props) => props.theme.colors.primary};
      }
    }
    &.greenActive {
      & .ant-card-body {
        background: #e8f5e9;
      }
    }

    & .mainImage {
      width: 100%;
      height: 20vw;
      display: flex;
      text-align: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    & .ant-card-body {
      padding: 16px 24px !important;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 256px;

      & .single {
        display: flex;
        justify-content: space-between;

        & .ant-typography {
          font-weight: 500;
        }

        & .number {
          color: #2b7bb2;
          text-align: right;
        }

        & .id {
          cursor: pointer;
          color: #1890ff;
        }
      }
    }
  }
`;

export default { MainContainer };

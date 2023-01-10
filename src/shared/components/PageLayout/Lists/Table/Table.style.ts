import styled from 'styled-components';

const MainContainer = styled.div`
  & .ant-table {
    & .ant-table-thead {
      & th.ant-table-selection-column {
        background: #edf7ff;
      }
      & th.id {
        background: #edf7ff;
        border-right: 2px solid #2b7bb2;
      }
      & .ant-table-cell {
        background: #fff;
        padding-top: 60px;
        color: #8a8a8a;

        &.number {
          text-align: right;
        }

        &::before {
          content: none !important;
        }
      }
    }

    & .ant-table-tbody {
      & .ant-table-cell {
        font-weight: 500;

        &.number {
          color: #2b7bb2;
          text-align: right;
        }

        &.id {
          cursor: pointer;
          color: #1890ff;
        }
      }
      & .ant-table-row-selected td {
        background: ${(props) => props.theme.colors.primary} !important;
      }
    }
  }
`;

export default { MainContainer };

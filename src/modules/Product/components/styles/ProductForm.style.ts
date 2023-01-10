import { Row, RowProps } from 'antd';
import styled from 'styled-components';

const SingleProductRow: typeof Row = styled(Row)<RowProps>`
  padding: 20px;

  &.name-desc-container {
    background-color: #fafafa;
    border-radius: 5px;
    margin: 12px !important;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
`;

const BoxShadow = styled.div`
  padding: 12px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

  &.right-side {
    margin-top: 42px;
  }

  & > .ant-form-item {
    margin-bottom: 0;
    padding: 20px;
    :nth-child(even) {
      background-color: #fbfbfb;
    }
    :nth-child(odd) {
      background-color: rgb(242, 242, 242);
    }
  }
`;

export default { SingleProductRow, BoxShadow };

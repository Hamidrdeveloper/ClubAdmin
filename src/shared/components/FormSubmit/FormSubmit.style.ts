import { Row } from 'antd';
import styled from 'styled-components';

const MainContainer = styled(Row)`
  padding-top: 16px;

  .ant-form-item {
    background-color: inherit !important;
  }
  & button {
    min-width: 180px;
  }

  .secondary {
    margin-right: 8px;
  }
`;

export default { MainContainer };

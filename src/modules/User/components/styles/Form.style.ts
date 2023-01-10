import { Form } from 'antd';
import styled from 'styled-components';

const Container = styled(Form)<{ colspace?: number }>`
  .ant-form-item {
    margin-bottom: 0;
    padding: 12px 12px 24px 12px;

    :nth-child(even) {
      background-color: #fbfbfb;
    }
    :nth-child(odd) {
      background-color: rgb(242, 242, 242);
    }
  }

  .ant-form-item-control-input {
    height: auto;
    display: flex;
    align-items: center;
  }

  .ant-form-item-label {
    white-space: normal;
    display: flex;
    align-items: center;

    & > label {
      height: auto;
    }
  }

  .leftCol {
    padding-right: ${(props) => props.colspace}px;
  }
  .rightCol {
    padding-left: ${(props) => props.colspace}px;
  }
`;

export default { Container };

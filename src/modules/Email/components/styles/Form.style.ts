import { Form } from 'antd';
import styled from 'styled-components';

const FormContainer = styled(Form)`
  margin-bottom: 50px;
  padding: 20px;

  background-color: rgb(251, 251, 251);

  .customBoxShadow {
    box-shadow: 0 0 10px #eaece4;

    & .ant-input {
      border: 1px solid #f2f4eb;
      outline: none;

      & #news-letter-form_password {
        outline: none;
        border: none;
      }
    }

    & .ant-select-selector {
      border: none;
      outline: none;
    }

    & .ant-select-selection-item {
      font-weight: 400;
    }

    .ant-form-item {
      margin-bottom: 0;
      padding: 12px;

      .ant-form-item-no-colon {
        display: contents;
      }
      :nth-child(even) {
        background-color: #f4f6f9;
      }
      :nth-child(odd) {
        background-color: #e5e7e9;
      }
    }
  }
`;

export default { FormContainer };

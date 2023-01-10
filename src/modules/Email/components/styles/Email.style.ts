import styled from 'styled-components';

const MainContainer = styled.div`
  .formContainer {
    border-radius: 3px;

    & .ant-form-item-label {
      white-space: normal;
    }
  }

  & .message-content {
    margin-top: 16px;
    padding: 22px;
  }

  & .content {
    margin-bottom: 12px;
  }
`;

const FormContainer = styled.div`
  margin-bottom: 50px;
  background-color: rgb(251, 251, 251);

  .customBoxShadow {
    box-shadow: 0 0 10px #eaece4;

    & .ant-input {
      border: 1px solid #f2f4eb;
      outline: none;
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
      :nth-child(even) {
        background-color: #f4f6f9;
      }
      :nth-child(odd) {
        background-color: #e5e7e9;
      }
    }
  }
`;

export default { MainContainer, FormContainer };

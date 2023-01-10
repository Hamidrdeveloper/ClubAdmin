import styled from 'styled-components';

const FormContainer = styled.div`
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
`;

export default { FormContainer };

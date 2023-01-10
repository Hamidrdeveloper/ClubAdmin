import styled from 'styled-components';

const MainContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  .checkboxContainer .ant-form-item {
    background-color: #fbfbfb !important;
  }

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
`;

export default { MainContainer };

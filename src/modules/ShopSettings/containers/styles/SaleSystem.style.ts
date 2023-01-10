import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 16px;

  & .first-col,
  & .second-col {
    & .row {
      border-radius: 4px;
      padding: 16px;
      position: relative;
      & .action {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
      & .select {
        width: 100%;
        & .ant-select-selector {
          border: 1px solid #f2f4eb;
          outline: none;
        }
      }
      & .picker {
        width: 100%;
      }
      & .ant-picker {
        border-radius: 4px;
        border: none;
      }
      & .info-box {
        background-color: white;
        border: 1px solid #f2f4eb;
        border-radius: 4px;
        height: 33px;
        padding: 5px;
        width: 100%;
      }
      & .success-btn {
        color: #57af52;
        font-size: 14px;
        border-color: #99e694;
        font-weight: 400;
        background-color: #b9eab6;
      }
    }
  }

  & .first-col {
    & .row {
      &:nth-child(odd) {
        background: #fbfbfb;
      }
      &:nth-child(even) {
        background: #f2f2f2;
      }
    }
  }

  & .second-col {
    & .row {
      &:nth-child(even) {
        background: #fbfbfb;
      }
      &:nth-child(odd) {
        background: #f2f2f2;
      }
    }
  }

  & .btn-row {
    margin: 35px;
    & .submit-btn {
      background-color: #2d5fa5;
      border-radius: 4px;
      color: white;
      width: 130px;
    }
  }
`;

export default { MainContainer };

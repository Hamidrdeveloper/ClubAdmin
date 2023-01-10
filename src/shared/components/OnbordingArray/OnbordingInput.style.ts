import styled from 'styled-components';

const OnbordingInputContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  & .ant-btn {
    align-self: flex-end;
  }

  & .field {
    display: flex;
    flex-direction: column;

    & .ant-input-group {
      display: flex;
      flex: 1 1 0%;
    }

    & .ant-select {
      min-width: 150px;
    }

    & span[role='img'].icon {
      font-size: 16px;
      color: rgb(24, 144, 255);
    }

    .icon-container {
      position: relative;
      & span[role='img'].icon {
        position: absolute;
        top: 40px;
        right: 12px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 1px dashed #707070;
    }
  }
`;
export default { OnbordingInputContainer };

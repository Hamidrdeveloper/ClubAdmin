import styled from 'styled-components';

const MainContainer = styled.div`
  & .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & strong {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  & .ant-typography-secondary {
    font-size: 15px;
  }

  & .ant-typography-secondary + .ant-form-item .ant-form-item-label,
  & .ant-typography-secondary + .ant-row {
    margin-top: 40px;
  }

  .header {
    font-size: 41px;
  }

  & .ant-form-item-label > label {
    font-weight: 400;
    font-size: 15px !important;
  }

  & .ant-row-space-between {
    margin-bottom: 38px;

    & div {
      cursor: pointer;
      text-decoration: underline;
      color: ${(props) => props.theme.colors.main};
    }
  }

  .ant-btn-primary {
    background-color: ${(props) => props.theme.colors.main};
    border-color: ${(props) => props.theme.colors.main};
    color: white;
    width: 100%;
    margin-bottom: 36px;
  }

  & .gender-row {
    margin-bottom: 0;
  }

  & .term-of-use {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin-bottom: 30px;
    & label {
      margin: 0;
      margin-bottom: 5px;

      & span span {
        color: ${(props) => props.theme.colors.main};
      }
    }
  }

  & .hr {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #707070;
    line-height: 0.1em;
    margin-bottom: 30px;

    & span {
      background: #fff;
      padding: 0 10px;
      color: black;
    }

    & + .ant-btn {
      width: 100%;
      margin-bottom: 20px;

      & + .ant-btn {
        width: 100%;
        margin-bottom: 90px;
      }
    }
  }

  & .ant-radio-group {
    margin-bottom: 30px !important;
  }

  & .ant-row-center {
    & .ant-typography {
      margin-right: 10px;

      &:last-child {
        color: ${(props) => props.theme.colors.main};
        cursor: pointer;
      }
    }
  }

  .send-again {
    margin-bottom: 130px;
    font-size: 15px;
    align-items: baseline;

    & .ant-btn-text {
      padding: 0;
      margin: 0;
      color: ${(props) => props.theme.colors.main};
      margin-left: 5px;
      & span {
        text-decoration: underline;
      }
      &:hover {
        background: transparent;
      }
    }
  }
  & .ant-btn-circle {
    margin-right: 10px;

    & + div {
      font-size: 20px;
      color: #4f4f4f;
    }
  }
  & .info {
    color: #06c270;
    font-size: 14px;
    margin-bottom: 100px;
    margin-top: 16px;

    & .anticon-check-circle {
      margin: 4px;
    }
  }

  & .pas-change {
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & div {
      font-size: 26px;
      margin-top: 58px;
      margin-bottom: 14px;
      color: #484848;
    }
    & span:last-child {
      font-size: 18px;
      text-align: center;
    }
    & .anticon {
      font-size: 150px;
    }
  }

  & .d-none {
    display: none;
  }

  & .circle-btn {
    border: none;
    margin: 20px;
    display: flex;
    align-items: center;
    font-size: 18px;
    box-shadow: none;
    & div {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.colors.main};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
`;

export default { MainContainer };

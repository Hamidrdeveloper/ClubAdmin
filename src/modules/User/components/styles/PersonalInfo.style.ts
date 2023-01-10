import styled from 'styled-components';

const MainContainer = styled.div<{ radius: number }>`
  .header {
    border: 1px solid #9d9d9d;
    border-radius: ${(props) => props.radius}px;

    display: grid;
    grid-template-rows: 22px 75px 30px 80px 50px 22px;
    /* Make it second column smaller in smaller screens */
    grid-template-columns: 5% minmax(105px, max-content) auto 200px 5%;

    margin: 1rem 0;

    column-gap: 12px;
    row-gap: 12px;

    grid-template-areas:
      'bg bg bg bg bg'
      'bg bg bg bg bg'
      '. avatar . . .'
      '. info info btn btn'
      '. info info joined .';
  }

  .order-btn {
    padding: 12px;
    margin-right: 12px;
    border: 1px solid #9d9d9d;
    background-color: white;
    border-radius: ${(props) => props.radius}px;

    grid-area: btn;
    align-self: end;
  }

  .backgroundImg {
    grid-area: bg;
    border-top-left-radius: ${(props) => props.radius}px;
    border-top-right-radius: ${(props) => props.radius}px;

    background-color: #c4c4c4;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .avatar {
    grid-area: avatar;
    grid-column: 2 / 3;
    grid-row: 2 / 4;

    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 105px;
    max-height: 105px;

    border-radius: 50%;
  }
  .avatar-uploader {
    .ant-upload,
    .ant-upload-select,
    .ant-upload-select-picture-card {
      background: white;
      border-radius: 50%;
    }
  }

  .info {
    grid-area: info;

    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: space-around;
    .info-item {
      &.custom-svg {
        display: flex;
      }
      & > * {
        margin: 0 3px;
      }
    }
  }
  .joined {
    grid-area: joined;
    align-self: center;

    display: flex;
    justify-content: space-around;

    color: #009edc;
  }

  .vatInput {
    display: flex;
    justify-content: space-between;
  }
  .checkbox-container {
    .ant-form-item {
      height: 100%;
    }
  }
`;

export default { MainContainer };

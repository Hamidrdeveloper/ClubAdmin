import styled from 'styled-components';

const MainContainer = styled.div<{ radius?: number }>`
  border: 1px solid #d9d9d9;
  padding: 20px;

  background-color: #fafafa;

  border-radius: ${(props) => props.radius}px;
`;

const FieldSet = styled.fieldset`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  legend {
    color: #235b81;
    width: auto;
    padding: 0 10px;
    font-weight: bold;
    margin-bottom: 0;
    margin-left: 15px;
    border-bottom: 0;
  }

  .checkbox-legend {
    .ant-checkbox-wrapper {
      color: #235b81;
    }

    margin-bottom: 0;
  }

  .space {
    display: flex;
    gap: 8px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .ant-select {
      width: 150px;
    }

    .ant-input-group {
      display: flex;
      flex: 1;

      &.gap {
        gap: 8px;

        & input {
          border-radius: 4px;
        }
      }
    }
  }
`;

export default { MainContainer, FieldSet };

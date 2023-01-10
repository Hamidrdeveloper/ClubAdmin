import styled from 'styled-components';

const barcodeGenerateBtnWidth = '10rem';
const MainContainer = styled.div`
  .barcode-gen-container {
    padding: 12px !important;

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: space-between;

      .barcode-select {
        width: calc(100% - ${barcodeGenerateBtnWidth});
      }
    }
  }

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

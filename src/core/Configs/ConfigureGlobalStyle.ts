import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${(props) => props.theme.typography.fontFamily.main};
  }

  /* That's for Graph Tree */
  .rst__rowContents {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .rst__lineHalfVerticalBottom::after, 
  .rst__lineHalfVerticalTop::after, 
  .rst__lineChildren::after,
  .rst__lineFullVertical::after {
    background: linear-gradient(to bottom, transparent 50%, #fff 50%),
            linear-gradient(to bottom, #009ddc, #fff);
    background-size: 2px 16px, 100% 16px;
  }

  .rst__lineHalfHorizontalRight::before {
    background: linear-gradient(to right, transparent 50%, #fff 50%),
            linear-gradient(to right, #009ddc, #fff);
    background-size: 16px 2px, 16px 100%;
  }

  .rst__tree {
    width: 800px;
  }

  /* I know This is Shit But There is No Choise ! */
  & .ql-tooltip {
    z-index: 2000;
  }

  .react-select.group-style__control {
    width: 220px;
    box-shadow: none;
    border-radius: 4px 0 0 4px;
  }

  .ant-modal-content {
    padding: 16px 32px;

    & .ant-modal-header {
      padding-inline: 0;
      padding-bottom: 24px;
      border-bottom: 1px dashed ${(props) => props.theme.colors.main};
    }
  }
  
  .ant-input-number, & .ant-picker, & .ant-upload {
    width: 100% !important;

    & .ant-progress-inner {
      margin-top: 8px;
    }
  }
  
  .ant-dropdown {
    & .active {
      & path,
      & g {
        fill: ${({ theme }) => theme.colors.main}
      }
      color: ${({ theme }) => theme.colors.main};
      background: ${({ theme }) => theme.colors.primary};
    }
  }

 .ant-form-item-has-error {
    & .react-select__control, & .react-select.group-style__control {
      border-color: #f5222d !important;
    }
  }

  .ant-table-tbody > tr.ant-table-row-selected {
    & > td {
      background: #f6f6f6;
    }

    &:hover {
      & > td {
        background: #f6f6f6;
      }
    }
  }

  & .ant-modal-close-x {
    display: none;
  }

  svg{
    shape-rendering: geometricprecision !important;
  }
`;

export default GlobalStyle;

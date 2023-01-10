import { Button } from 'antd';
import styled from 'styled-components';

const Tab = styled(Button)`
  display: flex;
  align-items: center;
  padding: 18px;
  & > * {
    margin: 0 8px;
  }
`;

const Checkbox = styled.div`
  .iosToggleButton {
    display: none;
  }

  .iosLabel {
    width: 50px;
    height: 25px;

    display: block;
    border-radius: 50px;
    transition: background-color cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
    background-color: rgb(237, 237, 237);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .iosLabel::after {
    content: '';
    width: 50%;
    border-radius: 50%;
    background-color: white;
    height: 100%;
    display: block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    left: 1.5px;
    position: relative;
    transition: left cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;

    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .iosToggleButton:checked + .iosLabel::after {
    left: 24.5px;
  }

  .iosToggleButton:checked + .iosLabel {
    background-color: rgb(106, 201, 112);
  }
`;

export default { Tab, Checkbox };

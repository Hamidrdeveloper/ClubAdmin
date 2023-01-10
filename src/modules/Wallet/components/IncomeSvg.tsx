import React, { ReactElement } from 'react';

type Props = {
  strokeWidth: number;
};
const IncomeLogo = ({ strokeWidth = 2 }: Props): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
      <g id="Income" transform="translate(-1148 -219)">
        <g
          id="Ellipse_422"
          data-name="Ellipse 422"
          transform="translate(1148 219)"
          fill="#fff"
          stroke="#06d6a0"
          strokeWidth={strokeWidth}
        >
          <circle cx="31" cy="31" r="31" stroke="none" />
          <circle cx="31" cy="31" r="29.5" fill="none" />
        </g>
        <g
          id="Icon_feather-arrow-down-left"
          data-name="Icon feather-arrow-down-left"
          transform="translate(1169.08 241.32)"
        >
          <path
            id="Path_7524"
            data-name="Path 7524"
            d="M10.5,29.1,29.1,10.5"
            transform="translate(-10.5 -10.5)"
            fill="none"
            stroke="#06d6a0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <path
            id="Path_7525"
            data-name="Path 7525"
            d="M10.5,10.5H29.1V29.1"
            transform="translate(-10.5 -10.5)"
            fill="none"
            stroke="#06d6a0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </g>
      </g>
    </svg>
  );
};

export default IncomeLogo;

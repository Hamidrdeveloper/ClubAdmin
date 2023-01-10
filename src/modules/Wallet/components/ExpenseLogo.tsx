import React, { ReactElement } from 'react';

type Props = {
  strokeWidth: number;
};
const ExpenseLogo = ({ strokeWidth = 2 }: Props): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
      <g id="Spend" transform="translate(-1547 -219)">
        <g
          id="Ellipse_424"
          data-name="Ellipse 424"
          transform="translate(1547 219)"
          fill="#fff"
          stroke="#ef476f"
          strokeWidth={strokeWidth}
        >
          <circle cx="31" cy="31" r="31" stroke="none" />
          <circle cx="31" cy="31" r="29.5" fill="none" />
        </g>
        <g
          id="Icon_feather-arrow-down-left"
          data-name="Icon feather-arrow-down-left"
          transform="translate(1568.08 241.32)"
        >
          <path
            id="Path_7524"
            data-name="Path 7524"
            d="M10.5,10.5,29.1,29.1"
            transform="translate(-10.5 -10.5)"
            fill="none"
            stroke="#ef476f"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
          <path
            id="Path_7525"
            data-name="Path 7525"
            d="M10.5,29.1H29.1V10.5"
            transform="translate(-10.5 -10.5)"
            fill="none"
            stroke="#ef476f"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
          />
        </g>
      </g>
    </svg>
  );
};

export default ExpenseLogo;

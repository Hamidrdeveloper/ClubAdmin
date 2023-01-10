import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  percent: number;
};
const StarLogo = ({ percent }: Props): ReactElement => {
  return (
    <MainContainer>
      <svg xmlns="http://www.w3.org/2000/svg" width="20vw" height="20vw" viewBox="0 0 98 91.001">
        <defs>
          <linearGradient id="water" x1="0" y1="1" x2="0" y2="0">
            <stop id="stop1" stopColor="#e00084" offset={`${percent}%`} />
            <stop id="stop2" stopColor="transparent" offset={`${percent}%`} />
          </linearGradient>
        </defs>

        <path
          id="empty_star"
          data-name="empty star"
          d="M-1978.782,94.822l0-.006,9.673-34.153-28.387-22.085,36.26-1.576,12.741-33.181,11.832,30.818-.3.767-11.536.5,9.032,7-3.077,10.831,9.636-6.194,9.636,6.194-3.077-10.831,6.713-5.206,20.136.875-28.386,22.085,9.668,34.15-30.281-19.528-30.285,19.534Z"
          transform="translate(1997.494 -3.821)"
          stroke="#8c8c8c"
          strokeWidth="1.5"
          fill="url(#water)"
        />
      </svg>
    </MainContainer>
  );
};

export default StarLogo;

const MainContainer = styled.div`
  flex-grow: 2;
`;

import styled from 'styled-components';
import { Player } from 'video-react';
const MainContainer = styled.div`
  width:200px;
`;
const VideoContainer = styled(Player)`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  transition: 'all 0.5s ease';
  width:200px;
  height:150px;
`;

export default { MainContainer ,VideoContainer};

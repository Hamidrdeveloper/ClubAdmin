import styled from 'styled-components';

const ImagePreview = styled.div`
  min-height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 100%;
    height: 115px;
    object-fit: contain;
  }
`;

export default { ImagePreview };

import { Image } from 'antd';
import React, { ReactElement, useState } from 'react';

import { RoundedImageProps } from './roundedImage.entity';
import Styles from './RoundedImage.style';

const RoundedImage = ({
  image,
  hoverColor,
  roundedColor,
  imageWidth = 80,
  roundedSize = 1,
  imageHeight = 80,
  borderRadius = 25,
}: RoundedImageProps): ReactElement => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Styles.MainContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        background: `${isHover && hoverColor ? hoverColor : roundedColor}`,
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        borderRadius: borderRadius ? `${borderRadius}px` : '50%',
      }}
    >
      <Image
        style={{
          width: `${imageWidth - roundedSize}px`,
          height: `${imageHeight - roundedSize}px`,
        }}
        src={image}
        preview={false}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = require('@src/assets/images/global/placeholder.jpeg');
        }}
      />
    </Styles.MainContainer>
  );
};

export default RoundedImage;

import React, { ReactElement } from 'react';

import Styles from './TitleDivider.style';

export default function TitleDivider({ title }: { title: string }): ReactElement {
  return (
    <Styles.MainContainer className="title-divider">
      {title}
      <div />
    </Styles.MainContainer>
  );
}

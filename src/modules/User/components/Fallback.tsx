import React, { ReactElement } from 'react';

const Fallback = (): ReactElement => {
  // TODO: LINK to previous route
  return <h1>OOOPS!! YOU HAVE NO USER_ID, Head To User List Page</h1>;
};

export default Fallback;

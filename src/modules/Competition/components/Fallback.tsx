import React, { ReactElement } from 'react';

const Fallback = ({ title }: { title: string }): ReactElement => {
  return (
    <div>
      Invalid {title} <pre>Head back to previous page</pre>
    </div>
  );
};

export default Fallback;

import { Button } from 'antd';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const Fallback = (): ReactElement => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      Partner ID Is Not Available
      <Button onClick={clickHandler}>Head Back</Button>
    </div>
  );
};

export default Fallback;

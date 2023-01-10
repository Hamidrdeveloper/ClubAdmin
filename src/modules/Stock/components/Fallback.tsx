import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Fallback = (): ReactElement => {
  return (
    <>
      <h1>OOOPS!! Looks like you have no warehouse_id, Head back to Stock list.</h1>
      <Link to={'../'}>Product List</Link>
    </>
  );
};

export default Fallback;

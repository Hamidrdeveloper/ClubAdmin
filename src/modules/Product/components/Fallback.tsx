import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Fallback = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('Product.FallBack')}</h1>
      <Link to={'../'}>{t('Product.ProductList')}</Link>
    </>
  );
};

export default Fallback;

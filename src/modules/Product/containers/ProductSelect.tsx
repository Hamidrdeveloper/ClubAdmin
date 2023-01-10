import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { Product } from '../model/Product.entity';
import ProductCategoryModule from '../Product.module';

const ProductSelect: React.FC<Partial<SuperSelectProps<Product>>> = (props) => {
  return <SuperSelect module={new ProductCategoryModule()} {...props} />;
};

export default ProductSelect;

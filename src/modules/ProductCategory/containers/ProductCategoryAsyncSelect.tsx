import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { ProductCategory } from '../model/productCategory.entity';
import ProductCategoryModule from '../ProductCategory.module';

const AsyncProductCategorySelect: React.FC<Partial<SuperSelectProps<ProductCategory>>> = (props) => {
  return (
    <SuperSelect
      searchParam="search"
      module={new ProductCategoryModule()}
      orderBy={{ 'translations.name': 'ASC' }}
      optionSelector={{ label: 'name', value: 'id' }}
      {...props}
    />
  );
};

export default AsyncProductCategorySelect;

import React, { ReactElement, useState } from 'react';

import InventoryForm from '../components/InventoryForm';
import { InventoryFormFields } from '../model/inventory';

const useInventoryFilter = (): [number | null, number | undefined, ReactElement] => {
  const [storageVariationId, setStorageVariationId] = useState<number | null>(null);
  const [productVariationId, setProductVariationId] = useState<number | undefined>(undefined);

  const formSubmitHandler = (formValues: InventoryFormFields) => {
    const { product_variation, storage_variation } = formValues;

    setProductVariationId(product_variation?.id);
    setStorageVariationId(storage_variation?.id);
  };

  return [storageVariationId, productVariationId, <InventoryForm onSubmit={formSubmitHandler} />];
};
export default useInventoryFilter;

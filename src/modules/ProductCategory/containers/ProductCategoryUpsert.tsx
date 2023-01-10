/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import ProductCategoryForm from '../components/ProductCategoryForm';
import { ProductCategoryFormContext } from '../model';
import { ProductCategory } from '../model/productCategory.entity';
import ProductCategoryModule from '../ProductCategory.module';

const ProductCategoryUpsert: FC<GlobalUpsertProps<ProductCategory>> = ({ onCallback, singleData }) => {
  const module = new ProductCategoryModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<ProductCategory>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<ProductCategory>) => {
    const { parent, translate, ...restVars } = formValues;

    const values: Partial<ProductCategoryFormContext> = {
      ...restVars,
      parent_id: parent ? parent.id : null,
      translate: normalizeTranslate(translate),
    };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <ProductCategoryForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default ProductCategoryUpsert;

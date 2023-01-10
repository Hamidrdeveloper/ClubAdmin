/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { notification } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import ProductForm from '../components/ProductForm';
import { ProductFormContext } from '../model';
import { Product } from '../model/Product.entity';
import ProductCategoryModule from '../Product.module';

const ProductUpsert: React.FC<GlobalUpsertProps<Product>> = ({ onCallback, singleData }) => {
  const module = new ProductCategoryModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Product>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const { t } = useTranslation();
  const handleFormSubmit = (formValues: Partial<Product>) => {
    const { productCategories, file, file_id, ...restVars } = formValues;

    if (!file && !file_id) {
      notification.error({
        message: t('Product.RequiredFile'),
        description: t('Product.RequiredFileDescription'),
      });
    } else if (
      restVars.min_order_quantity &&
      restVars.max_order_quantity &&
      Number(restVars.min_order_quantity) > Number(restVars.max_order_quantity)
    ) {
      notification.error({
        message: t('Product.Error'),
        description: t('Product.MinOrderQuantity'),
      });
    } else {
      const values: Partial<ProductFormContext> = {
        ...restVars,
        file,
        file_id,
        product_category_ids: productCategories?.map((product) => product.id),
      };
      mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
    }
  };
  return <ProductForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default ProductUpsert;

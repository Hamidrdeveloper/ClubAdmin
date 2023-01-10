import { AttributeTypes } from '@src/modules/AttributeType';
import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationAttributesForm from '../components/VariationAttributesForm';
import { VariationAttributes, VariationAttributesContext } from '../model/ProductVariation-args';
import { updateVariationAttributes } from '../services';

const VariationAttributesUpsert: React.FC<
  GlobalUpsertProps<VariationAttributes> & { variationId: number; isFetching: boolean }
> = ({ onCallback, singleData, variationId, isFetching }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationAttributesContext>) =>
    updateVariationAttributes(variationId, values),
  );

  const [attributeTypes, setAttributeTypes] = useState<AttributeTypes[]>([]);

  const handleFormSubmit = (formValues: VariationAttributes) => {
    const { productVariationCategories, attributes } = formValues;

    const finalValues: VariationAttributesContext = {
      attributes: attributes.map(({ attributeType, attributeTypeOption, visible }) => ({
        attribute_type_id: attributeType?.id,
        attribute_type_option_id: attributeTypeOption?.id,
        visible,
      })),
      productVariationCategories: productVariationCategories?.map((category) => category.id) ?? undefined,
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };

  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.Attributes') })} />
      ) : (
        <VariationAttributesForm
          initialValues={singleData}
          onSubmit={handleFormSubmit}
          isPending={isLoading}
          attributeTypes={attributeTypes}
          setAttributeTypes={setAttributeTypes}
        />
      )}
    </>
  );
};

export default VariationAttributesUpsert;

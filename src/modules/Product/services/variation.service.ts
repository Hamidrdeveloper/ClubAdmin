import i18n from '@src/core/i18n/config';
import { AttributeTypes } from '@src/modules/AttributeType';
import AttributeTypeModule from '@src/modules/AttributeType/AttributeType.module';
import { Barcode } from '@src/modules/Barcode';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import {
  VariationAttributes,
  VariationAttributesContext,
  VariationFiles,
  VariationMultiProduct,
  VariationMultiProductContext,
  VariationPackage,
  VariationPackageContext,
  VariationPrices,
  VariationPricesContext,
  VariationSettings,
  VariationSettingsContext,
  VariationTranslate,
  VariationVats,
  VariationVatsContext,
} from '../model/ProductVariation-args';
import { ProductVariation } from '../model/ProductVariation.entity';

const entity = '/product-variations';

export const getOneVariation = async (id: number): Promise<ProductVariation> => {
  const api = new ApiBuilder<ProductVariation>('product-variations');

  return await api.getOne(id);
};

const settingsAPI = new ApiBuilder<VariationSettings>(
  'product-variations/setting-tab',
  i18n.t('Product.Variation.Title'),
);
export const createVariation = async (
  values: Partial<VariationSettingsContext>,
): Promise<VariationSettings> => {
  return await settingsAPI.createOne(values);
};

export const updateVariation = async (
  id: number,
  values: Partial<VariationSettingsContext>,
): Promise<VariationSettings> => {
  try {
    type Res = AxiosResponse<{ data: VariationSettings }>;
    const response: Res = await axios.put(`${entity}/${id}/setting-tab`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationText = async (
  id: number,
  values: Partial<VariationTranslate>,
): Promise<VariationTranslate> => {
  try {
    type Res = AxiosResponse<{ data: VariationTranslate }>;
    const response: Res = await axios.put(`${entity}/${id}/text-tab`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationPrices = async (
  id: number,
  values: Partial<VariationPricesContext>,
): Promise<VariationPrices> => {
  try {
    type Res = AxiosResponse<{ data: VariationPrices }>;
    const response: Res = await axios.put(`${entity}/${id}/prices`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationPackages = async (
  id: number,
  values: Partial<VariationPackageContext>,
): Promise<VariationPackage> => {
  try {
    type Res = AxiosResponse<{ data: VariationPackage }>;
    const response: Res = await axios.put(`${entity}/${id}/sync-product-variation-package`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationVats = async (
  id: number,
  values: Partial<VariationVatsContext>,
): Promise<VariationVats> => {
  try {
    type Res = AxiosResponse<{ data: VariationVats }>;
    const response: Res = await axios.put(`${entity}/${id}/vats`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationMultiProduct = async (
  id: number,
  values: Partial<VariationMultiProductContext>,
): Promise<VariationMultiProduct> => {
  try {
    type Res = AxiosResponse<{ data: VariationMultiProduct }>;
    const response: Res = await axios.put(`${entity}/${id}/multi-product-variations`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAttributeTypes = async (productVariationCategoryIds: string): Promise<AttributeTypes[]> => {
  try {
    const attrTypeModule = new AttributeTypeModule();
    const attrTypes = await attrTypeModule.apiService.getAll({
      extra: `?${productVariationCategoryIds}`,
      pagination: { per_page: 200 },
    });

    return attrTypes.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationAttributes = async (
  id: number,
  values: Partial<VariationAttributesContext>,
): Promise<VariationAttributes> => {
  try {
    type Res = AxiosResponse<{ data: VariationAttributes }>;
    const response: Res = await axios.put(`${entity}/${id}/attribute-tab`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateVariationFiles = async (
  id: number,
  values: Partial<VariationFiles>,
): Promise<ProductVariation> => {
  try {
    type Res = AxiosResponse<{ data: ProductVariation }>;
    const response: Res = await axios.put(`${entity}/${id}/sync-product-variation-files`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Product.Variation.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const generateBarcode = async (barcodeType: string): Promise<Barcode> => {
  try {
    const response: AxiosResponse<{ data: Barcode }> = await axios.get(`barcodes/generate`, {
      params: { type: barcodeType },
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

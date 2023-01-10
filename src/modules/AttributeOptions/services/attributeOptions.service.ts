import i18n from '@src/core/i18n/config';
import { AttributeTypes } from '@src/modules/AttributeType';
import AttributeTypeModule from '@src/modules/AttributeType/AttributeType.module';
import { attributeTypeIdAtom } from '@src/modules/AttributeType/service/attributeTypeStore';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { AT_Options } from '../model/attributeOptions.entity';

const optionStore = atom([]);

const module = new AttributeTypeModule();

export const attributeOptionsAtom = atomWithQuery((get) => ({
  queryKey: ['attributeOptions', get(optionStore), get(attributeTypeIdAtom)],

  queryFn: async (): Promise<AT_Options[]> => {
    const typeId = get(attributeTypeIdAtom);
    if (!typeId) return [];

    const attributeType: AttributeTypes = await module.apiService.getOne(typeId);
    return attributeType?.attributeTypeOptions;
  },
}));

export const deleteSingleOption = async (id: number): Promise<number> => {
  try {
    const response: AxiosResponse = await axios.delete(`attribute-type-options/${id}`);

    message.success(i18n.t('Global.DeletedSuccessfully', { title: 'Option' }));
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
};

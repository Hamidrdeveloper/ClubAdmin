import i18n from '@src/core/i18n/config';
import { CompanyFormCtx, CompanyModel } from '@src/modules/Company/model/company.entity';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

export async function createCompanyByPartnerService(values: CompanyFormCtx): Promise<CompanyModel> {
  try {
    const response: AxiosResponse<{ data: CompanyModel }> = await axios.post(`companies/partner`, values);
    message.success(i18n.t('Company.SuccessfullyCreated'));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateCompanyByPartnerService(
  values: CompanyFormCtx,
  id: number,
): Promise<CompanyModel> {
  try {
    const response: AxiosResponse<{ data: CompanyModel }> = await axios.put(
      `companies/${id}/partner`,
      values,
    );
    message.success(i18n.t('Company.SuccessfullyUpdated'));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

import axios, { AxiosResponse } from 'axios';

import {
  CompanyConfigFavIconFullModel,
  CompanyConfigLogoFullModel,
  CompanyConfigTitleFullModel,
} from '../model/companyConfig.entity';

export async function getCompanyTitleViaCompanyId(companyId: number): Promise<string> {
  try {
    const response: AxiosResponse<CompanyConfigTitleFullModel> = await axios.get(`settings/website-title`, {
      params: { company_id: companyId },
    });

    return response.data.data.title;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getLogoPathViaCompanyId(companyId: number): Promise<string> {
  try {
    const response: AxiosResponse<CompanyConfigLogoFullModel> = await axios.get(`settings/logo`, {
      params: { company_id: companyId },
    });

    return response.data.data.file_path;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getFavIconPathViaCompanyId(companyId: number): Promise<string> {
  try {
    const response: AxiosResponse<CompanyConfigFavIconFullModel> = await axios.get(`settings/favicon`, {
      params: { company_id: companyId },
    });

    return response.data.data.file_path;
  } catch (e) {
    throw new Error(e);
  }
}

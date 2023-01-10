import { DownloadCategoryModel } from '@src/modules/Download/model/DownloadCategory.entity';
import axios, { AxiosResponse } from 'axios';

export async function getAllDownloadCategories(): Promise<DownloadCategoryModel[]> {
  try {
    const response: AxiosResponse<{ data: DownloadCategoryModel[] }> = await axios.get(
      'download-categories/tree',
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

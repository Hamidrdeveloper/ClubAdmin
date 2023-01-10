import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import axios from 'axios';

import { DownloadFileModel } from '../model/DownloadFile.entity';

export const downloadFilesApi = new ApiBuilder<DownloadFileModel>(
  `download-files`,
  i18n.t('Download.File.Title'),
);

export async function getAllDownloadFiles(categoryId: number): Promise<DownloadFileModel[]> {
  const response = await (
    await downloadFilesApi.getAll({ params: { downloadCategoryIds: [categoryId] } })
  ).data;
  return response;
}

export async function deleteDownloadFile(id: number): Promise<void> {
  try {
    await axios.delete(`download-files/${id}`);
  } catch (e) {
    throw new Error(e);
  }
}

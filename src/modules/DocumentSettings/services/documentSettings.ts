import { Env } from '@src/core';
import axios, { AxiosResponse } from 'axios';

import { DocumentSettingsModel } from '../model/DocumentSettings.entity';

export async function getSingleDocumentSettings(id: number): Promise<DocumentSettingsModel> {
  try {
    const response: AxiosResponse<DocumentSettingsModel> = await axios.get(
      `/document-setting-templates/${id}`,
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getDocumentSettingPreviewLink(id: number): Promise<string> {
  try {
    const response: AxiosResponse<{ data: DocumentSettingsModel }> = await axios.get(
      `document-setting-templates/${id}/preview`,
    );

    const previewLink = Env.PURE_URL + '/' + response.data.data?.preview_link;

    return previewLink;
  } catch (e) {
    throw new Error(e);
  }
}

export async function setDocumentSettingToDefault(id: number): Promise<void> {
  try {
    await axios.put(`document-setting-templates/${id}/default`);
  } catch (e) {
    throw new Error(e);
  }
}

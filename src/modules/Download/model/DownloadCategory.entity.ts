import { GeneralTranslate, TranslateContext } from '@src/shared/models';

interface DownloadsPure {
  id: number;
  file: File;
  slug: string;
  name: string;
  sort: number;
  file_id: number;
  file_path: string;
  is_active: boolean;
  created_at: string;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface DownloadCategoryModel extends DownloadsPure {
  parent: DownloadCategoryModel;
  children: DownloadCategoryModel[];
}

export interface DownloadCategoryFormCtx extends DownloadsPure {
  parent_id: number;
}

export interface File {
  id: number;
  name: string;
  type: string;
  enabled: boolean;
  extension: string;
  created_at: string;
  updated_at: string;
  root_file: RootFile;
}

interface RootFile {
  id: number;
  path: string;
  size: number;
  mime_type: string;
}

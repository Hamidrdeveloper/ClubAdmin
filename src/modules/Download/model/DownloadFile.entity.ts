import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { Country } from '@src/modules/Country';
import { CustomerStepModel } from '@src/modules/CustomerStep/model/CustomerStep.entity';
import { Language } from '@src/modules/Language';

import { DownloadCategoryModel, File } from './DownloadCategory.entity';

interface DownloadFilePure {
  id: number;
  name: string;
  file_id: number | undefined;
  image_id: number | undefined;
  is_active: boolean;
  created_at: string;
  image_path: string | null;
}
export interface DownloadFileModel extends DownloadFilePure {
  file: File | null;
  image: File | null;
  countries: Country[] | null;
  languages: Language[] | null;
  careerSteps: CareerStepModel[] | null;
  customerSteps: CustomerStepModel[] | null;
  downloadCategories: DownloadCategoryModel[] | null;
}

export interface DownloadFileFormCtx extends DownloadFilePure {
  country_ids: number[];
  language_ids: number[];
  career_step_ids: number[];
  customer_step_ids: number[];
  download_category_ids: number[];
}

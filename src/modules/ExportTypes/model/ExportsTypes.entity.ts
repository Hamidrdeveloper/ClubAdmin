import { ExportSettingModel } from '@src/modules/ExportSettings/model/ExportsSettings.entity';

export enum DataTypes {
  INT = 'int',
  DATE = 'date',
  BOOL = 'bool',
  ARRAY = 'array',
  STRING = 'string',
}

interface ExportTypePure {
  id: number;
  name: string;
  headers: string[];
  created_at: string;
  filters: Record<string, DataTypes>;
  settings: Record<string, DataTypes>;
  filter_links: Record<string, string>;
}

export interface ExportTypeModel extends ExportTypePure {
  exportDataSettings: ExportSettingModel[];
}

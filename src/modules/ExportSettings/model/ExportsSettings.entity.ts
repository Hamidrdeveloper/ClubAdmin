import { DataTypes, ExportTypeModel } from '@src/modules/ExportTypes/model/ExportsTypes.entity';

interface ExportSettingPure {
  id: number;
  name: string;
  created_at: string;
  export_data_type_id: number;
}

export interface ExportSettingModel extends ExportSettingPure {
  data: Record<string, DataTypes>;
  exportDataType: ExportTypeModel;
}

export interface ExportSettingFormContext extends ExportSettingPure {
  data: Record<string, unknown>;
}

export interface ExportDataResponseModel {
  message: 'Export started!';
}

import { File } from '@src/modules/Download/model/DownloadCategory.entity';
import { ExportSettingModel } from '@src/modules/ExportSettings/model/ExportsSettings.entity';
import { User } from '@src/modules/User';

interface ExportLogsPure {
  id: number;
  file_path: string;
  created_by: number;
  created_at: string;
  export_data_setting_id: number;
}

export interface ExportLogsModel extends ExportLogsPure {
  file: File;
  createdBy: User;
  exportDataSetting: ExportSettingModel;
}

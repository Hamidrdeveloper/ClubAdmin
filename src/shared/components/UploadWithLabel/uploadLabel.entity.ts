import { FormInstance } from 'antd';

export interface UploadProps {
  value?: string;
  pathName?: string;
  idName?: string | (string | number)[];
  disabled?: boolean;
  form: FormInstance;
  type?: 'dragger' | 'normal';
  valueName?: string;
  requestHeaders?: Record<string, string>;
}

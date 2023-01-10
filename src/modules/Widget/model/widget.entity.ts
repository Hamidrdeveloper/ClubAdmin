import { DefaultTheme } from 'styled-components';

export interface Widget {
  id: number;
  slug: string;
  title: string;
  content: string;
  is_active: boolean;
  data: string | null;
  created_at: string | Date;
  widgetFiles: WidgetFile[];
  translate: WidgetTranslate[];
}

export interface WidgetTranslate {
  widget_id: number;
  locale: string;
  title: string;
  content: string;
}
export interface WidgetFile {
  id: number;
  file_id: number;
  widget_id: number;
  file_path: string | null;
  is_active: boolean;
  data: unknown | null;
  created_at: string | Date;
  title: string;
  content: string;
  file: FileRoot;
  translate: WidgetFileTranslate[];
}

export interface WidgetFileTranslate {
  locale: string;
  title: string;
  content: string;
  widget_file_id: number;
}

interface FileRoot {
  id: number;
  extension: string;
  enabled: boolean;
  name: string;
  type: string;
  root_file: {
    id: number;
    path: string;
    size: number;
    mime_type: string;
  };
  created_at: string | Date;
  updated_at: string | Date;
}

export interface ThemeContext {
  id: number;
  slug: string;
  data: DefaultTheme;
  partner_id: number;
}

export interface LogoContext {
  slug: string;
  data: { file_id: number; file_path: string | null };
  subdomain_id: string | null;
  company_id: string | null;
  partner_id: string | null;
}

export interface TitleContext {
  slug: string;
  data: { title: string };
  subdomain_id: string | null;
  partner_id: string | null;
  company_id: string | null;
}

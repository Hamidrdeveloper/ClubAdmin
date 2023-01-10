import { Route } from 'antd/es/breadcrumb/Breadcrumb';

export interface ModalHeaderProps {
  title?: string;
  items?: Route[];
  onClose?: () => void;
  hideBackBtn?: boolean;
}

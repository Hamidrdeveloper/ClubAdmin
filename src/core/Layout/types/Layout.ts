export interface SidebarMenus {
  id: string;
  icon: string;
  title: string;
  linkPath: string;
  isVisible: string;
  collapsed: boolean;
  permission: string;
  translate_title: string;
  children: SidebarChildMenu[];
}

export interface SidebarChildMenu {
  title: string;
  translate_title: string;
  permission: string;
  link: string | null;
}

export interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: (val: boolean) => void;
}

export interface SidebarContainerProps {
  isPartner: boolean;
  collapsed: boolean;
}

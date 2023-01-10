import { FolderOpenFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { EmailTemplates } from '../model/email.entity';
import Style from './styles/TemplateSideBar.style';

const { SubMenu } = Menu;

interface SidebarProps {
  templates: EmailTemplates[];
  selectedKeys: string[];
  onSelectMenu: (index: string[]) => void;
}

const TemplateSideBar: React.FC<SidebarProps> = ({ onSelectMenu, templates, selectedKeys }) => {
  const { t } = useTranslation();
  const handleClick = (data: { selectedKeys: string[] }) => {
    onSelectMenu(data.selectedKeys);
  };

  return (
    <Style.MainContainer>
      <Menu className="menu" mode="inline" onSelect={handleClick} selectedKeys={selectedKeys}>
        <SubMenu key="sub1" icon={<FolderOpenFilled />} title={t('Email.Field.GeneralEmailTemplates')}>
          {templates.map((template) => (
            <Menu.Item key={String(template.id)}>{template.name}</Menu.Item>
          ))}
        </SubMenu>
        <SubMenu key="sub2" disabled icon={<FolderOpenFilled />} title={t('Email.Field.MyEmailTemplates')} />
        <SubMenu
          key="sub4"
          disabled
          icon={<FolderOpenFilled />}
          title={t('Email.Field.EmailTemplatesFromOtherUsers')}
        />
      </Menu>
    </Style.MainContainer>
  );
};

export default TemplateSideBar;

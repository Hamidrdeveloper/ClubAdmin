import Icon from '@ant-design/icons';
import LanguageSvg from '@src/assets/icons/other/language.svg';
import React, { ReactElement } from 'react';

export default function LanguageIcon({ className }: { className: string }): ReactElement {
  return <Icon component={LanguageSvg} className={className} />;
}

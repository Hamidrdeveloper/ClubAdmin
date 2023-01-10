import i18n from '@src/core/i18n/config';
import React, { ReactElement } from 'react';

import Styles from './styles/CustomTab.style';

const CustomTab = (): ReactElement => {
  return (
    <Styles.Tab className="customTab">
      <label htmlFor="switch-1">{i18n.t('Global.MultiProductVariation')}</label>
      <Styles.Checkbox>
        <input type="checkbox" className="iosToggleButton" id="switch-1" />
        <label htmlFor="switch-1" className="iosLabel"></label>
      </Styles.Checkbox>
    </Styles.Tab>
  );
};

export default CustomTab;

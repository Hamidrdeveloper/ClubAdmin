/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { legalPagesObject as legalPages } from '@src/core/Authentication/pages/LegalsPage';
import i18n from '@src/core/i18n/config';
import { Space } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Styles from './Footer.style';

export default function Footer(): ReactElement {
  return (
    <Styles.Footer>
      <Space>{"Club Admin"}</Space>
      {/* {Object.entries(legalPages).map(([key, pageInfo]) => (
        <Link key={key} target={'_blank'} to={`${pageInfo.link}`}>
          {pageInfo.title}
        </Link>
      ))} */}
    </Styles.Footer>
  );
}

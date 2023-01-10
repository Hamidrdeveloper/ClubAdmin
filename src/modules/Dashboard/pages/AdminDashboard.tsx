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
// NOTE: We no longer using this file
import { Alert, Col, Row } from 'antd';
import React from 'react';

import IntroduceRow from '../components/IntroduceRow';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import TopSearch from '../components/TopSearch';

const Dashboard: React.FC = () => {
  return (
    <Row gutter={[32, 32]}>
      
    </Row>
  );
};

export default Dashboard;

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
import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import AttributeTypePage from './AttributeType.page';
import AttributeTypeManage from './AttributeTypeManage.page';
import AttributeTypeUpsertPage from './AttributeTypeUpsert.page';

function AttributeTypeRoute(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<AttributeTypePage />} />
      <Route path={`/upsert`} element={<AttributeTypeUpsertPage />} />
      <Route path={`/upsert/:attributeType_id`} element={<AttributeTypeUpsertPage />} />
    </Routes>
  );
}

export default AttributeTypeRoute;

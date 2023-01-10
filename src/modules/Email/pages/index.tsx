import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import AutomaticManage from './Automatic.page';
import InfoServiceManage from './InfoService.page';
import LoginDetailManage from './LoginDetail.page';
import NewsLetterManage from './NewsLetter.page';
import TemplateManage from './NoticeTemplatePage';
import NoticeTemplateUpsertPage from './NoticeTemplateUpsert.page';
import SignatureManage from './Signature.page';

export default function EmailRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={`info-service`} element={<InfoServiceManage />} />
      <Route path={`news-letter`} element={<NewsLetterManage />} />
      <Route path={`automatic`} element={<AutomaticManage />} />
      <Route path={`login-detail`} element={<LoginDetailManage />} />
      <Route path={`signature`} element={<SignatureManage />} />
      <Route path={`template`} element={<TemplateManage />} />
      <Route path={`template/upsert`} element={<NoticeTemplateUpsertPage />} />
      <Route path={`template/upsert/:template_id`} element={<NoticeTemplateUpsertPage />} />
    </Routes>
  );
}

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PriceManagePage from './Comment.page';

export default function PageRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PriceManagePage />} />
      {/* TODO: Comment has no upsert Container */}
      {/* <Route path={`/upsert`} element={<CommentUpsertPage />} />
      <Route path={`/upsert/:comment_id`} element={<CommentUpsertPage />} /> */}
    </Routes>
  );
}

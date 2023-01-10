import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BillsManagePage from './Bill.page';
import BillDescriptionPage from './Description.page';
import BillPositionPage from './Position.page';

export default function BillsRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<BillsManagePage />} />
      <Route path={`/description/:bill_id`} element={<BillDescriptionPage />} />
      <Route path={`/description/:bill_id/positions/:position_id`} element={<BillPositionPage />} />
    </Routes>
  );
}

export async function* automatePaginateByAPIService<T>({
  service,
  params,
}: {
  service: ApiBuilder<T>;
  params: Record<string, any>;
}): AsyncGenerator<ResponseContext<T[]>, void, unknown> {
  const pagination = { page: 1, per_page: 100 };
  while (pagination.page !== 0) {
    const result = await service.getAll({
      orderBy: params.orderBy,
      params: { ...params, ...pagination, orderBy: undefined },
      pagination,
    });
    yield result;

    if ((result.meta.last_page ?? 0) > (result.meta.current_page ?? 1)) pagination.page++;
    else pagination.page = 0;

    if (pagination.page === 6) {
      pagination.per_page = 500;
      pagination.page = 2;
    }
  }
}

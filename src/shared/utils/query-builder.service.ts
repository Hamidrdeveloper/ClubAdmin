import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { UseQueryResult, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { PaginationRequest, ResponseContext } from '../models';
import { ApiBuilder } from './api-builder.service';

export function useGetAllQuery<T>({
  service,
  params = {},
  orderBy: _orderBy = undefined,
}: {
  service: ApiBuilder<T>;
  params?: Record<string, unknown>;
  orderBy?: Record<string, 'ASC' | 'DESC'>;
}): UseQueryResult<ResponseContext<T[]>> {
  const { search, pathname } = useLocation();
  const [pagination, setPagination] = useState<PaginationRequest>();
  const [orderBy, setOrderBy] = useState<Record<string, 'ASC' | 'DESC'> | undefined>(_orderBy);

  useEffect(() => {
    if (_orderBy) {
      setOrderBy(_orderBy);
    }
  }, [_orderBy]);

  useEffect(() => {
    const { query } = queryString.parseUrl(pathname + search);

    const pageQueries: PaginationRequest = {
      page: query.page ? Number(query.page) : 1,
      per_page: query.per_page ? Number(query.per_page) : 10,
      search: query.search ? String(query.search) : undefined,
    };

    if (query.orderBy) {
      setOrderBy(JSON.parse(query.orderBy as string));
    } else if (params?.orderBy) {
      setOrderBy(params.orderBy as Record<string, 'ASC' | 'DESC'>);
    } else {
      setOrderBy(undefined);
    }

    setPagination(pageQueries);
  }, [search]);

  return useQuery<ResponseContext<T[]>, Error>(
    [service.entity, { pagination, params, orderBy }],
    () => service.getAll({ pagination, params, orderBy }),
    { enabled: !!pagination },
  );
}

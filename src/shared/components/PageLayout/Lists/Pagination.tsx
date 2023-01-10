import { PaginationContext, PaginationRequest } from '@src/shared/models';
import { Row } from 'antd';
import { Pagination } from 'antd';
import queryString from 'query-string';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PaginationProps } from './ListView.type';

export default function MainPagination({
  pagination,
  isPending,
  onChange,
  dontNavigate = false,
}: PaginationProps): ReactElement {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const [innerPagination, setPagination] = useState<PaginationContext>();

  useEffect(() => {
    if (pagination) {
      setPagination(pagination);
    }
  }, [pagination]);

  const handleChange = (page: number, per_page: number) => {
    if (!dontNavigate) {
      const { query } = queryString.parseUrl(pathname + search);

      const pageQueries: PaginationRequest = {
        orderBy: query.orderBy as string,
        search: query.search ? String(query.search) : undefined,
        page: Number(query.page) === page ? Number(query.page) : page,
        per_page: Number(query.per_page) === per_page ? Number(query.per_page) : per_page,
      };

      navigate(`?${queryString.stringify(pageQueries, { encode: false })}`);
    } else if (onChange) {
      onChange(page, per_page);
    }
  };

  return (
    <Row justify="center" style={{ padding: '32px 0' }}>
      <Pagination
        showSizeChanger
        showQuickJumper
        disabled={isPending}
        onChange={handleChange}
        total={innerPagination?.total}
        current={innerPagination?.current_page}
        pageSize={innerPagination?.per_page || 10}
      />
    </Row>
  );
}

import { FilterColumns } from '@src/shared/components/PageLayout/Lists/ListView.type';
import { ResponseMeta } from '@src/shared/models';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { ColumnsType } from 'antd/lib/table';
import { SorterResult } from 'antd/lib/table/interface';
import { useCallback, useEffect, useState } from 'react';

import { BillColumns } from '../components/BillsTableInfo';
import { ABill } from '../model/bill.entity';
import { getAllAbills } from '../service/bills.service';

interface HooksType {
  items: ABill[];
  error: unknown;
  loading: boolean;
  hasNextPage: boolean;
  metaData?: ResponseMeta;
  filterColumns: FilterColumns[];
  tableColumns: ColumnsType<ABill>;
  isFilterVisible: boolean;
  selectedFilters: FilterColumns[];
  performedFilters: Record<string, unknown>;
  onResetFilters: () => void;
  onSearchText: (text?: string) => void;
  setFilterVisible: (data: boolean) => void;
  setSelectedFilters: (filters: FilterColumns[]) => void;
  setPerformedFilters: (filters: Record<string, unknown>) => void;
  loadBills: (pageNumber?: number) => void;
  onSortChange: (p: TablePaginationConfig, f: Record<string, any>, sorter: SorterResult<ABill>) => void;
}

export function useLoadItems(): HooksType {
  const [isFilterVisible, setFilterVisible] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterColumns[]>([]);
  const [performedFilters, setPerformedFilters] = useState<Record<string, unknown>>({});

  const [filterColumns, setFilterColumns] = useState<FilterColumns[]>([]);
  const [orderByField, setOrderByField] = useState<Record<string, unknown>>({});

  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ABill[]>([]);
  const [metaData, setMetaData] = useState<ResponseMeta>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [tableColumns, setTableColumns] = useState<ColumnsType<ABill>>([]);

  const columnOrderCallback = useCallback(async () => {
    if (Object.keys(orderByField).length > 0) {
      loadBills(1);
    }
  }, [orderByField]);

  const resultFilterCallback = useCallback(async () => {
    if (Object.keys(performedFilters).length > 0) {
      loadBills(1);
    }
  }, [performedFilters]);

  useEffect(() => {
    columnOrderCallback();
  }, [columnOrderCallback]);

  useEffect(() => {
    resultFilterCallback();
  }, [resultFilterCallback]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSortChange = (p: TablePaginationConfig, f: Record<string, any>, sorter: SorterResult<ABill>) => {
    if (sorter && sorter.columnKey && sorter.order && sorter.column && sorter.column.dataIndex) {
      const dataIndex = sorter.column.dataIndex as string;
      setOrderByField({ [dataIndex]: sorter.order === 'ascend' ? 'ASC' : 'DESC' });

      setTableColumns(
        tableColumns.map((column) =>
          column['dataIndex'] !== dataIndex ? column : { ...column, defaultSortOrder: sorter.order },
        ),
      );
    } else {
      setOrderByField({});
    }
  };

  const onSearchText = (text?: string) => {
    loadBills(1, false, text);
  };

  const onResetFilters = () => {
    setPerformedFilters({});
    setSelectedFilters([]);
    loadBills(1, true);
  };

  async function loadBills(pageNumber?: number, isResetFilters = false, search = '') {
    setLoading(true);
    try {
      const normalizedPerformedFilters = normalizeValuesOfPerformedFilters(performedFilters);

      const searchParam = Boolean(search) ? search : undefined;
      const reqParams = isResetFilters
        ? { orderBy: orderByField, search: searchParam }
        : { ...normalizedPerformedFilters, orderBy: orderByField, search: searchParam };
      
      const { data, meta } = await getAllAbills({ page: pageNumber ?? page, params: reqParams });
      setItems((current) => (pageNumber ? data : [...current, ...data]));

      const lastPage = meta.last_page;
      const currentPage = meta.current_page;
      setHasNextPage(Number(currentPage) < Number(lastPage));
      if (currentPage === 1) {
        setMetaData(meta);
        setFilterColumns(createFilterArray(meta));

        if (Object.keys(orderByField).length === 0) {
          const defaultTableColumns = BillColumns();

          setTableColumns(
            defaultTableColumns.map((column) => {
              return (meta.orderByColumns || []).includes(column['dataIndex'] as string)
                ? { ...column, sorter: true }
                : column;
            }),
          );
        }
      }
      if (Number(currentPage) < Number(lastPage)) {
        setPage(Number(currentPage) + 1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function normalizeValuesOfPerformedFilters(performedFilters: Record<string, any>): Record<string, unknown> {
    const filterCopy = { ...performedFilters };

    for (const key in filterCopy) {
      if (filterCopy?.[key]?.value !== undefined) {
        filterCopy[key] = filterCopy[key].value;
      }
    }

    return filterCopy;
  }

  return {
    error,
    items,
    loading,
    metaData,
    hasNextPage,
    tableColumns,
    filterColumns,
    isFilterVisible,
    setFilterVisible,
    selectedFilters,
    setSelectedFilters,
    performedFilters,
    setPerformedFilters,
    onSearchText,
    onResetFilters,
    loadBills,
    onSortChange,
  };
}

function createFilterArray(metaData: ResponseMeta): FilterColumns[] {
  const filtersArr: FilterColumns[] = [];

  if (metaData.filters) {
    Object.keys(metaData.filters).forEach((key) => {
      const filterValue = metaData.filters[key];
      if (key !== 'ids') {
        filtersArr.push({
          key,
          type: filterValue,
          isSelect: String(key).includes('Id'),
          selectUrl: String(key).includes('Id') ? metaData.filterLinks[key] : undefined,
        });
      }
    });

    // NOTE: Sort By Type -> 1. String 2. Number(int, float) - 3. Select - 4.Bool
    filtersArr.sort((a, b) => {
      switch (a.type) {
        case 'string':
          return -1;

        case 'float':
          return b.type === 'string' ? 1 : -1;

        case 'int':
          if (!a.isSelect || !b.isSelect) return b.type === 'string' || b.type === 'float' ? 1 : -1;
          else if (a.isSelect && !b.isSelect) return 1;
          else if (!a.isSelect && b.isSelect) return -1;
          else if (a.isSelect && b.isSelect) return 0;

        case 'boolean':
          return b.type === 'string' || b.type === 'int' || b.type === 'float' ? 1 : -1;

        default:
          return 0;
      }
    });
  }

  return filtersArr;
}

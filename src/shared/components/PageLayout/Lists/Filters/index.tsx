import i18n from '@src/core/i18n/config';
import FormSubmit from '@src/shared/components/FormSubmit/FormSubmit';
import { PaginationRequest } from '@src/shared/models';
import { intlDateFormat, removeId, startCase } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select, { ActionMeta } from 'react-select';
import styled from 'styled-components';

import { FilterColumns as FilterColumn } from '../ListView.type';
import AsyncFilterSelect from './AsyncFilterSelect';

type FilterTypes = {
  dontNavigate?: boolean;
  filters: FilterColumn[];
  defSelectedValues?: Record<string, unknown>;
  defSelectedFilters?: FilterColumn[];
  onSubmit: (values: Record<string, unknown>, fields?: FilterColumn[]) => void;
  onReset: () => void;
};
export const FilterContainer: React.FC<FilterTypes> = ({
  filters,
  dontNavigate,
  defSelectedFilters,
  defSelectedValues,
  onSubmit,
  onReset,
}) => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const [form] = Form.useForm();
  const [selectedFilters, setSelectedFilters] = useState<FilterColumn[]>(defSelectedFilters || []);

  useEffect(() => {
    if (defSelectedValues) {
      form.setFieldsValue(defSelectedValues || {});
    }
  }, [defSelectedValues]);

  const onFinish = (formFields) => {
    // SECTION Normalize Selects value from &countryId={"value":1,"label":"Afghanistan"} TO &countryId=1
    // store all select filter columns in an array
    const allSelects = filters.filter((filterCol) => filterCol.isSelect);

    // since we don't want to set params like: &countryId={"value":1,"label":"Afghanistan"}
    for (const { key, type } of allSelects) {
      if (type === 'array' && Array.isArray(formFields[key])) {
        formFields[key] = formFields[key].map((field) => field?.id);
      } else {
        formFields[key] = formFields[key]?.id;
      }
    }
    // ------------------------------------------

    // SECTION normalize date pickers to String
    // format (asked from backend) -> YYYY-MM-DD

    const allDatePickers = filters.filter((filterCol) => filterCol.type === 'date');

    for (const { key } of allDatePickers) {
      formFields[key] = formFields[key]?.format('YYYY-MM-DD');
    }
    // ------------------------------------------

    // SECTION normalize booleans
    // from: &isActive={"label":"Inactive","value":0}
    // to: &isActive=0
    const allBooleans = filters.filter((filter) => filter.type === 'bool' || filter.type === 'boolean');
    for (const { key } of allBooleans) {
      formFields[key] = formFields[key]?.value;
    }
    // ------------------------------------------

    if (!dontNavigate) resetPagination();

    if (defSelectedFilters !== undefined) onSubmit(formFields, selectedFilters);
    else onSubmit(formFields);
  };

  const resetPagination = () => {
    const { query } = queryString.parseUrl(pathname + search);

    const pageQueries: PaginationRequest = {
      page: query.page ? Number(query.page) : 1,
      per_page: query.per_page ? Number(query.per_page) : 10,
      search: query.search ? String(query.search) : undefined,
    };
    navigate(pageQueries);
  };

  const handleFilterSelectChange = (value: FilterColumn[], action: ActionMeta<FilterColumn>) => {
    if (action.action === 'clear') setSelectedFilters([]);
    if (value.length === 0) return handleReset();

    setSelectedFilters(value);
  };

  const handleReset = () => {
    const filterSelectValues = form.getFieldValue('filter-select');
    form.resetFields();
    form.setFieldsValue({ 'filter-select': filterSelectValues });
    onReset();
  };

  const mainSelectLabelMakerFn = useCallback((option) => {
    if (option.key === 'id') return 'ID';

    return removeId(startCase(String(option?.key)));
  }, []);

  return (
    <MainContainer>
      <Form form={form} layout={'vertical'} name="filter-form" onFinish={onFinish}>
        <Row justify="center">
          <Col span={24}>
            <div className="filter-select">
              <Form.Item name="filter-select">
                <Select
                  isMulti
                  isClearable
                  options={filters}
                  maxMenuHeight={300}
                  minMenuHeight={300}
                  value={selectedFilters}
                  classNamePrefix="react-select"
                  onChange={handleFilterSelectChange}
                  getOptionLabel={mainSelectLabelMakerFn}
                  placeholder={i18n.t('Global.SelectFilters')}
                  getOptionValue={(option) => removeId(String(option?.key))}
                />
              </Form.Item>
            </div>
          </Col>
          {selectedFilters.map((filter, index) => (
            <Col xs={24} key={`field-${index}`}>
              {filter.type === 'string' && !filter.isSelect && (
                <Form.Item label={startCase(filter.key)} name={filter.key}>
                  <Input />
                </Form.Item>
              )}
              {filter.type === 'int' && !filter.isSelect && (
                <Form.Item label={startCase(filter.key)} name={filter.key}>
                  <InputNumber />
                </Form.Item>
              )}
              {filter.type === 'float' && (
                <Form.Item label={startCase(filter.key)} name={filter.key}>
                  <InputNumber />
                </Form.Item>
              )}
              {filter.isSelect && filter.selectUrl && (
                <Form.Item label={removeId(startCase(filter.key))} name={filter.key}>
                  <AsyncFilterSelect
                    url={filter.selectUrl}
                    isMulti={filter.type === 'array'}
                    title={removeId(startCase(filter.key))}
                  />
                </Form.Item>
              )}
              {(filter.type === 'bool' || filter.type === 'boolean') && (
                <Form.Item name={filter.key} label={startCase(filter.key)}>
                  <Select
                    isClearable
                    options={[
                      { label: 'Active', value: true },
                      { label: 'Inactive', value: false },
                    ]}
                  />
                </Form.Item>
              )}
              {filter.type === 'date' && (
                <Form.Item name={filter.key} label={startCase(filter.key)}>
                  <DatePicker format={intlDateFormat()} />
                </Form.Item>
              )}
            </Col>
          ))}
        </Row>
        <FormSubmit
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.submit();
          }}
          isPending={false}
          justify="center"
          disabledPrimary={selectedFilters.length === 0}
        />
        <Button danger type="link" disabled={!selectedFilters.length} onClick={handleReset}>
          <u>Reset</u>
        </Button>
      </Form>
    </MainContainer>
  );
};

export default FilterContainer;

const MainContainer = styled.div`
  padding: 16px;
  height: 100%;
  overflow: auto;

  & .filter-select {
    margin-bottom: 24px;
  }

  & .ant-form.ant-form-vertical {
    display: flex;
    flex-direction: column;
  }

  & .form-submit .ant-form-item {
    width: 100%;

    & button {
      width: 100%;
    }
  }
`;

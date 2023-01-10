import { CloseOutlined } from '@ant-design/icons';
import LayoutStyles from '@shared/components/PageLayout/Lists/ListView.style';
import FilterContainer from '@src/shared/components/PageLayout/Lists/Filters';
import { FilterColumns } from '@src/shared/components/PageLayout/Lists/ListView.type';
import { Button, Typography } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactElement;
  filters: FilterColumns[];
  isFilterVisible: boolean;
  selectedFilters: FilterColumns[];
  performedFilters: Record<string, unknown>;
  onResetFilters: () => void;
  setFilterVisible: (visible: boolean) => void;
  setSelectedFilters: (filters: FilterColumns[]) => void;
  setPerformedFilters: (filters: Record<string, unknown>) => void;
};
const BillFilters: React.FC<Props> = ({
  filters,
  children,
  isFilterVisible,
  selectedFilters,
  performedFilters,
  onResetFilters,
  setSelectedFilters,
  setPerformedFilters,
  setFilterVisible,
}) => {
  const onFilterResult = (performed: Record<string, unknown>, selected: FilterColumns[]) => {
    setSelectedFilters(selected);
    
    for (const key in performed) {
      if (typeof performed[key] === 'boolean') {
        performed[key] = performed[key]
          ? { label: 'Active', value: true }
          : { label: 'Inactive', value: false };
      }
    }
    setPerformedFilters(performed);
  };

  return (
    <MainContainer style={{ padding: '16px' }}>
      <LayoutStyles.FilterArea collapsed={isFilterVisible}>
        <LayoutStyles.FilterContainer collapsed={isFilterVisible}>
          <div className="header">
            <Typography.Title level={4}>Filter</Typography.Title>

            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => setFilterVisible(false)}
            />
          </div>

          <FilterContainer
            filters={filters}
            onReset={onResetFilters}
            onSubmit={onFilterResult}
            defSelectedValues={performedFilters}
            defSelectedFilters={selectedFilters}
          />
        </LayoutStyles.FilterContainer>
        <LayoutStyles.ListContainer collapsed={isFilterVisible}>{children}</LayoutStyles.ListContainer>
      </LayoutStyles.FilterArea>
    </MainContainer>
  );
};

export default BillFilters;

const MainContainer = styled.div`
  padding: 16px;
`;

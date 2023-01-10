import styled from 'styled-components';

const MainContainer = styled.div<{ isFormPage?: boolean; noOverflow?: boolean }>`
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;
  position: relative;
  min-height: 800px;
  overflow: ${(props) => (!props.noOverflow ? 'hidden' : 'initial')};
`;

const ListContainer = styled.div<{ collapsed: boolean }>`
  padding-bottom: 100px;
  transition: all 0.3s ease-in-out;
  width: ${(props) => (props.collapsed ? 'calc(100% - 300px)' : '100%')};

  & .pagination {
    padding: 64px 0 16px 0;
  }
`;

const FilterContainer = styled.div<{ collapsed: boolean }>`
  transition: all 0.3s ease-in-out;
  min-width: ${(props) => (props.collapsed ? '300px' : '0')};
  max-width: ${(props) => (props.collapsed ? '300px' : '0px')};
  overflow: ${(props) => (props.collapsed ? 'initial' : 'hidden')};
  min-height: 740px;
  background: #f6f9fb;
  border-bottom-left-radius: 12px;

  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    & h4 {
      margin: 0;
      white-space: nowrap;
    }
  }
`;

const FilterArea = styled.div<{ collapsed: boolean }>`
  display: flex;
`;

export default { MainContainer, ListContainer, FilterContainer, FilterArea };

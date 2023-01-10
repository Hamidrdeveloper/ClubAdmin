import styled from 'styled-components';

const ListContainer = styled.div<{ collapsed: boolean }>`
  transition: all 0.3s ease-in-out;
  overflow: auto;
  width: ${(props) => (props.collapsed ? 'calc(100% - 300px)' : '100%')};
`;

const FilterContainer = styled.div<{ collapsed: boolean }>`
  min-height: 600px;
  background: #f6f9fb;
  border-bottom-left-radius: 12px;
  transition: all 0.3s ease-in-out;
  min-width: ${(props) => (props.collapsed ? '300px' : '0')};
  max-width: ${(props) => (props.collapsed ? '300px' : '0px')};
  overflow: ${(props) => (props.collapsed ? 'initial' : 'hidden')};

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

export default { ListContainer, FilterContainer, FilterArea };

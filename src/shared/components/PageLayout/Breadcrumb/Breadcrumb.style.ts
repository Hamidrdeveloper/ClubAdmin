import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;

  .breadcrumb {
    display: flex;
    height: 50px;
    z-index: 1;

    &__inner {
      position: relative;
      z-index: 2;
    }

    & a {
      position: relative;
      display: flex;
      align-items: center;
      text-decoration: none;
      height: 100%;
      padding: 0 30px;
      background: #d1d1d1;
      color: ${({ theme }) => theme.colors.main};

      &:last-child {
        pointer-events: none;
      }

      &:not(:first-child) {
        padding-left: 50px;
      }

      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        width: 52px;
        top: -1px;
        right: -25px;
        bottom: -2px;
        background-color: #d1d1d1;
        transform: scale(0.707) rotate(45deg);
        border-top: 3px solid #eef1f6;
        border-right: 3px solid #eef1f6;
        z-index: 1;
      }

      &:last-child {
        color: #fff;
        position: relative;
        padding-right: 8px;
        background: ${({ theme }) => theme.colors.main};

        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          width: 50px;
          top: 0px;
          right: -25px;
          bottom: 0px;
          background-color: ${({ theme }) => theme.colors.main};
          transform: scale(0.707) rotate(45deg);
          z-index: 1;
        }

        &::after {
          content: none;
        }
      }

      &:first-child {
        color: #666;
        background: #fff;
        border-radius: 8px 0 0 8px;

        &::after {
          background: #fff;
        }
      }
    }
  }
`;

export default { MainContainer };

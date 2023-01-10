import React from 'react';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';

interface ComponentProps {
  src?: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const SvgContainer = styled.div<{ svgColor?: string }>`
  & svg {
    width: 100%;
    height: 100%;

    & path,
    & g {
      fill: ${(props) => props.svgColor} !important;
    }
  }
`;

const InlineSvg: React.FC<ComponentProps> = ({ src, width = 20, height = 20, color }) => {
  return (
    <SvgContainer style={{ width, height }} svgColor={color}>
      <SVG src={'/assets/icons' + src} />
    </SvgContainer>
  );
};

export default InlineSvg;

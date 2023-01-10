import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { ChartData } from '../TotalCustomers.tsx/model/TotalSales.entity';

type Props = {
  data: ChartData[];
  colors: string[];
};
const HorizontalBarChart = ({ data = [], colors }: Props): ReactElement => {
  // TODO - add post label to values
  // TODO - add Ellipsis to labels
  // LINK -https://ant.design/components/typography/#components-typography-demo-ellipsis
  const isBlankChart = useMemo(() => {
    return data.every((chartCol) => chartCol.amt == 0) ? true : false;
  }, [data]);

  const sum = data.reduce((acc, curr) => +acc + Number(curr.amt), 0);

  const labelColRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const valueColRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // When component did mount -> set the width of labelCols base on ValueCols
    const allWidths: number[] = valueColRefs?.current.map((el: null | HTMLSpanElement) => {
      if (el) return el.clientWidth;
      else return 0;
    });

    labelColRefs?.current.forEach((labelElement: HTMLSpanElement | null, index: number) => {
      if (labelElement) labelElement.style.width = `${allWidths[index]}px`;
    });
  }, []);

  const normalizedValueData = data.map((el) => {
    return { ...el, percent: (Number(el.amt) / sum) * 100 };
  });

  return (
    <MainContainer>
      <div className="names">
        {normalizedValueData.map((el, index) => (
          <span
            ref={(thisRef) => (labelColRefs.current[index] = thisRef)}
            style={{
              borderBottom: `1px dashed ${colors[index % colors.length]}`,
              width: !isBlankChart ? `${el.amt != 0 ? el.percent : 0}%` : `100%`,
            }}
          >
            {el.name ?? ''}
          </span>
        ))}
      </div>
      <div className="values">
        {normalizedValueData.map((el, index) => (
          <span
            ref={(thisRef) => (valueColRefs.current[index] = thisRef)}
            style={{
              backgroundColor: colors[index % colors.length],
              width: !isBlankChart ? `${el.amt != 0 ? el.percent : 0}%` : `100%`,
            }}
          >
            {/* if data has no name theres no need to show its values, and if the value is 0 theres no need to put '0' as value in chart  */}
            {el.amt ?? ''}
          </span>
        ))}
      </div>
    </MainContainer>
  );
};

export default HorizontalBarChart;

const MainContainer = styled.div`
  width: '100%';
  display: flex;
  flex-direction: column;

  text-align: center;

  .names {
    display: flex;
  }
  .values {
    display: flex;
    & > span {
      padding: 8px 0;
      min-width: fit-content;
    }
  }
`;

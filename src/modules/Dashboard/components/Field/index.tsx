import './index.less';

import React, { Fragment, ReactNode } from 'react';

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
};

const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => (
  <div className="filed" {...rest}>
    <span className="label">{label}</span>
    <span className="number">{value}</span>
  </div>
);
export default Field;

// TODO: Refactor this component
export type BodyFieldProps = Record<'label1' | 'label2' | 'value1' | 'value2', ReactNode>;
export const BodyField: React.FC<Partial<BodyFieldProps>> = ({ label1, value1, label2, value2 }) => (
  <>
    <span className="label">{label1} : </span>
    {value1 != null ? <span className="number">{value1} </span> : <span className="number"> - </span>}
    <br />
    {label2 != null ? (
      <span className="label">{label2} : </span>
    ) : (
      <span className="label">
        {' '}
        <Fragment>&nbsp;</Fragment>{' '}
      </span>
    )}
    <span className="number">{value2}</span>
  </>
);

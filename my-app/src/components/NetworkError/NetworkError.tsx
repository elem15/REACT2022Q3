import React from 'react';
import './NetworkError.css';

interface IProps {
  message?: string;
}
const NetworkError = (props: IProps) => {
  return (
    <div className="net-error">
      <div>network error: &quot;{props.message ? props.message : 'unknown'}&quot;</div>
    </div>
  );
};

export default NetworkError;

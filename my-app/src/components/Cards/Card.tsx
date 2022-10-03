import React from 'react';
import { IProps } from './Cards';

interface CardProps {
  data: IProps;
}
const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div>
        <img className="card-img" src={props.data.picture} alt="" />
      </div>
      <div>{props.data.price}</div>
      <div>{props.data.address}</div>
    </div>
  );
};

export default Card;

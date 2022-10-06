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
      <div>address: {props.data.address}</div>
      <div>type: {props.data.houseType}</div>
      <div>
        price:&nbsp;
        {props.data.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
      </div>
      <div>{props.data.isActive ? 'is on sale' : 'sold'}</div>
      <div className="features">features: {props.data.about}</div>
    </div>
  );
};

export default Card;

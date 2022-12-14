import React from 'react';
import { ICard } from './Cards';
import house from '../../media/house.png';
import fire from '../../media/fire.svg';

interface CardProps {
  data: ICard;
}
const Card = (props: CardProps) => {
  return (
    <div className="card">
      <div>
        <img
          className="card-img"
          src={props.data.picture ? props.data.picture : house}
          alt="house"
        />
      </div>
      {props.data.address && <div>address: {props.data.address}</div>}
      {props.data.houseType && <div> type: {props.data.houseType}</div>}
      {props.data.price > 0 && (
        <div>
          price:&nbsp;
          {props.data.price.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
        </div>
      )}
      {props.data.isActive !== null && <div>{props.data.isActive ? 'is on sale' : 'sold'}</div>}
      {props.data.about && <div className="features">features: {props.data.about}</div>}
      {props.data.date && <div className="">ad publication date: {props.data.date}</div>}
      {props.data.isUrgent && (
        <div>
          <div className="">Emergency sale !!!</div>
          <img className="fire" src={fire} alt="fire" />
        </div>
      )}
    </div>
  );
};

export default Card;

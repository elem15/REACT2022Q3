import React from 'react';
import Card from './Card';
import './Cards.css';

export interface ICard {
  id: string;
  // index: number;
  isActive: boolean | null;
  isUrgent: boolean;
  price: number;
  picture: string;
  houseType: string;
  // email: string;
  // phone: string;
  date: string;
  address: string;
  about: string;
}
export interface IData {
  data: ICard[];
}

const Cards = (props: IData) => {
  const cards = props.data.map((item) => <Card key={item.id} data={item} />);
  return <div className="cards">{cards}</div>;
};

export default Cards;

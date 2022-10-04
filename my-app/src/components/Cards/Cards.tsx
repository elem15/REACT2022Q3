import React from 'react';
import Card from './Card';
import './Cards.css';

export interface IProps {
  id: string;
  index: number;
  isActive: boolean;
  price: string;
  picture: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
}
interface IData {
  data: IProps[];
}

const Cards = (props: IData) => {
  const cards = props.data.map((item) => <Card key={item.id} data={item} />);
  return <div className="cards">{cards}</div>;
};

export default Cards;
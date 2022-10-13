import { ICharacter } from 'components/Main/Main';
import React from 'react';
import Character from './Character';
import './Characters.css';

interface IProps {
  docs: ICharacter[];
}
const Characters = (props: IProps) => {
  return (
    <div>
      <h1>Characters</h1>
      <div className="cards">
        {props.docs.map((value) => (
          <Character key={value._id} name={value.name} race={value.race} birth={value.birth} />
        ))}
      </div>
    </div>
  );
};

export default Characters;

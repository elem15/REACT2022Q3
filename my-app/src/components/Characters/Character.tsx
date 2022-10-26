import React from 'react';
import './Characters.css';

interface IProps {
  id: string;
  name: string;
  race: string;
  birth: string;
  handleCreateModal: (id: string) => void;
}
const Character = (props: IProps) => {
  return (
    <div className="card" onClick={() => props.handleCreateModal(props.id)}>
      <div>
        race: <strong>{props.race}</strong>
      </div>
      <hr />
      <div>
        name: <strong>{props.name}</strong>
      </div>
      <hr />
      <div>
        birth: <strong>{props.birth}</strong>
      </div>
    </div>
  );
};
export default Character;

import React from 'react';

interface IProps {
  name: string;
  race: string;
  birth: string;
}
const Character = (props: IProps) => {
  return (
    <div className="card">
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

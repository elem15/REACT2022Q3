import { ICharacter } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import React from 'react';
import Character from './Character';
import './Characters.css';

interface IProps {
  docs: ICharacter[];
  page: number;
  mode: Mode;
  handleDataNext: () => void;
  handleDataPrev: () => void;
  handleDataEnd: () => void;
  handleDataBegin: () => void;
  handleToListMode: () => void;
  handleCreateModal: (id: string) => void;
}
const Characters = (props: IProps) => {
  return (
    <div>
      {props.docs.length ? (
        <div className="cards-character">
          {props.docs.map((value) => (
            <Character
              key={value._id}
              id={value._id}
              name={value.name}
              race={value.race}
              birth={value.birth}
              handleCreateModal={props.handleCreateModal}
            />
          ))}
        </div>
      ) : (
        <div className="nothing-message">Nothing find</div>
      )}
      {props.mode === Mode.LIST && (
        <div className="pagination">
          <button onClick={props.handleDataBegin}>{'<<'}</button>&nbsp;
          <button onClick={props.handleDataPrev}>{'<'}</button>&nbsp;
          <span>{props.page}</span>&nbsp;
          <button onClick={props.handleDataNext}>{'>'}</button>&nbsp;
          <button onClick={props.handleDataEnd}>{'>>'}</button>
        </div>
      )}
      {props.mode === Mode.SEARCH && (
        <div className="pagination">
          <button onClick={props.handleToListMode}>GO TO LIST</button>
        </div>
      )}
    </div>
  );
};

export default Characters;

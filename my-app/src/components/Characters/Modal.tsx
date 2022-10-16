import { ICharacter } from 'components/Main/Main';
import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  handleRemoveModal: () => void;
  modalDoc: ICharacter | null;
}
const Modal = (props: IProps) => {
  const stopPropagation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  console.log(props.modalDoc);
  return (
    <div className="modal" onClick={props.handleRemoveModal}>
      <div className="modal-window" onClick={stopPropagation}>
        <button className="close-button" onClick={props.handleRemoveModal}>
          X
        </button>
        <h1>Modal</h1>
        {props.modalDoc && (
          <>
            <div>
              race: <strong>{props.modalDoc.race}</strong>
            </div>
            <hr />
            <div>
              name: <strong>{props.modalDoc.name}</strong>
            </div>
            <hr />
            <div>
              birth: <strong>{props.modalDoc.birth}</strong>
            </div>
            <hr />
            <div>
              race: <strong>{props.modalDoc.race}</strong>
            </div>
            <hr />
            <div>
              spouse: <strong>{props.modalDoc.spouse}</strong>
            </div>
            <hr />
            <div>
              wikiUrl: <a href={props.modalDoc.wikiUrl}>{props.modalDoc.wikiUrl}</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;

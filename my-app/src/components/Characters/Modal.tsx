import React, { MouseEvent } from 'react';

interface IProps {
  handleRemoveModal: () => void;
}
const Modal = (props: IProps) => {
  const stopPropagation = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  return (
    <div className="modal" onClick={props.handleRemoveModal}>
      <div className="modal-window" onClick={stopPropagation}>
        <button className="close-button" onClick={props.handleRemoveModal}>
          X
        </button>
        <h1>Modal</h1>
      </div>
    </div>
  );
};

export default Modal;

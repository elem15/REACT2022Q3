import React, { FormEvent } from 'react';
import { IProps } from 'components/Cards/Cards';
import './Form.css';

interface IFormComponentProps {
  handleOnSubmit: (e: FormEvent) => void;
  addressInput: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
}
const FormComponent = (props: IFormComponentProps) => {
  return (
    <section className="section">
      <form action="" onSubmit={props.handleOnSubmit}>
        <input
          type="text"
          name="address"
          placeholder="address"
          defaultValue=""
          ref={props.addressInput}
        />
        <br />
        <input
          type="date"
          name="date"
          placeholder="enter data"
          defaultValue=""
          ref={props.dateInput}
        />
        <br />
        <input type="file" accept="image/*" ref={props.fileInput} />
        <br />
        <button type="submit">send</button>
      </form>
    </section>
  );
};

export default FormComponent;

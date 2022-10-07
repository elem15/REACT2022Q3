import React, { ChangeEvent, FormEvent } from 'react';
import './Form.css';

interface IFormComponentProps {
  handleOnSubmit: (e: FormEvent) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  address: React.RefObject<HTMLInputElement>;
  file: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  addressError: boolean;
  dateError: boolean;
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
          ref={props.address}
          onChange={props.handleOnChange}
        />
        {props.addressError && <span>Address is incorrect</span>}
        <br />
        <input
          type="date"
          name="date"
          placeholder="enter data"
          defaultValue=""
          ref={props.date}
          onChange={props.handleOnChange}
        />
        {props.dateError && <span>Date is incorrect</span>}
        <br />
        <input type="file" accept="image/*" ref={props.file} />
        <br />
        <button type="submit">send</button>
      </form>
    </section>
  );
};

export default FormComponent;

import Cards, { ICard } from 'components/Cards/Cards';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import './Form.css';
import { IForm } from './FormContainerReactForm';

interface IFormComponentProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  submitForm: (data: FieldValues) => void;
  register: UseFormRegister<FieldValues & IForm>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
  data: ICard[];
}
const FormComponent = (props: IFormComponentProps) => {
  return (
    <div>
      <div className="section">
        <form action="" onSubmit={props.handleSubmit(props.submitForm)}>
          <label htmlFor="">
            Address:
            <br />
            <input
              {...props.register('address')}
              type="text"
              name="address"
              placeholder="address"
              defaultValue=""
            />
            {props.errors.address && <span className="alert"> {props.errors.address.message}</span>}
          </label>
          <hr />
          <label htmlFor="">
            Date of first publication
            <br />
            <input
              {...props.register('date')}
              type="date"
              name="date"
              placeholder="date"
              defaultValue=""
            />
            {props.errors.date && <span className="alert"> {props.errors.date.message}</span>}
            <br />
          </label>
          <hr />
          <label htmlFor="">
            Price:
            <br />
            <input
              {...props.register('price')}
              type="number"
              name="price"
              placeholder="price"
              defaultValue=""
            />
            {props.errors.price && <span className="alert"> {props.errors.price.message}</span>}
          </label>
          <hr />
          <select placeholder="select" {...props.register('houseType')} defaultValue="default">
            <option value="default">select house type</option>
            <option value="detached house">detached house</option>
            <option value="townhouse">townhouse</option>
            <option value="apartment">apartment</option>
          </select>
          {props.errors.houseType && (
            <span className="alert"> {props.errors.houseType.message}</span>
          )}
          <hr />
          <label htmlFor="">
            Download houses image
            <br />
            <input
              type="file"
              accept="image/*"
              {...props.register('files')}
              placeholder="Download picture"
            />
          </label>
          <hr />
          <label htmlFor="sold">
            <input type="checkbox" {...props.register('sold')} id="sold" />
            House is already sold
          </label>
          <hr />
          <input type="checkbox" id="switch" {...props.register('isUrgent')} className="checkbox" />
          <label htmlFor="switch" className="toggle" />
          <label htmlFor="switch"> Emergency sale</label>
          <hr />
          <button disabled={Object.keys(props.errors).length ? true : false} type="submit">
            send
          </button>
        </form>
      </div>
      {props.data.length ? <Cards data={props.data} /> : ''}
    </div>
  );
};

export default FormComponent;

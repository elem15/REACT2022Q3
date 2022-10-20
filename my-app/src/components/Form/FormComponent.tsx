import Cards, { ICard } from 'components/Cards/Cards';
import React, { ChangeEvent, FormEvent } from 'react';
import './Form.css';

interface IFormComponentProps {
  handleOnSubmit: (e: FormEvent) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  address: React.RefObject<HTMLInputElement>;
  file: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  isActive: React.RefObject<HTMLInputElement>;
  isUrgent: React.RefObject<HTMLInputElement>;
  houseType: React.RefObject<HTMLSelectElement>;
  addressValidate: boolean;
  dateValidate: boolean;
  houseTypeValidate: boolean;
  formIsActive: boolean;
  data: ICard[];
}
const FormComponent = (props: IFormComponentProps) => {
  return (
    <div>
      <div className="section">
        <form action="" onSubmit={props.handleOnSubmit}>
          <label htmlFor="">
            Address:
            <br />
            <input
              type="text"
              name="address"
              placeholder="address"
              defaultValue=""
              ref={props.address}
              onChange={props.handleOnChange}
            />
            {!props.addressValidate && <span className="alert"> Address is incorrect</span>}
          </label>
          <hr />
          <label htmlFor="">
            Date of first publication
            <br />
            <input
              type="date"
              name="date"
              placeholder="date"
              defaultValue=""
              ref={props.date}
              onChange={props.handleOnChange}
            />
            {!props.dateValidate && <span className="alert"> Date is incorrect</span>}
            <br />
          </label>
          <hr />
          <select
            name="houseType"
            placeholder="select"
            ref={props.houseType}
            onChange={props.handleOnChange}
            defaultValue="default"
          >
            <option value="default">select house type</option>
            <option value="detached house">detached house</option>
            <option value="townhouse">townhouse</option>
            <option value="apartment">apartment</option>
          </select>
          {!props.houseTypeValidate && <span className="alert"> Select type of house</span>}
          <hr />
          <label htmlFor="">
            Download houses image
            <br />
            <input type="file" accept="image/*" ref={props.file} placeholder="Download picture" />
          </label>
          <hr />
          <label htmlFor="sold">
            <input type="checkbox" name="sold" id="sold" ref={props.isActive} />
            House is already sold
          </label>
          <hr />
          <input type="checkbox" id="switch" className="checkbox" ref={props.isUrgent} />
          <label htmlFor="switch" className="toggle" />
          <label htmlFor="switch"> Emergency sale</label>
          <hr />
          <button disabled={!props.formIsActive} type="submit">
            send
          </button>
        </form>
      </div>
      {props.data.length ? <Cards data={props.data} /> : ''}
    </div>
  );
};

export default FormComponent;

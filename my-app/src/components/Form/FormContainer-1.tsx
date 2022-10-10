import Cards, { IData, IProps } from 'components/Cards/Cards';
import React, { FormEvent, Component, createRef } from 'react';
import { IValidateState } from './FormContainer';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';

const addressValidate = (address: string | undefined) => {
  if (address) return address.length > 7 ? true : false;
};
const dateValidate = (date: string | undefined) => {
  if (date) {
    const year = new Date(date).getFullYear();
    const currentYear = new Date().getFullYear();
    if (year < 1950 || year > currentYear) return false;
    return true;
  }
  return false;
};
type IState = IProps & IValidateState & IData;
class FormPageContainer extends Component {
  state: IState = {
    data: [],
    id: '',
    index: 0,
    isActive: true,
    isUrgent: true,
    price: 0,
    picture: '',
    houseType: '',
    email: '',
    phone: '',
    about: '',
    address: '',
    date: '',
    formIsActive: false,
    validate: {
      id: true,
      index: true,
      isActive: true,
      price: true,
      picture: true,
      houseType: true,
      email: true,
      phone: true,
      about: true,
      address: true,
      date: true,
    },
  };
  file = createRef<HTMLInputElement>();
  date = createRef<HTMLInputElement>();
  address = createRef<HTMLInputElement>();
  houseType = createRef<HTMLSelectElement>();
  isActive = createRef<HTMLInputElement>();
  isUrgent = createRef<HTMLInputElement>();

  handleOnChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target as HTMLInputElement;
    this.setState((prevState: Readonly<IState>) => {
      const { validate } = prevState;
      return {
        formIsActive: true,
        validate: { ...validate, [name]: true },
      };
    });
  };
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');
    this.setState((prevState: Readonly<IState>) => {
      const address = this.address.current?.value;
      const date = this.date.current?.value;
      const houseType = this.houseType.current?.value;
      const isActive = !this.isActive.current?.checked;
      const isUrgent = this.isUrgent.current?.checked;
      const current = this.file.current as HTMLInputElement;
      const { files } = current;
      const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
      const validate = prevState.validate;
      const data = prevState.data;
      if (!addressValidate(address) || !dateValidate(date) || !addressValidate(houseType)) {
        return {
          validate: {
            ...validate,
            address: addressValidate(address),
            date: dateValidate(date),
            houseType: addressValidate(houseType),
          },
          formIsActive: false,
        };
      }
      return {
        validate: { ...validate, address: true },
        data: [
          ...data,
          {
            id: uuidv4(),
            houseType,
            isUrgent,
            isActive,
            address,
            date,
            picture,
          },
        ],
      };
    });
  };
  render() {
    return (
      <div>
        <section className="section">
          <form action="" onSubmit={this.handleOnSubmit}>
            <label htmlFor="">
              Address:
              <br />
              <input
                type="text"
                name="address"
                placeholder="address"
                defaultValue=""
                ref={this.address}
                onChange={this.handleOnChange}
              />
              {!this.state.validate.address && <span className="alert"> Address is incorrect</span>}
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
                ref={this.date}
                onChange={this.handleOnChange}
              />
              {!this.state.validate.date && <span className="alert"> Date is incorrect</span>}
              <br />
            </label>
            <hr />
            <select
              name="houseType"
              placeholder="select"
              ref={this.houseType}
              onChange={this.handleOnChange}
              defaultValue="default"
            >
              <option value="default">select house type</option>
              <option value="detached house">detached house</option>
              <option value="townhouse">townhouse</option>
              <option value="apartment">apartment</option>
            </select>
            {!this.state.validate.houseType && <span className="alert"> Select type of house</span>}
            <hr />
            <label htmlFor="">
              Download houses image
              <br />
              <input type="file" accept="image/*" ref={this.file} placeholder="Download picture" />
            </label>
            <hr />
            <label htmlFor="sold">
              <input type="checkbox" name="sold" id="sold" ref={this.isActive} />
              House is already sold
            </label>
            <hr />
            <input type="checkbox" id="switch" className="checkbox" ref={this.isUrgent} />
            <label htmlFor="switch" className="toggle" />
            <label htmlFor="switch"> Emergency sale</label>
            <hr />
            <button disabled={!this.state.formIsActive} type="submit">
              send
            </button>
          </form>
        </section>
        {this.state.data.length ? <Cards data={this.state.data} /> : ''}
      </div>
    );
  }
}

export default FormPageContainer;

import Cards, { IData, IProps } from 'components/Cards/Cards';
import React, { FormEvent, Component, createRef } from 'react';
import FormContainer, { IValidateState } from './FormContainer';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';

const addressValidate = (address: string | undefined) => {
  if (address) return address.length > 7 ? true : false;
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
  address = createRef<HTMLInputElement>();
  handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    // this.setState({
    //   [name]: value,
    // });
  };
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState((prevState: Readonly<IState>) => {
      const value = this.address.current?.value;
      const validate = prevState.validate;
      const data = prevState.data;
      const address = this.address.current?.value;
      if (!addressValidate(value)) {
        return {
          validate: { ...validate, address: false },
        };
      }
      return {
        validate: { ...validate, address: true },
        data: [...data, { id: uuidv4(), address }],
      };
    });
  };
  render() {
    return (
      <div>
        <section className="section">
          <form onSubmit={this.handleOnSubmit}>
            <label htmlFor="">
              Address:
              <br />
              <input
                type="text"
                name="address"
                placeholder="address"
                ref={this.address}
                // value={this.state.address}
                onChange={this.handleOnChange}
              />
              {!this.state.validate.address && <span className="alert"> Address is incorrect</span>}
            </label>
            <hr />
            <button type="submit">send</button>
          </form>
        </section>
        {this.state.data.length ? <Cards data={this.state.data} /> : ''}
      </div>
    );
  }
}

export default FormPageContainer;

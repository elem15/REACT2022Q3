import React, { FormEvent, Component, createRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IData, IProps } from 'components/Cards/Cards';
import './Form.css';
import FormComponent from './FormComponent';

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
interface IValidateState {
  formIsActive: boolean;
  validate: {
    id: boolean;
    index: boolean;
    isActive: boolean;
    price: boolean;
    picture: boolean;
    houseType: boolean;
    email: boolean;
    phone: boolean;
    about: boolean;
    address: boolean;
    date: boolean;
  };
}
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
  render(): React.ReactNode {
    return (
      <FormComponent
        data={this.state.data}
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
        addressValidate={this.state.validate.address}
        dateValidate={this.state.validate.date}
        houseTypeValidate={this.state.validate.houseType}
        formIsActive={this.state.formIsActive}
        address={this.address}
        houseType={this.houseType}
        isActive={this.isActive}
        isUrgent={this.isUrgent}
        date={this.date}
        file={this.file}
      />
    );
  }
}

export default FormPageContainer;

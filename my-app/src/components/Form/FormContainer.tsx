import { IProps } from 'components/Cards/Cards';
import React, { ChangeEvent, Component, createRef, FormEvent } from 'react';
import './Form.css';
import FormComponent from './FormComponent';
import { v4 as uuidv4 } from 'uuid';

interface IFormProps {
  handleFormSubmit: (house: IProps) => void;
}

export interface IValidateState {
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
};

class FormContainer extends Component<IFormProps> {
  state: IProps & IValidateState = {
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

  handleOnChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    await this.setState((prevState: Readonly<IValidateState>) => {
      const validate = prevState.validate;
      return {
        validate: { ...validate, [e.target.name]: true },
      };
    });
    const arr = await Object.values(this.state.validate);
    if (!arr.includes(false)) {
      await this.setState({ formIsActive: true });
    }
  };

  handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const address = this.address.current?.value;
    if (!addressValidate(address)) {
      await this.setState((prevState: Readonly<IValidateState>) => {
        const validate = prevState.validate;
        return {
          formIsActive: false,
          validate: { ...validate, address: false },
        };
      });
    }
    const date = this.date.current?.value;
    if (!dateValidate(date)) {
      await this.setState((prevState: Readonly<IValidateState>) => {
        const validate = prevState.validate;
        return {
          formIsActive: false,
          validate: { ...validate, date: false },
        };
      });
    }
    const houseType = this.houseType.current?.value;
    if (!addressValidate(houseType)) {
      await this.setState((prevState: Readonly<IValidateState>) => {
        const validate = prevState.validate;
        return {
          formIsActive: false,
          validate: { ...validate, houseType: false },
        };
      });
    }

    const arr = await Object.values(this.state.validate);
    if (arr.includes(false)) return;
    const isActive = !this.isActive.current?.checked;
    const isUrgent = this.isUrgent.current?.checked;
    await this.setState({
      id: uuidv4(),
      houseType,
      isUrgent,
      isActive,
      address,
      date,
    });
    const current = this.file.current as HTMLInputElement;
    const { files } = current;
    await this.setState(() => {
      if (files != null && files[0]) {
        return { picture: URL.createObjectURL(files[0]) };
      } else {
        return { picture: '' };
      }
    });
    await this.props.handleFormSubmit(this.state);
  };

  render(): React.ReactNode {
    return (
      <FormComponent
        handleOnSubmit={this.handleOnSubmit}
        handleOnChange={this.handleOnChange}
        address={this.address}
        addressError={!this.state.validate.address}
        dateError={!this.state.validate.date}
        houseTypeError={!this.state.validate.houseType}
        formIsActive={this.state.formIsActive}
        houseType={this.houseType}
        isActive={this.isActive}
        isUrgent={this.isUrgent}
        date={this.date}
        file={this.file}
      />
    );
  }
}

export default FormContainer;

import { IProps } from 'components/Cards/Cards';
import React, { Component, createRef, FormEvent } from 'react';
import './Form.css';
import FormComponent from './FormComponent';

interface IFormProps {
  handleFormSubmit: (house: IProps) => void;
}
class FormContainer extends Component<IFormProps> {
  state = {
    id: '',
    index: 0,
    isActive: null,
    price: 0,
    picture: '',
    houseType: '',
    email: '',
    phone: '',
    about: '',
    address: '',
    dateOfPublish: '',
  } as IProps;
  fileInput = createRef<HTMLInputElement>();
  dateInput = createRef<HTMLInputElement>();
  addressInput = createRef<HTMLInputElement>();

  handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(this.addressInput.current?.value);
    console.log(this.dateInput.current?.value);
    await this.setState({
      address: this.addressInput.current?.value,
      dateOfPublish: this.dateInput.current?.value,
    });
    const current = this.fileInput.current as HTMLInputElement;
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
        addressInput={this.addressInput}
        dateInput={this.dateInput}
        fileInput={this.fileInput}
      />
    );
  }
}

export default FormContainer;

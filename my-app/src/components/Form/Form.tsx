import { IProps } from 'components/Cards/Cards';
import React, { Component, createRef, FormEvent } from 'react';
import './Form.css';

interface IFormProps {
  handleFormSubmit: (house: IProps) => void;
}
class Form extends Component<IFormProps> {
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
  } as IProps;
  fileInput = createRef<HTMLInputElement>();
  addressInput = createRef<HTMLInputElement>();

  handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(this.addressInput.current?.value);
    await this.setState({
      address: this.addressInput.current?.value,
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
      <section className="section">
        <form action="" onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            name="address"
            placeholder="address"
            defaultValue=""
            ref={this.addressInput}
          />
          <br />
          <input type="file" accept="image/*" ref={this.fileInput} />
          <br />
          <button type="submit">send</button>
        </form>
      </section>
    );
  }
}

export default Form;

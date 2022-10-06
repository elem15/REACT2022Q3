import React, { Component, createRef, FormEvent } from 'react';

interface MyFormValues {
  address: HTMLInputElement;
}

class Form extends Component {
  state = {
    imgPath: '',
  };
  fileInput = createRef<HTMLInputElement>();
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as EventTarget & Element & MyFormValues;
    console.log(form.address.value);
    const current = this.fileInput.current as HTMLInputElement;
    const { files } = current;
    if (files != null) console.log(URL.createObjectURL(files[0]));
    this.setState(() => {
      if (files != null) {
        return { imgPath: URL.createObjectURL(files[0]) };
      }
    });
  };
  render(): React.ReactNode {
    return (
      <div>
        <form action="" onSubmit={this.handleOnSubmit}>
          <input type="text" name="address" />
          <input type="file" accept="image/*" ref={this.fileInput} />
          <input type="submit" />
        </form>
        <img src={this.state.imgPath} style={{ width: '300px' }} alt="" />
      </div>
    );
  }
}

export default Form;

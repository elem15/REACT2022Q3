import React, { Component, FormEvent } from 'react';

interface MyFormValues {
  address: HTMLInputElement;
}

class Form extends Component {
  handleOnSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as EventTarget & Element & MyFormValues;
    console.log(form.address.value);
  }
  render(): React.ReactNode {
    return (
      <div>
        <form action="" onSubmit={this.handleOnSubmit}>
          <input type="text" name="address" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Form;

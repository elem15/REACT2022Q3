import Cards, { IData, IProps } from 'components/Cards/Cards';
import React, { Component } from 'react';
import FormContainer from './FormContainer';

class FormPageContainer extends Component {
  state = {
    data: [] as IProps[],
  };
  handleFormSubmit = async (house: IProps) => {
    await this.setState((prevState: Readonly<IData>) => {
      const { data } = prevState;
      const newData = [...data, house];
      return { data: newData };
    });
  };
  render() {
    return (
      <div>
        <FormContainer handleFormSubmit={this.handleFormSubmit} />
        <Cards data={this.state.data} />
      </div>
    );
  }
}

export default FormPageContainer;

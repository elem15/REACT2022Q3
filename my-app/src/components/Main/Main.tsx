import Cards from 'components/Cards/Cards';
import Search from 'components/Search/Search';
import React, { Component, FormEvent } from 'react';
import data from '../../MockData/data';

class Main extends Component {
  state = {
    searchValue: localStorage.getItem('searchValue') ?? '',
  };
  handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({
      searchValue: value,
    });
  };
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search value: ', this.state.searchValue);
    this.setState({
      searchValue: '',
    });
  };
  render() {
    return (
      <div className="App">
        <Search
          searchValue={this.state.searchValue}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        <Cards data={data} />
      </div>
    );
  }
}

export default Main;

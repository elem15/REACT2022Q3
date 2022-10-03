import React, { Component, FormEvent } from 'react';
import './Search.css';
interface IProps {
  searchValue: string;
  handleOnChange: (e: FormEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: FormEvent) => void;
}

class Search extends Component<IProps> {
  componentWillUnmount() {
    const value = this.props.searchValue;
    localStorage.setItem('searchValue', value);
  }
  render() {
    const props = this.props;
    return (
      <section className="search-section">
        <form className="search-form" onSubmit={props.handleOnSubmit}>
          <input
            className="search-items"
            type="search"
            placeholder="search"
            value={props.searchValue}
            onChange={props.handleOnChange}
          />
          <br />
          <button className="search-items search-button">search</button>
        </form>
      </section>
    );
  }
}

export default Search;

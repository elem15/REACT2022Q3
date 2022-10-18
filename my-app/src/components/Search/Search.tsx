import React, { Component, FormEvent } from 'react';
import './Search.css';
interface IProps {
  names: string[];
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
            list="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="character's name"
            value={props.searchValue}
            onChange={props.handleOnChange}
          />
          <datalist id="search">
            {props.names.map((name, idx) => idx < 10 && <option key={name} value={name}></option>)}
          </datalist>
          <br />
          <button className="search-items search-button">search by name</button>
        </form>
      </section>
    );
  }
}

export default Search;

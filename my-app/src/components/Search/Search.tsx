import { IName } from 'components/Main/Main';
import React, { FormEvent, useEffect } from 'react';
import './Search.css';
interface IProps {
  names: IName[];
  searchValue: string;
  handleOnChange: (e: FormEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: FormEvent) => void;
}

const Search = (props: IProps) => {
  useEffect(() => {
    localStorage.setItem('searchValue', props.searchValue);
  });
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
          {props.names.map(({ name, id }, idx) => idx < 10 && <option key={id} value={name} />)}
        </datalist>
        <br />
        <button className="search-items search-button">search by name</button>
      </form>
    </section>
  );
};

export default Search;

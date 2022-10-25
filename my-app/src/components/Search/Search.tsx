import { IName } from 'components/Main/Main';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import React, { FormEvent } from 'react';
import './Search.css';
interface IProps {
  names: IName[];
  searchValue: string;
  handleOnChange: (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleOnSubmit: (e: FormEvent) => void;
  handleToListMode: () => void;
}

const Search = (props: IProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.handleToListMode();
  };
  return (
    <section className="search-section">
      <form className="search-form" onSubmit={props.handleOnSubmit}>
        <input
          className="search-items"
          list="search"
          name="searchValue"
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
      <form className="search-form" onSubmit={handleSubmit}>
        <select className="search-items" name="order" onChange={props.handleOnChange}>
          <option value={SortingOrder.ASC}>direct sort</option>
          <option value={SortingOrder.DESC}>reverse sort</option>
        </select>
        <hr />
        <select className="search-items" name="sortBy" onChange={props.handleOnChange}>
          <option value={SortingValues.DEFAULT}>unsorted by value</option>
          <option value={SortingValues.NAME}>sort by name</option>
          <option value={SortingValues.RACE}>sort by race</option>
        </select>
        <hr />
        <select className="search-items" name="gender" onChange={props.handleOnChange}>
          <option value={GenderType.DEFAULT}>unselected by gender</option>
          <option value={GenderType.MALE}>male</option>
          <option value={GenderType.FEMALE}>female</option>
        </select>
        <hr />
        <button className="search-items search-button">sort list</button>
      </form>
    </section>
  );
};

export default Search;

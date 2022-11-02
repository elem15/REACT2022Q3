import { IState } from 'components/Main/Main';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import React, { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { enableSearchMode, searchCharactersLoad, setSearchParams } from 'redux/mainSlice';
import styles from './Search.module.css';

const Search = () => {
  const appDispatch = useAppDispatch();
  const { names, state } = useAppSelector((state) => state.main);
  const { searchValue, gender, sort, order, page, limit, pages } = state;
  const handleSortSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(searchCharactersLoad());
  };
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(enableSearchMode());
  };
  const handleOnChange = async (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    const key = name as keyof IState;
    appDispatch(setSearchParams({ value, key }));
  };
  return (
    <section className={styles.searchSection}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <input
          className="search-items"
          list="search"
          name="searchValue"
          type="search"
          autoComplete="off"
          placeholder="character's name"
          value={searchValue}
          onChange={handleOnChange}
        />
        <datalist id="search">
          {names.map(({ name, id }, idx) => idx < 10 && <option key={id} value={name} />)}
        </datalist>
        <br />
        <button className="search-items search-button">search by name</button>
      </form>
      <form className={styles.searchForm} onSubmit={handleSortSubmit}>
        <select className="search-items" name="sort" defaultValue={sort} onChange={handleOnChange}>
          <option value={SortingValues.DEFAULT}>unsorted by value</option>
          <option value={SortingValues.NAME}>sort by name</option>
          <option value={SortingValues.RACE}>sort by race</option>
        </select>
        <hr />
        <select
          className="search-items"
          name="order"
          defaultValue={order}
          onChange={handleOnChange}
        >
          <option value={SortingOrder.ASC}>direct sort</option>
          <option value={SortingOrder.DESC}>reverse sort</option>
        </select>
        <hr />
        <select
          className="search-items"
          name="gender"
          defaultValue={gender}
          onChange={handleOnChange}
        >
          <option value={GenderType.DEFAULT}>unselected by gender</option>
          <option value={GenderType.MALE}>male</option>
          <option value={GenderType.FEMALE}>female</option>
        </select>
        <hr />
        <button className="search-items search-button">sorting search</button>
      </form>
      <form className={styles.searchForm}>
        <label htmlFor="">
          <input
            className="search-items"
            name="page"
            type="number"
            autoComplete="off"
            min="1"
            max={pages}
            value={page}
            onChange={handleOnChange}
          />
          <br />
          current page
        </label>
        <hr />
        <label htmlFor="">
          <input
            className="search-items"
            name="limit"
            type="number"
            autoComplete="off"
            min="5"
            max="50"
            value={limit}
            onChange={handleOnChange}
          />
          <br />
          characters per page
        </label>
        <hr />
        <label htmlFor="">
          <input
            className="search-items"
            name="pages"
            type="number"
            autoComplete="off"
            min="1"
            max="200"
            value={pages}
            onChange={handleOnChange}
          />
          <br />
          total pages
        </label>
      </form>
    </section>
  );
};

export default Search;

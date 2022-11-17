import { IState } from 'components/Main/Main';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  searchCharactersThunk,
  searchCharactersLoad,
  searchNamesThunk,
  addSearchParams,
  setSearchName,
} from 'redux/mainSlice';
import styles from './Search.module.css';

const Search = () => {
  const appDispatch = useAppDispatch();
  const { names, state } = useAppSelector((state) => state.main);
  const { searchValue, gender, sort, order, page, limit, pages, total } = state;
  const initLocalState = {
    page,
    pages,
    total,
    limit,
    order,
    sort,
    gender,
  };
  const [localState, setLocalState] = useState(initLocalState);
  const handleSortSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(addSearchParams(localState));
    appDispatch(searchCharactersLoad());
  };
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(searchCharactersThunk());
  };
  const handleSearchChange = async (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target as HTMLInputElement;
    appDispatch(setSearchName(value));
  };
  const handleOnChange = async (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    const key = name as keyof IState;
    if (key === 'pages' && total) {
      const newLimit = Math.ceil(total / +value);
      const newMaxPage = newLimit > 50 ? Math.ceil(total / 50) : +value;
      setLocalState({
        ...localState,
        limit: newLimit > 50 ? 50 : newLimit,
        pages: newMaxPage,
        page: page <= newMaxPage ? page : newMaxPage,
      });
    } else if (key === 'limit' && total) {
      const newTotalPages = Math.ceil(total / +value);
      const newMaxPage = newTotalPages > 200 ? 200 : newTotalPages;
      setLocalState({
        ...localState,
        pages: newMaxPage,
        page: page <= newMaxPage ? page : newMaxPage,
        limit: newTotalPages > 200 ? Math.ceil(total / 200) : +value,
      });
    } else if (key === 'page') {
      const newValue = +value && +value;
      setLocalState({
        ...localState,
        page: newValue <= pages ? newValue : pages,
      });
    } else {
      setLocalState({
        ...localState,
        [key]: +value ? +value : value,
      });
    }
  };
  useEffect(() => {
    appDispatch(searchNamesThunk());
  }, [appDispatch, searchValue]);
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
          onChange={handleSearchChange}
        />
        <datalist id="search">
          {names.map(({ name, id }, idx) => idx < 10 && <option key={id} value={name} />)}
        </datalist>
        <br />
        <button className="search-items search-button">search by name</button>
      </form>
      <form className={styles.searchForm} onSubmit={handleSortSubmit}>
        <select
          className="search-items"
          name="sort"
          defaultValue={localState.sort}
          onChange={handleOnChange}
        >
          <option value={SortingValues.DEFAULT}>unsorted by value</option>
          <option value={SortingValues.NAME}>sort by name</option>
          <option value={SortingValues.RACE}>sort by race</option>
        </select>
        <hr />
        <select
          className="search-items"
          name="order"
          defaultValue={localState.order}
          onChange={handleOnChange}
        >
          <option value={SortingOrder.ASC}>direct sort</option>
          <option value={SortingOrder.DESC}>reverse sort</option>
        </select>
        <hr />
        <select
          className="search-items"
          name="gender"
          defaultValue={localState.gender}
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
            max={localState.pages}
            value={localState.page}
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
            value={localState.limit}
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
            value={localState.pages || pages}
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

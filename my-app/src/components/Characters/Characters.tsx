import { Mode } from 'helpers/constants/mode';
import React from 'react';
import { searchCharactersLoad } from 'redux/asyncThunks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { goToFirstPage, goToLastPage, goToNextPage, goToPrevPage } from 'redux/mainSlice';
import Character from './Character';
import './Characters.css';

const Characters = () => {
  const { docs, state } = useAppSelector((state) => state.main);
  const { mode, page, pages } = state;
  const appDispatch = useAppDispatch();
  const goToFirst = () => {
    appDispatch(goToFirstPage());
    appDispatch(searchCharactersLoad());
  };
  const goToPrev = () => {
    appDispatch(goToPrevPage());
    appDispatch(searchCharactersLoad());
  };
  const goToNext = () => {
    appDispatch(goToNextPage());
    appDispatch(searchCharactersLoad());
  };
  const goToLast = () => {
    appDispatch(goToLastPage());
    appDispatch(searchCharactersLoad());
  };

  return (
    <div>
      {docs.length ? (
        <div className="cards-character">
          {docs.map((value) => (
            <Character
              key={value._id}
              id={value._id}
              name={value.name}
              race={value.race}
              birth={value.birth}
            />
          ))}
        </div>
      ) : (
        <div className="nothing-message">Nothing found</div>
      )}
      {mode === Mode.LIST && (
        <div className="pagination">
          <button disabled={page === 1} onClick={goToFirst}>
            {'<<'}
          </button>
          &nbsp;
          <button disabled={page === 1} onClick={goToPrev}>
            {'<'}
          </button>
          &nbsp;
          <span>{page}</span>&nbsp;
          <button disabled={page === pages} onClick={goToNext}>
            {'>'}
          </button>
          &nbsp;
          <button disabled={page === pages} onClick={goToLast}>
            {'>>'}
          </button>
        </div>
      )}
      {mode === Mode.SEARCH && (
        <div className="pagination">
          <button
            onClick={() => appDispatch(searchCharactersLoad())}
            className="search-items search-button"
          >
            GO TO LIST
          </button>
        </div>
      )}
    </div>
  );
};

export default Characters;

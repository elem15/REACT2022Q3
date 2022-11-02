import { Mode } from 'helpers/constants/mode';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  firstCharactersLoad,
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPrevPage,
} from 'redux/mainSlice';
import Character from './Character';
import './Characters.css';

const Characters = () => {
  const { docs, state } = useAppSelector((state) => state.main);
  const { mode, page } = state;
  const appDispatch = useAppDispatch();
  const goToFirst = () => {
    appDispatch(goToFirstPage());
    appDispatch(firstCharactersLoad());
  };
  const goToPrev = () => {
    appDispatch(goToPrevPage());
    appDispatch(firstCharactersLoad());
  };
  const goToNext = () => {
    appDispatch(goToNextPage());
    appDispatch(firstCharactersLoad());
  };
  const goToLast = () => {
    appDispatch(goToLastPage());
    appDispatch(firstCharactersLoad());
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
          <button onClick={goToFirst}>{'<<'}</button>&nbsp;
          <button onClick={goToPrev}>{'<'}</button>&nbsp;
          <span>{page}</span>&nbsp;
          <button onClick={goToNext}>{'>'}</button>&nbsp;
          <button onClick={goToLast}>{'>>'}</button>
        </div>
      )}
      {mode === Mode.SEARCH && (
        <div className="pagination">
          <button
            onClick={() => appDispatch(firstCharactersLoad())}
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

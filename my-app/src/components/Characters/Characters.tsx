import { Mode } from 'helpers/constants/mode';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  enableListMode,
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
          <button onClick={() => appDispatch(goToFirstPage())}>{'<<'}</button>&nbsp;
          <button onClick={() => appDispatch(goToPrevPage())}>{'<'}</button>&nbsp;
          <span>{page}</span>&nbsp;
          <button onClick={() => appDispatch(goToNextPage())}>{'>'}</button>&nbsp;
          <button onClick={() => appDispatch(goToLastPage())}>{'>>'}</button>
        </div>
      )}
      {mode === Mode.SEARCH && (
        <div className="pagination">
          <button
            onClick={() => appDispatch(enableListMode())}
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

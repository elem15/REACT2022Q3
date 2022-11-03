import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React from 'react';
import './Main.css';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { useAppSelector } from 'redux/hooks';

export interface ICharacter {
  _id: string;
  name: string;
  birth: string;
  death: string;
  gender: string;
  hair: string;
  height: string;
  race: string;
  realm: string;
  spouse: string;
  wikiUrl: string;
}
export interface IDocs {
  docs: ICharacter[];
  total?: number;
  limit: number;
  page: number;
  pages: number;
}
export interface IName {
  name: string;
  id: string;
}
export interface IState {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  searchValue: string;
  page: number;
  pages: number;
  total?: number;
  limit: number;
  mode: Mode;
  modalDoc: ICharacter | null;
  order: SortingOrder;
  sort: SortingValues;
  gender: GenderType;
  timer: NodeJS.Timeout | null;
}

const Main = () => {
  const { state } = useAppSelector((state) => state.main);
  return (
    <div className="App">
      <h1>The Lord of the Rings - search characters</h1>
      <Search />
      {state.loading ? (
        <div className="preloader">
          <Preloader />
        </div>
      ) : state.error ? (
        <NetworkError message={state.errorMessage} />
      ) : (
        <Characters />
      )}
    </div>
  );
};

export default Main;

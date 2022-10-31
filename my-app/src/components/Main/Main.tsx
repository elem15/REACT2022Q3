import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { useEffect } from 'react';
import './Main.css';
import { IDataLoad, IDataSearch, ILoadCharactersArgs } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addCharacters, addNames, loadCharactersState } from 'redux/mainSlice';

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
interface IProps {
  timers: { timeout: NodeJS.Timeout | null };
  searchCharacters: (name: string) => Promise<IDataSearch>;
  loadCharacters: ({ page, order, sort, gender }: ILoadCharactersArgs) => Promise<IDataLoad>;
}

const Main = (props: IProps) => {
  const appDispatch = useAppDispatch();
  const { state } = useAppSelector((state) => state.main);
  const { page, mode, loading, searchValue, gender, sort, order, limit } = state;
  const { timers, searchCharacters, loadCharacters } = props;
  useEffect(() => {
    if (mode === Mode.LIST && loading === true) {
      const handleDataLoad = async (page: number) => {
        const { docs, loading, pages, error, mode, errorMessage, total } = await loadCharacters({
          page,
          gender,
          sort,
          order,
          limit,
        });
        appDispatch(
          loadCharactersState({
            ...state,
            loading,
            total,
            pages: pages || state.pages,
            error,
            mode,
            searchValue: '',
            errorMessage: errorMessage || undefined,
          })
        );
        appDispatch(addCharacters(docs));
      };
      handleDataLoad(page);
    }
  }, [page, mode, loadCharacters, loading, limit, gender, sort, order, appDispatch, state]);
  useEffect(() => {
    if (mode === Mode.SEARCH && loading) {
      const handleDataSearch = async (name: string) => {
        const { docs, loading, error, mode, errorMessage } = await searchCharacters(name);
        appDispatch(
          loadCharactersState({
            ...state,
            loading,
            error,
            mode,
            errorMessage,
            searchValue: '',
          })
        );
        appDispatch(addCharacters(docs));
      };
      handleDataSearch(searchValue);
    }
  }, [loading, mode, searchCharacters, searchValue, appDispatch, state]);
  useEffect(() => {
    const handleNamesLoad = async (value: string) => {
      if (timers.timeout) clearTimeout(timers.timeout);
      timers.timeout = setTimeout(async () => {
        const data = await props.searchCharacters(value);
        const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
        appDispatch(addNames(names));
      }, 1000);
      // appDispatch(removeTimer());
      // appDispatch(
      //   setNewTimer(
      //     setTimeout(async () => {
      //       const data = await props.searchCharacters(value);
      //       const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
      //       appDispatch(addNames(names));
      //     }, 1000)
      //   )
      // );
      // const setTimer = () => {
      //   timers.timeout = setTimeout(() => {
      //     localStorage.setItem('searchValue', searchValue);
      //   });
      // };
      // if (timers.timeout) clearTimeout(timers.timeout);
      // await new Promise((res) => {
      //   res(setTimer());
      // });
      // localStorage.setItem('searchValue', searchValue);
      // const data = await props.searchCharacters(value);
      // const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
      // appDispatch(addNames(names));
    };
    handleNamesLoad(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
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

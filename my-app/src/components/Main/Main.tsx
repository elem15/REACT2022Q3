import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { FormEvent, useEffect } from 'react';
import './Main.css';
import { IDataLoad, IDataSearch, ILoadCharactersArgs } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { useNavigate } from 'react-router-dom';
import { routes } from 'helpers/constants/routes';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addCharacters,
  addNames,
  changePage,
  changeSearchParams,
  loadCharactersState,
} from 'redux/mainSlice';

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
  modalMode: boolean;
  modalDoc: ICharacter | null;
  order: SortingOrder;
  sort: SortingValues;
  gender: GenderType;
}
interface IProps {
  timers: { timeout: NodeJS.Timeout | null };
  searchCharacters: (name: string) => Promise<IDataSearch>;
  loadCharacters: ({ page, order, sort, gender }: ILoadCharactersArgs) => Promise<IDataLoad>;
}

const Main = (props: IProps) => {
  const appDispatch = useAppDispatch();
  const state = useAppSelector((state) => state.main.state);
  const docs = useAppSelector((state) => state.main.docs);
  const names = useAppSelector((state) => state.main.names);
  const { page, mode, loading, searchValue, gender, sort, order, limit, total, pages } = state;
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
        localStorage.setItem('searchValue', value);
        const data = await props.searchCharacters(value);
        const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
        appDispatch(addNames(names));
      }, 1000);
    };
    handleNamesLoad(state.searchValue);
  }, [appDispatch, props, searchValue, state.searchValue, timers]);
  const handleOnChange = async (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    const key = name as keyof IState;
    if (key === 'pages' && total) {
      const newLimit = Math.ceil(total / +value);
      appDispatch(changeSearchParams({ key: 'limit', value: newLimit }));
    }
    if (key === 'limit' && total) {
      const newTotalPages = Math.ceil(total / +value);
      appDispatch(changeSearchParams({ key: 'pages', value: newTotalPages }));
    }
    const newValue = +value ? +value : value;
    if (key === 'page') {
      const page = newValue <= pages ? newValue : pages;
      appDispatch(changeSearchParams({ key, value: page }));
      return;
    }
    appDispatch(changeSearchParams({ key, value: newValue }));
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(
      loadCharactersState({
        ...state,
        loading: true,
        mode: Mode.SEARCH,
      })
    );
  };
  const handleDataNext = () => {
    if (state.page < state.pages) {
      const page = state.page + 1;
      appDispatch(changePage(page));
    }
  };
  const handleDataPrev = () => {
    if (state.page > 1) {
      const page = state.page - 1;
      appDispatch(changePage(page));
    }
  };
  const handleDataEnd = () => {
    if (state.page < state.pages) {
      appDispatch(changePage(state.pages));
    }
  };
  const handleDataBegin = () => {
    if (state.page > 1) {
      appDispatch(changePage(1));
    }
  };
  const handleToListMode = async () => {
    appDispatch(
      loadCharactersState({
        ...state,
        loading: true,
        mode: Mode.LIST,
      })
    );
  };
  const navigate = useNavigate();
  const handleCreateModal = (id: string) => {
    const modalDoc = docs.find((item) => item._id === id) || null;
    appDispatch(
      loadCharactersState({
        ...state,
        modalMode: true,
        modalDoc,
      })
    );
    navigate(routes.DETAIL, { replace: false });
  };
  return (
    <div className="App">
      <h1>The Lord of the Rings - search characters</h1>
      <Search
        names={names}
        state={state}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleToListMode={handleToListMode}
      />
      {state.loading ? (
        <div className="preloader">
          <Preloader />
        </div>
      ) : state.error ? (
        <NetworkError message={state.errorMessage} />
      ) : (
        <Characters
          docs={docs}
          page={state.page}
          mode={state.mode}
          handleDataNext={handleDataNext}
          handleDataPrev={handleDataPrev}
          handleDataEnd={handleDataEnd}
          handleDataBegin={handleDataBegin}
          handleToListMode={handleToListMode}
          handleCreateModal={handleCreateModal}
        />
      )}
    </div>
  );
};

export default Main;

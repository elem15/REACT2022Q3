import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { FormEvent, useContext, useEffect } from 'react';
import './Main.css';
import { IDataLoad, IDataSearch, ILoadCharactersArgs } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';
import { MainStateContext } from 'state/context';
import { ActionKind } from 'helpers/constants/actions';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { useNavigate } from 'react-router-dom';
import { routes } from 'helpers/constants/routes';

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
  const { mainState, dispatch } = useContext(MainStateContext);
  const { page, mode, loading, searchValue, gender, sort, order, limit, total, pages } =
    mainState.state;
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
        dispatch({
          type: ActionKind.LOAD_CHARACTERS_STATE,
          payload: {
            ...mainState.state,
            loading,
            total,
            pages: pages || mainState.state.pages,
            error,
            mode,
            searchValue: '',
            errorMessage: errorMessage || undefined,
          },
        });
        dispatch({ type: ActionKind.ADD_CHARACTERS, payload: docs });
      };
      handleDataLoad(page);
    }
  }, [page, mode, loadCharacters, dispatch, loading, mainState.state, limit, gender, sort, order]);
  useEffect(() => {
    if (mode === Mode.SEARCH && loading) {
      const handleDataSearch = async (name: string) => {
        const { docs, loading, error, mode, errorMessage } = await searchCharacters(name);
        dispatch({
          type: ActionKind.LOAD_CHARACTERS_STATE,
          payload: {
            ...mainState.state,
            loading,
            error,
            mode,
            errorMessage,
            searchValue: '',
          },
        });
        dispatch({ type: ActionKind.ADD_CHARACTERS, payload: docs });
      };
      handleDataSearch(searchValue);
    }
  }, [loading, dispatch, mainState.state, mode, searchCharacters, searchValue]);
  useEffect(() => {
    const handleNamesLoad = async (value: string) => {
      if (timers.timeout) clearTimeout(timers.timeout);
      timers.timeout = setTimeout(async () => {
        localStorage.setItem('searchValue', value);
        const data = await props.searchCharacters(value);
        const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
        dispatch({ type: ActionKind.ADD_NAMES, payload: names });
      }, 1000);
    };
    handleNamesLoad(mainState.state.searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  const handleOnChange = async (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    const key = name as keyof IState;
    if (key === 'pages' && total) {
      const newLimit = Math.ceil(total / +value);
      dispatch({
        type: ActionKind.CHANGE_SEARCH_VALUE,
        payload: { key: 'limit', value: newLimit },
      });
    }
    if (key === 'limit' && total) {
      const newTotalPages = Math.ceil(total / +value);
      dispatch({
        type: ActionKind.CHANGE_SEARCH_VALUE,
        payload: { key: 'pages', value: newTotalPages },
      });
    }
    const newValue = +value ? +value : value;
    if (key === 'page') {
      const page = newValue <= pages ? newValue : pages;
      dispatch({ type: ActionKind.CHANGE_SEARCH_VALUE, payload: { key, value: page } });
      return;
    }
    dispatch({ type: ActionKind.CHANGE_SEARCH_VALUE, payload: { key, value: newValue } });
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: ActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        loading: true,
        mode: Mode.SEARCH,
      },
    });
  };
  const handleDataNext = () => {
    if (mainState.state.page < mainState.state.pages) {
      dispatch({ type: ActionKind.CHANGE_PAGE, payload: (mainState.state.page += 1) });
    }
  };
  const handleDataPrev = () => {
    if (mainState.state.page > 1) {
      dispatch({ type: ActionKind.CHANGE_PAGE, payload: (mainState.state.page -= 1) });
    }
  };
  const handleDataEnd = () => {
    if (mainState.state.page < mainState.state.pages) {
      dispatch({
        type: ActionKind.CHANGE_PAGE,
        payload: mainState.state.pages,
      });
    }
  };
  const handleDataBegin = () => {
    if (mainState.state.page > 1) {
      dispatch({ type: ActionKind.CHANGE_PAGE, payload: 1 });
    }
  };
  const handleToListMode = async () => {
    dispatch({
      type: ActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        mode: Mode.LIST,
        loading: true,
      },
    });
  };
  const navigate = useNavigate();
  const handleCreateModal = (id: string) => {
    const modalDoc = mainState.docs.find((item) => item._id === id) || null;
    dispatch({
      type: ActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        modalMode: true,
        modalDoc,
      },
    });
    navigate(routes.DETAIL, { replace: false });
  };
  return (
    <div className="App">
      <h1>The Lord of the Rings - search characters</h1>
      <Search
        names={mainState.names}
        state={mainState.state}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleToListMode={handleToListMode}
      />
      {mainState.state.loading ? (
        <div className="preloader">
          <Preloader />
        </div>
      ) : mainState.state.error ? (
        <NetworkError message={mainState.state.errorMessage} />
      ) : (
        <Characters
          docs={mainState.docs}
          page={mainState.state.page}
          mode={mainState.state.mode}
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

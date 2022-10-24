import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { FormEvent, useContext, useEffect } from 'react';
import './Main.css';
import Modal from 'components/Characters/Modal';
import { IDataLoad, IDataSearch } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';
import { CardActionKind, MainStateContext } from 'App';

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
  total: number;
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
  mode: Mode;
  modalMode: boolean;
  modalDoc: ICharacter | null;
}
interface IProps {
  timers: { timeout: NodeJS.Timeout | null };
  searchCharacters: (name: string) => Promise<IDataSearch>;
  loadCharacters: (page: number) => Promise<IDataLoad>;
}

const Main = (props: IProps) => {
  const { mainState, dispatch } = useContext(MainStateContext);
  const { page, mode, loading, searchValue } = mainState.state;
  useEffect(() => {
    if (mode === Mode.LIST) {
      dispatch({ type: CardActionKind.INIT_LOADING });
      const handleDataLoad = async (page: number) => {
        const { docs, loading, pages, error, mode, errorMessage } = await props.loadCharacters(
          page
        );
        dispatch({
          type: CardActionKind.LOAD_CHARACTERS_STATE,
          payload: {
            ...mainState.state,
            loading,
            pages: pages || mainState.state.pages,
            error,
            mode,
            searchValue: localStorage.getItem('searchValue') ?? '',
            errorMessage: errorMessage || undefined,
          },
        });
        dispatch({ type: CardActionKind.ADD_CHARACTERS, payload: docs });
      };
      handleDataLoad(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, mode]);
  useEffect(() => {
    if (mode === Mode.SEARCH && loading) {
      const handleDataSearch = async (name: string) => {
        const { docs, loading, error, mode, errorMessage } = await props.searchCharacters(name);
        dispatch({
          type: CardActionKind.LOAD_CHARACTERS_STATE,
          payload: {
            ...mainState.state,
            loading,
            error,
            mode,
            errorMessage,
            searchValue: '',
          },
        });
        dispatch({ type: CardActionKind.ADD_CHARACTERS, payload: docs });
      };
      handleDataSearch(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const handleNamesLoad = async (value: string) => {
      if (props.timers.timeout) clearTimeout(props.timers.timeout);
      props.timers.timeout = setTimeout(async () => {
        const data = await props.searchCharacters(value);
        const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
        dispatch({ type: CardActionKind.ADD_NAMES, payload: names });
      }, 1000);
    };
    handleNamesLoad(mainState.state.searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainState.state.searchValue]);
  const handleOnChange = async (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    localStorage.setItem('searchValue', value);
    dispatch({ type: CardActionKind.CHANGE_SEARCH_VALUE, payload: value });
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: CardActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        loading: true,
        mode: Mode.SEARCH,
      },
    });
  };
  const handleDataNext = () => {
    if (mainState.state.page < mainState.state.pages) {
      dispatch({ type: CardActionKind.CHANGE_PAGE, payload: (mainState.state.page += 1) });
    }
  };
  const handleDataPrev = () => {
    if (mainState.state.page > 1) {
      dispatch({ type: CardActionKind.CHANGE_PAGE, payload: (mainState.state.page -= 1) });
    }
  };
  const handleDataEnd = () => {
    if (mainState.state.page < mainState.state.pages) {
      dispatch({
        type: CardActionKind.CHANGE_PAGE,
        payload: mainState.state.pages,
      });
    }
  };
  const handleDataBegin = () => {
    if (mainState.state.page > 1) {
      dispatch({ type: CardActionKind.CHANGE_PAGE, payload: 1 });
    }
  };
  const handleToListMode = async () => {
    dispatch({
      type: CardActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        mode: Mode.LIST,
      },
    });
  };
  const handleRemoveModal = () => {
    dispatch({
      type: CardActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        modalMode: false,
        modalDoc: null,
      },
    });
  };
  const handleCreateModal = (id: string) => {
    const modalDoc = mainState.docs.find((item) => item._id === id) || null;
    dispatch({
      type: CardActionKind.LOAD_CHARACTERS_STATE,
      payload: {
        ...mainState.state,
        modalMode: true,
        modalDoc,
      },
    });
  };
  return (
    <div className="App">
      <h1>The Lord of the Rings - search characters</h1>
      <Search
        names={mainState.names}
        searchValue={mainState.state.searchValue}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
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
      {mainState.state.modalMode && (
        <Modal handleRemoveModal={handleRemoveModal} modalDoc={mainState.state.modalDoc} />
      )}
    </div>
  );
};

export default Main;

import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { FormEvent, useState, useEffect } from 'react';
import './Main.css';
import Modal from 'components/Characters/Modal';
import { IDataLoad, IDataSearch } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';

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
interface IState {
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
  searchCharacters: (name: string) => Promise<IDataSearch>;
  loadCharacters: (page: number) => Promise<IDataLoad>;
}
const initialState: IState = {
  loading: true,
  error: false,
  errorMessage: '',
  searchValue: localStorage.getItem('searchValue') ?? '',
  page: 1,
  pages: 0,
  mode: Mode.LIST,
  modalMode: false,
  modalDoc: null,
};

const Main = (props: IProps) => {
  const [state, setState] = useState(initialState);
  const [docs, setDocs] = useState([] as ICharacter[] | []);
  const [names, setNames] = useState([] as IName[] | []);
  const { page, mode, loading, searchValue } = state;
  useEffect(() => {
    if (mode === Mode.LIST) {
      const handleDataLoad = async (page: number) => {
        setState({ ...state, loading: true });
        const { docs, loading, pages, error, mode, errorMessage } = await props.loadCharacters(
          page
        );
        setState({
          ...state,
          loading,
          pages: pages || state.pages,
          error,
          mode,
          errorMessage: errorMessage || undefined,
        });
        setDocs(docs);
      };
      handleDataLoad(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, mode]);
  useEffect(() => {
    if (mode === Mode.SEARCH && loading) {
      const handleDataSearch = async (name: string) => {
        const { docs, loading, error, mode, errorMessage } = await props.searchCharacters(name);
        setState({
          ...state,
          loading,
          error,
          mode,
          errorMessage,
          searchValue: '',
        });
        setDocs(docs);
      };
      handleDataSearch(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const handleOnChange = async (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setState({
      ...state,
      searchValue: value,
    });
    const data = await props.searchCharacters(value);
    const names = data.docs.map(({ name, _id }) => ({ name, id: _id }));
    setNames(names);
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState({ ...state, loading: true, mode: Mode.SEARCH });
  };
  const handleDataNext = () => {
    if (state.page < state.pages) {
      setState({ ...state, page: (state.page += 1) });
    }
  };
  const handleDataPrev = () => {
    if (state.page > 1) {
      setState({ ...state, page: (state.page -= 1) });
    }
  };
  const handleDataEnd = () => {
    if (state.page < state.pages) {
      setState({ ...state, page: state.pages });
    }
  };
  const handleDataBegin = () => {
    if (state.page > 1) {
      setState({ ...state, page: 1 });
    }
  };
  const handleToListMode = async () => {
    setState({ ...state, mode: Mode.LIST });
  };
  const handleRemoveModal = () => {
    setState({ ...state, modalMode: false, modalDoc: null });
  };
  const handleCreateModal = (id: string) => {
    const modalDoc = findModalData(id);
    setState({
      ...state,
      modalMode: true,
      modalDoc,
    });
  };
  const findModalData = (id: string) => {
    return docs.find((item) => item._id === id) || null;
  };
  return (
    <div className="App">
      <h1>The Lord of the Rings - search characters</h1>
      <Search
        names={names}
        searchValue={state.searchValue}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
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
      {state.modalMode && <Modal handleRemoveModal={handleRemoveModal} modalDoc={state.modalDoc} />}
    </div>
  );
};

export default Main;

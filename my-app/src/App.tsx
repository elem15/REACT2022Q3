import React, { createContext, FormEvent, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main, { ICharacter, IName, IState } from 'components/Main/MainAppState';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer from 'components/Form/FormContainerAppState';
import { routes } from 'helpers/constants/routes';
import { searchCharacters, loadCharacters } from 'helpers/controllers/getCharacters';
import { Mode } from 'helpers/constants/mode';

export interface IMainState {
  names: IName[] | [];
  docs: ICharacter[];
  state: IState;
}
export enum CardActionKind {
  ADD_NAMES = 'ADD_NAMES',
  ADD_CHARACTERS = 'ADD_CHARACTERS',
  INIT_LOADING = 'INIT_LOADING',
  LOAD_CHARACTERS_STATE = 'LOAD_CHARACTERS_STATE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE',
}
interface INamesAction {
  type: CardActionKind.ADD_NAMES;
  payload: IName[] | [];
}
interface ICharactersAction {
  type: CardActionKind.ADD_CHARACTERS;
  payload: ICharacter[] | [];
}
interface IInitLoadingAction {
  type: CardActionKind.INIT_LOADING;
}
interface ILoadCharactersAction {
  type: CardActionKind.LOAD_CHARACTERS_STATE;
  payload: IState;
}
interface IChangePageAction {
  type: CardActionKind.CHANGE_PAGE;
  payload: number;
}
interface IChangeSearchValueAction {
  type: CardActionKind.CHANGE_SEARCH_VALUE;
  payload: string;
}
export type IAction =
  | INamesAction
  | ICharactersAction
  | IInitLoadingAction
  | ILoadCharactersAction
  | IChangePageAction
  | IChangeSearchValueAction;
const mainState: IMainState = {
  names: [],
  docs: [],
  state: {
    loading: true,
    error: false,
    errorMessage: '',
    searchValue: '',
    page: 1,
    pages: 0,
    mode: Mode.LIST,
    modalMode: false,
    modalDoc: null,
  },
};
const reducer = (mainState: IMainState, action: IAction) => {
  const { type } = action;
  switch (type) {
    case CardActionKind.ADD_NAMES:
      return { ...mainState, names: action.payload };
    case CardActionKind.ADD_CHARACTERS:
      return { ...mainState, docs: action.payload };
    case CardActionKind.INIT_LOADING:
      return {
        ...mainState,
        state: {
          ...mainState.state,
          loading: true,
          searchValue: localStorage.getItem('searchValue') ?? '',
        },
      };
    case CardActionKind.LOAD_CHARACTERS_STATE:
      return { ...mainState, state: action.payload };
    case CardActionKind.CHANGE_PAGE:
      return { ...mainState, state: { ...mainState.state, page: action.payload } };
    case CardActionKind.CHANGE_SEARCH_VALUE:
      return { ...mainState, state: { ...mainState.state, searchValue: action.payload } };
    default:
      return mainState;
  }
};
const dispatch: React.Dispatch<IAction> = ({ type }) => {
  console.log(type);
};
export const MainStateContext = createContext({ mainState, dispatch });
function App() {
  const timers = {
    timeout: null as NodeJS.Timeout | null,
  };
  const [reducerMainState, dispatch] = useReducer(reducer, mainState);
  // const value = {
  //   handleOnChange: async (e: FormEvent<HTMLInputElement>) => {
  //     const { value } = e.target as HTMLInputElement;
  //     localStorage.setItem('searchValue', value);
  //     dispatch({ type: CardActionKind.CHANGE_SEARCH_VALUE, payload: value });
  //   },
  //   handleOnSubmit: (e: FormEvent) => {
  //     e.preventDefault();
  //     dispatch({
  //       type: CardActionKind.LOAD_CHARACTERS_STATE,
  //       payload: {
  //         ...mainState.state,
  //         loading: true,
  //         mode: Mode.SEARCH,
  //       },
  //     });
  //   },
  //   handleDataNext: () => {
  //     if (mainState.state.page < mainState.state.pages) {
  //       dispatch({ type: CardActionKind.CHANGE_PAGE, payload: (mainState.state.page += 1) });
  //     }
  //   },
  //   handleDataPrev: () => {
  //     if (mainState.state.page > 1) {
  //       dispatch({ type: CardActionKind.CHANGE_PAGE, payload: (mainState.state.page -= 1) });
  //     }
  //   },
  //   handleDataEnd: () => {
  //     if (mainState.state.page < mainState.state.pages) {
  //       dispatch({
  //         type: CardActionKind.CHANGE_PAGE,
  //         payload: mainState.state.pages,
  //       });
  //     }
  //   },
  //   handleDataBegin: () => {
  //     if (mainState.state.page > 1) {
  //       dispatch({ type: CardActionKind.CHANGE_PAGE, payload: 1 });
  //     }
  //   },
  //   handleToListMode: async () => {
  //     dispatch({
  //       type: CardActionKind.LOAD_CHARACTERS_STATE,
  //       payload: {
  //         ...mainState.state,
  //         mode: Mode.LIST,
  //       },
  //     });
  //   },
  //   handleRemoveModal: () => {
  //     dispatch({
  //       type: CardActionKind.LOAD_CHARACTERS_STATE,
  //       payload: {
  //         ...mainState.state,
  //         modalMode: false,
  //         modalDoc: null,
  //       },
  //     });
  //   },
  //   handleCreateModal: (id: string) => {
  //     const modalDoc = mainState.docs.find((item) => item._id === id) || null;
  //     dispatch({
  //       type: CardActionKind.LOAD_CHARACTERS_STATE,
  //       payload: {
  //         ...mainState.state,
  //         modalMode: true,
  //         modalDoc,
  //       },
  //     });
  //   },
  // };
  return (
    <MainStateContext.Provider value={{ mainState: reducerMainState, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.BASE_URL} element={<Layout />}>
            <Route
              index
              element={
                <Main
                  searchCharacters={searchCharacters}
                  loadCharacters={loadCharacters}
                  timers={timers}
                />
              }
            />
            <Route path={routes.FORM} element={<FormContainer />} />
            <Route path={routes.ABOUT} element={<About />} />
            <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={routes.NOT_DEFINED} element={<Navigate to={routes.NOT_FOUND} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainStateContext.Provider>
  );
}

export default App;

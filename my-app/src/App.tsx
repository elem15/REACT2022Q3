import React, { createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main, { ICharacter, IName, IState } from 'components/Main/MainAppState';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer, { IForm } from 'components/Form/FormContainerAppState';
import { routes } from 'helpers/constants/routes';
import { searchCharacters, loadCharacters } from 'helpers/controllers/getCharacters';
import { Mode } from 'helpers/constants/mode';
import { ICard } from 'components/Cards/Cards';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';

export interface IMainState {
  names: IName[] | [];
  docs: ICharacter[];
  cards: ICard[] | [];
  state: IState;
}
export enum CardActionKind {
  ADD_NAMES = 'ADD_NAMES',
  ADD_CHARACTERS = 'ADD_CHARACTERS',
  INIT_LOADING = 'INIT_LOADING',
  LOAD_CHARACTERS_STATE = 'LOAD_CHARACTERS_STATE',
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE',
  ADD_CARD = 'ADD_CARD',
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
interface ICardAction {
  type: CardActionKind.ADD_CARD;
  payload: ICard;
}
export type IAction =
  | INamesAction
  | ICharactersAction
  | IInitLoadingAction
  | ILoadCharactersAction
  | IChangePageAction
  | IChangeSearchValueAction
  | ICardAction;
const mainState: IMainState = {
  names: [],
  docs: [],
  cards: [],
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
    case CardActionKind.ADD_CARD:
      return { ...mainState, cards: [...mainState.cards, action.payload] };
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
const timers = {
  timeout: null as NodeJS.Timeout | null,
};
const schema = yup
  .object()
  .shape({
    address: yup.string().required().min(8, 'address must be more than 8 characters'),
    price: yup.number().required().min(10000, 'min cost 10000 $'),
    date: yup
      .date()
      .required()
      .min(new Date('1950-01-01'), 'please start from 1950')
      .max(new Date(), 'future dates are deprecated'),
    houseType: yup.string().required().min(8, 'house type is required'),
  })
  .required();
export const MainStateContext = createContext({ mainState, dispatch });
export interface IFormContext {
  handleSubmit?: UseFormHandleSubmit<FieldValues>;
  register?: UseFormRegister<FieldValues & IForm>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
}

export const FormContext = createContext<IFormContext>({});
function App() {
  const [reducerMainState, dispatch] = useReducer(reducer, mainState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });
  return (
    <MainStateContext.Provider value={{ mainState: reducerMainState, dispatch }}>
      <FormContext.Provider value={{ register, handleSubmit, errors } as IFormContext}>
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
              <Route
                path={routes.NOT_DEFINED}
                element={<Navigate to={routes.NOT_FOUND} replace />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </FormContext.Provider>
    </MainStateContext.Provider>
  );
}

export default App;

import { ICard } from 'components/Cards/Cards';
import { ICharacter, IName, IState } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { GenderType, SortingOrder, SortingValues } from 'helpers/constants/sorting';
import { ActionKind } from '../helpers/constants/actions';

interface IMainState {
  names: IName[];
  docs: ICharacter[];
  cards: ICard[];
  state: IState;
}
interface INamesAction {
  type: ActionKind.ADD_NAMES;
  payload: IName[];
}
interface ICharactersAction {
  type: ActionKind.ADD_CHARACTERS;
  payload: ICharacter[];
}
interface ILoadCharactersAction {
  type: ActionKind.LOAD_CHARACTERS_STATE;
  payload: IState;
}
interface IChangePageAction {
  type: ActionKind.CHANGE_PAGE;
  payload: number;
}
interface IChangeSearchValueAction {
  type: ActionKind.CHANGE_SEARCH_VALUE;
  payload: { key: keyof IState; value: string | number };
}
interface ICardAction {
  type: ActionKind.ADD_CARD;
  payload: ICard;
}
export type IAction =
  | INamesAction
  | ICharactersAction
  | ILoadCharactersAction
  | IChangePageAction
  | IChangeSearchValueAction
  | ICardAction;
export const mainState: IMainState = {
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
    total: 0,
    limit: 10,
    mode: Mode.LIST,
    modalMode: false,
    modalDoc: null,
    order: SortingOrder.ASC,
    sort: SortingValues.DEFAULT,
    gender: GenderType.DEFAULT,
  },
};
export const reducer = (mainState: IMainState, action: IAction) => {
  const { type } = action;
  switch (type) {
    case ActionKind.ADD_NAMES:
      return { ...mainState, names: action.payload };
    case ActionKind.ADD_CHARACTERS:
      return { ...mainState, docs: action.payload };
    case ActionKind.ADD_CARD:
      return { ...mainState, cards: [...mainState.cards, action.payload] };
    case ActionKind.LOAD_CHARACTERS_STATE:
      return { ...mainState, state: action.payload };
    case ActionKind.CHANGE_PAGE:
      return { ...mainState, state: { ...mainState.state, page: action.payload, loading: true } };
    case ActionKind.CHANGE_SEARCH_VALUE:
      return {
        ...mainState,
        state: { ...mainState.state, [action.payload.key]: action.payload.value },
      };
    default:
      return mainState;
  }
};

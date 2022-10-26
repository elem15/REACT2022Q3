import axios, { AxiosError } from 'axios';
import { ICharacter, IDocs } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { routes } from 'helpers/constants/routes';

export interface IDataSearch {
  docs: ICharacter[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
  mode: Mode;
}
export interface IDataLoad {
  docs: ICharacter[];
  errorMessage?: string;
  loading: boolean;
  error: boolean;
  pages?: number;
  mode: Mode;
  total?: number;
}
export interface IErrorData {
  message: string;
  success: boolean;
}
export interface ILoadCharactersArgs {
  page: number;
  limit: number;
  order: string;
  sort: string;
  gender: string;
}
export const loadCharacters = async (args: ILoadCharactersArgs) => {
  const { order, sort } = args;
  const query = Object.entries(args)
    .filter(([key, value]) => key !== 'sort' && key !== 'order' && value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  try {
    const response = await axios.get<IDocs>(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?${query}${sort && `&sort=${sort}:${order}`}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
        },
      }
    );
    const { data } = response;
    return {
      docs: data.docs,
      loading: false,
      pages: data.pages,
      error: false,
      mode: Mode.LIST,
      total: data.total,
    };
  } catch (e) {
    const error = e as AxiosError;
    const data = error.response?.data as IErrorData;
    let errorMessage;
    if (data instanceof Object) {
      errorMessage = data.message;
    } else {
      errorMessage = data;
    }
    return {
      error: true,
      loading: false,
      docs: [],
      mode: Mode.SEARCH,
      errorMessage,
    };
  }
};
export const searchCharacters = async (name: string) => {
  if (name.length < 3) {
    return {
      docs: [],
      loading: false,
      error: false,
      mode: Mode.SEARCH,
      errorMessage: '',
    };
  }
  const bracketIndex = name.indexOf('(');
  const correctName = bracketIndex > -1 ? name.slice(0, bracketIndex) : name;
  try {
    const response = await axios.get<IDocs>(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?name=${new RegExp(correctName, 'i')}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
        },
      }
    );
    return {
      docs: response.data.docs,
      loading: false,
      error: false,
      mode: Mode.SEARCH,
      errorMessage: '',
    };
  } catch (e) {
    const error = e as AxiosError;
    const data = error.response?.data as IErrorData;
    let errorMessage;
    if (data instanceof Object) {
      errorMessage = data.message;
    } else {
      errorMessage = data;
    }
    return { error: true, loading: false, docs: [], mode: Mode.SEARCH, errorMessage };
  }
};

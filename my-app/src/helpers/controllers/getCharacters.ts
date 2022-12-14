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
  page: number;
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
  order?: string;
  sort?: string;
  gender: string;
  searchValue?: string;
}
export const loadCharacters = async (args: ILoadCharactersArgs): Promise<IDataLoad> => {
  const { order, sort, searchValue } = args;
  const newArgs = { ...args };
  delete newArgs.order;
  delete newArgs.sort;
  delete newArgs.searchValue;
  let name;
  if (searchValue) {
    const bracketIndex = searchValue.indexOf('(');
    const correctName = bracketIndex > -1 ? searchValue.slice(0, bracketIndex) : searchValue;
    name = new RegExp(correctName, 'i');
  }
  const params = { ...newArgs, name, sort: sort && `${sort}:${order}` };
  for (const key in params) {
    const k = key as keyof ILoadCharactersArgs;
    if (!params[k]) {
      delete params[k];
    }
  }
  try {
    const response = await axios.get<IDocs>(`${routes.RINGS_BASE_URL + routes.CHARACTER}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
      },
    });
    const { data } = response;
    if (data.docs.length) {
      return {
        docs: data.docs,
        loading: false,
        page: data.page,
        pages: data.pages,
        error: false,
        mode: Mode.LIST,
        total: data.total,
      };
    } else if (searchValue) {
      const result = await searchCharacters(searchValue as string);
      const docs = await result.docs;
      if (docs.length) {
        const newArgs = { ...args, page: data.pages };
        return await loadCharacters(newArgs);
      } else throw new Error(result.errorMessage);
    } else {
      const newArgs = { ...args, page: data.pages };
      return await loadCharacters(newArgs);
    }
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
      page: 1,
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

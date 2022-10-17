import axios from 'axios';
import { ICharacter, IDocs } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { routes } from 'helpers/constants/routes';

export interface IDataSearch {
  docs: ICharacter[];
  loading: boolean;
  error: boolean;
  mode: Mode;
}
export interface IDataLoad {
  docs?: ICharacter[];
  loading: boolean;
  error: boolean;
  pages?: number;
}
export const loadCharacters = async (page: number) => {
  try {
    const response = await axios.get<IDocs>(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?limit=20&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
        },
      }
    );
    const { data } = response;
    return { docs: data.docs, loading: false, pages: data.pages, error: false };
  } catch (e) {
    console.log(e);
    return { error: true, loading: false };
  }
};
export const searchCharacters = async (name: string) => {
  if (name.length < 3) {
    return {
      docs: [],
      loading: false,
      error: false,
      mode: Mode.SEARCH,
    };
  }
  try {
    const response = await axios.get<IDocs>(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?name=${new RegExp(name, 'i')}`,
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
    };
  } catch (e) {
    console.log(e);
    return { error: true, loading: false, docs: [], mode: Mode.SEARCH };
  }
};

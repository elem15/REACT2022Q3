import { ICharacter } from 'components/Main/Main';
import { Mode } from 'helpers/constants/mode';
import { docs } from './mockCharacter';

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
  const response = docs.filter((item, idx) => idx < 20);
  return { docs: response, loading: false, pages: 20, error: false };
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
  const response = docs.filter((item) => item.name.match(new RegExp(name, 'i')));
  return {
    docs: response,
    loading: false,
    error: false,
    mode: Mode.SEARCH,
  };
};

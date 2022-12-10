import { Mode } from 'helpers/constants/mode';
import { docs } from './mockCharacter';

export const loadCharacters = async (page: number) => {
  const pages = Math.floor(docs.length / 20);
  const currentPageEnd = page * 20;
  const currentPageStart = currentPageEnd - 20;
  const response = docs.filter((item, idx) => idx >= currentPageStart && idx < currentPageEnd);
  return {
    docs: response,
    loading: false,
    pages,
    error: false,
    errorMessage: '',
    mode: Mode.LIST,
  };
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
  const response = docs.filter((item) => item.name.match(new RegExp(name, 'i')));
  return {
    docs: response,
    loading: false,
    error: false,
    mode: Mode.SEARCH,
    errorMessage: '',
  };
};

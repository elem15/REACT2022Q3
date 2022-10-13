import Cards from 'components/Cards/Cards';
import Search from 'components/Search/Search';
import { routes } from 'helpers/constants/routes';
import React, { Component, FormEvent } from 'react';
import data from '../../mockData/data';

export interface Character {
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

export interface Docs {
  docs: Character[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

class Main extends Component {
  state = {
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: {} as Docs,
  };
  componentDidMount = async () => {
    await this.handleDataLoad(1);
  };
  handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({
      searchValue: value,
    });
  };
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.handleDataSearch(this.state.searchValue);
    this.setState({
      searchValue: '',
    });
  };
  handleDataLoad = async (page: number) => {
    const response = (await fetch(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?limit=20&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
        },
      }
    )) as Response;
    const data = await response.json();
    console.log(data);
  };
  handleDataSearch = async (name: string) => {
    if (name.length < 3) return;
    const response = (await fetch(
      `${routes.RINGS_BASE_URL + routes.CHARACTER}?name=${new RegExp(name, 'i')}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
        },
      }
    )) as Response;
    const data = await response.json();
    console.log(data);
  };
  render() {
    return (
      <div className="App">
        <Search
          searchValue={this.state.searchValue}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        <Cards data={data} />
      </div>
    );
  }
}

export default Main;

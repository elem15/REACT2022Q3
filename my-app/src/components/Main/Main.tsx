import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { routes } from 'helpers/constants/routes';
import React, { Component, FormEvent } from 'react';

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
  data: {
    docs: ICharacter[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  };
}

class Main extends Component {
  state = {
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: [],
    data: {} as IDocs,
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
    this.setState({ docs: data.docs });
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
    this.setState({ docs: data.docs });
  };
  render() {
    return (
      <div className="App">
        <Search
          searchValue={this.state.searchValue}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        <Characters docs={this.state.docs} />
      </div>
    );
  }
}

export default Main;

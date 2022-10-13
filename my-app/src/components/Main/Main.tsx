import { ErrorResponse } from '@remix-run/router';
import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import { routes } from 'helpers/constants/routes';
import React, { Component, FormEvent } from 'react';
import './Main.css';

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
  docs: ICharacter[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

class Main extends Component {
  state = {
    loading: true,
    error: false,
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: [],
    page: 1,
    pages: 0,
    mode: Mode.LIST,
  };
  componentDidMount = async () => {
    await this.handleDataLoad(this.state.page);
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
    this.setState({ loading: true });
    try {
      const response = (await fetch(
        `${routes.RINGS_BASE_URL + routes.CHARACTER}?limit=20&page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
          },
        }
      )) as Response;
      const data = (await response.json()) as IDocs;
      this.setState({ docs: data.docs, loading: false, pages: data.pages, error: false });
    } catch (e) {
      this.setState({ error: true });
      console.log(e);
    }
  };
  handleDataNext = async () => {
    if (this.state.page < this.state.pages) {
      await this.setState((prevState: Readonly<IDocs>) => {
        let { page } = prevState;
        return { page: (page += 1) };
      });
      await this.handleDataLoad(this.state.page);
    }
  };
  handleDataPrev = async () => {
    if (this.state.page > 1) {
      await this.setState((prevState: Readonly<IDocs>) => {
        let { page } = prevState;
        return { page: (page -= 1) };
      });
      await this.handleDataLoad(this.state.page);
    }
  };
  handleDataEnd = async () => {
    if (this.state.page < this.state.pages) {
      await this.setState({ page: this.state.pages });
      await this.handleDataLoad(this.state.page);
    }
  };
  handleDataBegin = async () => {
    if (this.state.page > 1) {
      await this.setState({ page: 1 });
      await this.handleDataLoad(this.state.page);
    }
  };
  handleToListMode = async () => {
    this.setState({ mode: Mode.LIST });
    await this.handleDataLoad(this.state.page);
  };
  handleDataSearch = async (name: string) => {
    if (name.length < 3) {
      this.setState({
        docs: [],
        loading: false,
        error: false,
        mode: Mode.SEARCH,
      });
      return;
    }
    try {
      this.setState({ loading: true });
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
      this.setState({
        docs: data.docs,
        loading: false,
        error: false,
        mode: Mode.SEARCH,
      });
    } catch (e) {
      this.setState({ error: true });
      console.log(e);
    }
  };
  render() {
    return (
      <div className="App">
        <h1>The Lord of the Rings - search characters</h1>
        <Search
          searchValue={this.state.searchValue}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        {this.state.loading ? (
          <div>loading</div>
        ) : this.state.error ? (
          <div>error</div>
        ) : (
          <Characters
            docs={this.state.docs}
            page={this.state.page}
            mode={this.state.mode}
            handleDataNext={this.handleDataNext}
            handleDataPrev={this.handleDataPrev}
            handleDataEnd={this.handleDataEnd}
            handleDataBegin={this.handleDataBegin}
            handleToListMode={this.handleToListMode}
          />
        )}
      </div>
    );
  }
}

export default Main;

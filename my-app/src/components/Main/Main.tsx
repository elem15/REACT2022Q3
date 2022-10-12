import Cards from 'components/Cards/Cards';
import Search from 'components/Search/Search';
import { routes } from 'helpers/constants/routes';
import React, { Component, FormEvent } from 'react';
import data from '../../mockData/data';

interface Docs {
  docs: {
    _id: string;
    name: string;
  }[];
  total: number;
  limit: number;
  offset: number;
  page: number;
  pages: number;
}

class Main extends Component {
  state = {
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: {
      // eslint-disable-next-line prettier/prettier
      // "docs":  [{ "_id": "5cf5805fb53e011a64671582", "name": "The Fellowship Of The Ring" }, { "_id": "5cf58077b53e011a64671583", "name": "The Two Towers" }, { "_id": "5cf58080b53e011a64671584", "name": "The Return Of The King" }], "total": 3, "limit": 1000, "offset": 0, "page": 1, "pages": 1
    },
  };
  handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({
      searchValue: value,
    });
  };
  handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.handleDataLoad();
    this.setState({
      searchValue: '',
    });
  };
  handleDataLoad = async () => {
    const response = (await fetch(routes.RINGS_BASE_URL + routes.BOOK)) as Response;
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

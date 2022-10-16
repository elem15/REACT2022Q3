import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import { routes } from 'helpers/constants/routes';
import axios from 'axios';
import React, { FormEvent, PureComponent } from 'react';
import './Main.css';
import Modal from 'components/Characters/Modal';

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
interface IProps {
  str: string;
}
interface IState {
  loading: boolean;
  error: boolean;
  searchValue: string;
  docs: ICharacter[];
  page: number;
  pages: number;
  mode: Mode;
  modalMode: boolean;
  modalDoc: ICharacter | null;
}

class Main extends PureComponent {
  state: IState = {
    loading: true,
    error: false,
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: [],
    page: 1,
    pages: 0,
    mode: Mode.LIST,
    modalMode: false,
    modalDoc: null,
  };
  componentDidMount = () => {
    this.handleDataLoad(this.state.page);
  };
  componentDidUpdate = (prevProps: IProps, prevState: IState) => {
    if (this.state.page !== prevState.page) {
      this.handleDataLoad(this.state.page);
    }
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
      this.setState({ docs: data.docs, loading: false, pages: data.pages, error: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
      console.log(e);
    }
  };
  handleDataNext = () => {
    if (this.state.page < this.state.pages) {
      this.setState((prevState: Readonly<IDocs>) => {
        let { page } = prevState;
        return { page: (page += 1) };
      });
    }
  };
  handleDataPrev = () => {
    if (this.state.page > 1) {
      this.setState((prevState: Readonly<IDocs>) => {
        let { page } = prevState;
        return { page: (page -= 1) };
      });
    }
  };
  handleDataEnd = () => {
    if (this.state.page < this.state.pages) {
      this.setState({ page: this.state.pages });
    }
  };
  handleDataBegin = () => {
    if (this.state.page > 1) {
      this.setState({ page: 1 });
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
      const response = await axios.get<IDocs>(
        `${routes.RINGS_BASE_URL + routes.CHARACTER}?name=${new RegExp(name, 'i')}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer nsE8y9-1ROOhOc94FITF',
          },
        }
      );
      this.setState({
        docs: response.data.docs,
        loading: false,
        error: false,
        mode: Mode.SEARCH,
      });
    } catch (e) {
      this.setState({ error: true, loading: false });
      console.log(e);
    }
  };
  handleRemoveModal = () => {
    this.setState({ modalMode: false });
  };
  handleCreateModal = (id: string) => {
    const modalDoc = this.findModalData(id);
    this.setState({
      modalMode: true,
      modalDoc,
    });
  };
  findModalData = (id: string) => {
    return this.state.docs.find((item) => item._id === id);
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
          <div>same network error</div>
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
            handleCreateModal={this.handleCreateModal}
          />
        )}
        {this.state.modalMode && (
          <Modal handleRemoveModal={this.handleRemoveModal} modalDoc={this.state.modalDoc} />
        )}
      </div>
    );
  }
}

export default Main;

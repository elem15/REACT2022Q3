import Characters from 'components/Characters/Characters';
import Search from 'components/Search/Search';
import { Mode } from 'helpers/constants/mode';
import React, { FormEvent, Component } from 'react';
import './Main.css';
import Modal from 'components/Characters/Modal';
import { IDataLoad, IDataSearch } from 'helpers/controllers/getCharacters';
import Preloader from 'components/Preloader/Preloader';
import NetworkError from 'components/NetworkError/NetworkError';

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
interface IState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  searchValue: string;
  docs: ICharacter[];
  names: string[];
  page: number;
  pages: number;
  mode: Mode;
  modalMode: boolean;
  modalDoc: ICharacter | null;
}
interface IProps {
  searchCharacters: (name: string) => Promise<IDataSearch>;
  loadCharacters: (page: number) => Promise<IDataLoad>;
}

class Main extends Component<IProps> {
  state: IState = {
    loading: true,
    error: false,
    errorMessage: '',
    searchValue: localStorage.getItem('searchValue') ?? '',
    docs: [],
    names: [],
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
  handleOnChange = async (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    this.setState({
      searchValue: value,
    });
    const data = await this.props.searchCharacters(value);
    const names = data.docs.map((item) => item.name);
    this.setState({ names });
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
    this.setState(await this.props.loadCharacters(page));
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
    this.setState({ loading: true });
    this.setState(await this.props.searchCharacters(name));
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
          names={this.state.names}
          searchValue={this.state.searchValue}
          handleOnChange={this.handleOnChange}
          handleOnSubmit={this.handleOnSubmit}
        />
        {this.state.loading ? (
          <div className="preloader">
            <Preloader />
          </div>
        ) : this.state.error ? (
          <NetworkError message={this.state.errorMessage} />
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

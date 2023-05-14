import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Gallery } from './ImageGallery';
import imagesAPI from './services/images-api';
import { LoadMoreBtn } from './Button';
import { Spinner } from './Loader';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    hits: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.searchQuery;
    const nextSearchQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      imagesAPI
        .fetchImages(nextSearchQuery, nextPage)
        .then(({ hits }) =>
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  formSubmitHandler = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      error: null,
      hits: [],
      status: 'idle',
    });
  };

  btnClickHandler = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { hits, status, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {status === 'idle' && <h2>Enter a search query.</h2>}
        {status === 'pending' && <Spinner />}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <div>
            <Gallery hits={hits} />
            {hits && hits.length > 0 && (
              <LoadMoreBtn onClick={this.btnClickHandler} />
            )}
          </div>
        )}
      </Container>
    );
  }
}

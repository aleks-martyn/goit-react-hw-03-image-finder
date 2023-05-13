import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
import { Spinner } from './Loader';
import { Modal } from './Modal';
import imagesAPI from './services/images-api';
import { Wrap, GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    hits: [],
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    tags: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      if (prevSearchQuery !== nextSearchQuery) {
        this.setState({ hits: [], page: 1 });
      }

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

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags,
    }));
  };

  btnClickHandler = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { hits, error, status, showModal, largeImageURL, tags } = this.state;

    if (status === 'idle') {
      return <h2>Enter a search query.</h2>;
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
      return (
        <Wrap>
          {hits.length === 0 && <h2>Nothing was found for this query.</h2>}
          <GalleryList>
            {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
              <GalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                openModal={this.toggleModal}
              />
            ))}
          </GalleryList>
          {hits.length > 0 && <LoadMoreBtn onClick={this.btnClickHandler} />}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </Wrap>
      );
    }
  }
}

Gallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

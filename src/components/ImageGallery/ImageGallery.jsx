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
    data: {},
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: "",
    tags: "",
  };

  //componentDidMount() {
  //  window.addEventListener('click', event => {
  //    console.log(event.target)
  //  });
  //}

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });

      imagesAPI
        .fetchImages(nextSearchQuery)
        .then(data => this.setState({ data, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = (largeImageURL, tags) => {
    console.log(largeImageURL);
    this.setState(({ showModal, largeImageURL, tags }) => ({ showModal: !showModal, largeImageURL, tags }));
  };

  btnClickHandler = event => {
    console.log(event);
  };

  render() {
    const {
      data: { hits },
      error,
      status,
      showModal,
      largeImageURL,
      tags,
    } = this.state;
    console.log(largeImageURL);
    if (status === 'idle') {
      return <div>Введіть пошуковий запит.</div>;
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
          <GalleryList>
            {hits.length === 0 && <p>За цим запитом нічого не знайдено.</p>}
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
            <Modal>
              <img
                src={largeImageURL}
                alt={tags}
              />
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

import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';
import { Wrap, GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
      tags,
    }));
  };

  render() {
    const { hits } = this.props;
    const { showModal, largeImageURL, tags } = this.state;

    return (
      <Wrap>
        {hits && hits.length === 0 && (
          <h2>Nothing was found for this query.</h2>
        )}
        <GalleryList>
          {hits &&
            hits.map(({ id, webformatURL, tags, largeImageURL }) => (
              <GalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                openModal={this.toggleModal}
              />
            ))}
        </GalleryList>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </Wrap>
    );
  }
}

Gallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

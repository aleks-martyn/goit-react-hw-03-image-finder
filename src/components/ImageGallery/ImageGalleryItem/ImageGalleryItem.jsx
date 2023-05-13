import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const GalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  openModal,
}) => {
  return (
    <Item>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => openModal(largeImageURL, tags)}
      />
    </Item>
  );
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
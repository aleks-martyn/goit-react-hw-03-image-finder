import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const GalleryItem = ({ webformatURL, tags }) => (
  <Item>
    <Image src={webformatURL} alt={tags} />
  </Item>
);

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const GalleryItem = ({ url, description }) => {
  return (
    <Item>
      <Image src={url} alt={description} />
    </Item>
  );
};

GalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

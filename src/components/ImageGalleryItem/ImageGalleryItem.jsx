import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const GalleryItem = ({ preview, description }) => {
  return (
    <Item>
      <Image src={preview} alt={description} />
    </Item>
  );
};

GalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

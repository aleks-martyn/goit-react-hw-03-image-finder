import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const Gallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(({ id, preview, description }) => (
        <GalleryItem key={id} src={preview} alt={description} />
      ))}
    </GalleryList>
  );
};

GalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

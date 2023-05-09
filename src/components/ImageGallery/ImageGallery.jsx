import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const Gallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(({ id, url, description }) => (
        <GalleryItem key={id} src={url} alt={description} />
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

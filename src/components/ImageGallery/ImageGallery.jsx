import { Component } from 'react';
//import { GalleryItem } from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    response: '',
    status: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=34753059-f7902d1f02de9c533025c1a5e&q=${nextSearchQuery}&image_type=photo`
      );
    }
  }

  render() {
    const { response, status } = this.state;
    return (
      <GalleryList>
        <p>{this.props.searchQuery}</p>
      </GalleryList>
    );
  }
}

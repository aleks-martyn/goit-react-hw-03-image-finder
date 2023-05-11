import { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    data: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      fetch(
        `https://pixabay.com/api/?key=34753059-f7902d1f02de9c533025c1a5e&q=${nextSearchQuery}&image_type=photo`
      )
        .then(res => res.json())
        .then(data => this.setState({ data }));
    }
  }

  render() {
    const { data } = this.state;
    return (
      <GalleryList>
        {data.hits &&
          data.hits.map(({ id, webformatURL, tags }) => (
            <GalleryItem key={id} src={webformatURL} alt={tags} />
          ))}
      </GalleryList>
    );
  }
}

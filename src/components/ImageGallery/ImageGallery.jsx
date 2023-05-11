import { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    data: {},
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?key=34753059-f7902d1f02de9c533025c1a5e&q=${nextSearchQuery}&image_type=photo`
      )
        .then(res => res.json())
        .then(data => this.setState({ data }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const {
      data: { hits },
    } = this.state;

    return (
      <GalleryList>
        {this.state.loading && <div>Йде запит...</div>}
        {!this.props.searchQuery && <div>Введіть пошуковий запит.</div>}
        {hits &&
          hits.map(({ id, webformatURL, tags }) => (
            <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
          ))}
      </GalleryList>
    );
  }
}

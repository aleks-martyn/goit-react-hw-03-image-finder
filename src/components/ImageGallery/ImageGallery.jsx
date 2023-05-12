import { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
import { Wrap, GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    data: {},
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?key=34753059-f7902d1f02de9c533025c1a5e&q=${nextSearchQuery}&image_type=photo`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`За запитом ${nextSearchQuery} нічого не знайдено.`)
          );
        })
        .then(data => this.setState({ data }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  btnClickHandler = event => {
    console.log(event);
  };

  render() {
    const {
      data: { hits },
      loading,
      error,
    } = this.state;

    const { searchQuery } = this.props;

    return (
      <Wrap>
        <GalleryList>
          {hits && hits.length === 0 && <p>За запитом нічого не знайдено</p>}
          {error && <h1>{error.message}</h1>}
          {loading && <div>Йде запит...</div>}
          {!searchQuery && <div>Введіть пошуковий запит.</div>}
          {hits &&
            hits.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
            ))}
        </GalleryList>
        {hits && <LoadMoreBtn onClick={this.btnClickHandler} />}
      </Wrap>
    );
  }
}

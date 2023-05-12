import { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem';
import { LoadMoreBtn } from './Button';
import { Wrap, GalleryList } from './ImageGallery.styled';

export class Gallery extends Component {
  state = {
    data: {},
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });

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
        .then(data => this.setState({ data, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  btnClickHandler = event => {
    console.log(event);
  };

  render() {
    const {
      data: { hits },
      error,
      status,
    } = this.state;

    if (status === 'idle') {
      return <div>Введіть пошуковий запит.</div>;
    }

    if (status === 'pending') {
      return <div>Йде запит...</div>;
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    
    if (status === 'resolved') {
      return (
        <Wrap>
          <GalleryList>
            {hits.length === 0 && <p>За запитом нічого не знайдено</p>}
            {hits.map(({ id, webformatURL, tags }) => (
              <GalleryItem key={id} webformatURL={webformatURL} tags={tags} />
            ))}
          </GalleryList>
          {hits.length !== 0 && <LoadMoreBtn onClick={this.btnClickHandler} />}
        </Wrap>
      );
    }
  }
}

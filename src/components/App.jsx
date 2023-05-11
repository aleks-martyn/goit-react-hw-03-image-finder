import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Gallery } from './ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  formSubmitHandler = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <Gallery searchQuery={this.state.searchQuery} />
      </Container>
    );
  }
}

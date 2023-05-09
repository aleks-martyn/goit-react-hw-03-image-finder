import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Container } from './App.styled';

export class App extends Component {
  formSubmitHandler = formData => {
    console.log(formData);
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.formSubmitHandler} />
      </Container>
    );
  }
}

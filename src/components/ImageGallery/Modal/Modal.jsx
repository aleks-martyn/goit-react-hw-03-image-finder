import { Component } from 'react';
//import PropTypes from 'prop-types';
import { Overlay, ModalWin } from './Modal.styled';

export class Modal extends Component {
  //componentDidMount() {
  //  console.log('Modal componentDidMount');
  //}

  //componentWillUnmount() {
  //  console.log('Modal componentWillUnmount');
  //}

  render() {
    return (
      <Overlay>
        <ModalWin>{this.props.children}</ModalWin>
      </Overlay>
    );
  }
}

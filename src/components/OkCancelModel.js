import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap';

export class OkCancelModel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modelTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.modelText}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={() => this.props.handleResponse(true)}>{this.props.OkCaption}</Button>
          <Button bsStyle='danger' onClick={() => this.props.handleResponse(false)}>{this.props.CancelCaption}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
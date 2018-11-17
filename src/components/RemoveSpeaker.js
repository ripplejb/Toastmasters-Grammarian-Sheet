import React, {Component} from 'react'
import {Button, Modal, Grid, Row, FormGroup, FormControl} from "react-bootstrap";


export class RemoveSpeaker extends Component{

  paddingStyle = {
    grid: {
      paddingLeft: 5,
      paddingRight: 5
    },
    row: {
      marginLeft: 5,
      marginRight: 5
    },
    col: {
      paddingLeft: 5,
      paddingRight: 5
    }
  };

  deletePressCount = 0;
  deleteTimeStart = Date.now();

  constructor(props) {
    super(props);
    this.state = {speakerId:null};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
    this.onEntering = this.onEntering.bind(this);
  }

  handleDelete() {
    if (this.deletePressCount === 0 || (Date.now() - this.deleteTimeStart)/1000 > 3) {
      this.deleteTimeStart = Date.now();
      this.deletePressCount = 0;
    }
    this.deletePressCount++;
    if (this.deletePressCount === 4) {
      this.props.handleResponse(this.state.speakerId)
    }
  }

  handleSpeakerChange(e) {
    this.deletePressCount = 0;
    this.deleteTimeStart = Date.now();
    const value = e.target.value;
    this.setState({speakerId: value});
  }

  onEntering() {
    this.setState({speakerId: null})
  }

  render() {
    return(
      <Modal show={this.props.show} onEntering={this.onEntering}>
        <Modal.Header closeButton>
          <Modal.Title>Remove A Speaker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid style={this.paddingStyle.grid}>
            <Row style={this.paddingStyle.row}>
              <FormGroup>
                <FormControl componentClass="select" bsSize='lg'
                             value={this.state.speakerId}
                             onChange={this.handleSpeakerChange}>
                  <option value={null} />
                  {
                    this.props.speakers.map((speaker) => {
                      return <option value={speaker.id}>{speaker.title} : {speaker.name}</option>
                    })
                  }
                </FormControl>
              </FormGroup>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.handleDelete}
                  disabled={this.state.name === '' || this.state.title === ''}>
            Click/Press 4 Times To Delete
          </Button>
          <Button bsStyle='success' onClick={() => this.props.handleResponse(null)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }


}
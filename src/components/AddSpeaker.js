import React, {Component} from 'react'
import {Button, Modal, Grid, Row, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import {roles} from "../data/roles";

export class AddSpeaker extends Component{

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

  handleTitleChange(e) {
    let value = e.target.value;
    this.setState((prevState) => {return {title: value, name: prevState.name}})
  }

  handleNameChange(e) {
    let value = e.target.value;
    this.setState((prevState) => {return {title: prevState.title, name: value}})
  };

  constructor(props) {
    super(props);
    this.state = {
      title: roles[0].role,
      name: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }


  onEnter() {
    this.setState(() => {return {title:roles[0].role, name: ''}})

  }

  render() {
    return(
      <Modal show={this.props.show} onEnter={this.onEntered}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Speaker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid style={this.paddingStyle.grid}>
            <Row style={this.paddingStyle.row}>
              <FormGroup>
                <ControlLabel>Role</ControlLabel>
                <FormControl type='text' bsSize='lg' placeholder='Name'
                             value={this.state.name}
                             onChange={this.handleNameChange}/>
              </FormGroup>
            </Row>
            <Row style={this.paddingStyle.row}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl componentClass="select" bsSize='lg' placeholder='Select Role'
                             value={this.state.title}
                             onChange={this.handleTitleChange}>
                  {
                    roles.map((role) => {
                      return <option value={role.role}>{role.role}</option>
                    })
                  }
                </FormControl>
              </FormGroup>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={() => this.props.handleResponse(this.state)}
                  disabled={this.state.name === '' || this.state.title === ''}>
            Save
          </Button>
          <Button bsStyle='danger' onClick={() => this.props.handleResponse(null)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }


}
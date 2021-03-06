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

  role = null;
  name = '';
  handleRoleChange(e) {
    let value = this.role.value;
    this.setState((prevState) => {return {title: value, name: prevState.name}})
  }

  handleNameChange(e) {
    let value = this.name.value;
    this.setState((prevState) => {return {title: prevState.title, name: value}})
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      name: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.onEntering = this.onEntering.bind(this);
  }


  onEntering() {
    this.setState(() => {return {title:'', name: ''}})

  }

  render() {
    return(
      <Modal show={this.props.show} onEntering={this.onEntering}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Speaker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid style={this.paddingStyle.grid}>
            <Row style={this.paddingStyle.row}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type='text' bsSize='lg' placeholder='Name'
                             value={this.state.name}
                             onChange={this.handleNameChange}
                            inputRef={ref => {this.name = ref;}}/>
              </FormGroup>
            </Row>
            <Row style={this.paddingStyle.row}>
              <FormGroup>
                <ControlLabel>Role</ControlLabel>
                <FormControl componentClass="select" bsSize='lg'
                             value={this.state.title}
                             onChange={this.handleRoleChange}
                             inputRef={ref => {this.role = ref;}}>
                  <option value={null}> </option>
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
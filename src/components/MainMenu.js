import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-theme.min.css';

export class MainMenu extends Component {
  render() {
    return (
      <Navbar fluid inverse collapseOnSelect defaultExpanded>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Speaker List</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
        <Nav>
          {
            this.props.data.list.map((speaker) => {
              return <NavItem eventKey={speaker.id} onClick={
                () => {
                  this.props.handleSelect(speaker.id)
                }
              }>
                {speaker.title}
              </NavItem>
            })
          }
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
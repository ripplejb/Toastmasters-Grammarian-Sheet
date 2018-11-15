import React, {Component} from 'react';
import {NavDropdown, Navbar, MenuItem, Nav, Glyphicon, NavItem} from 'react-bootstrap';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-theme.min.css';

export class MainMenu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar fluid inverse collapseOnSelect defaultExpanded>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Grammarian Filler Word Counter</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown title="Speakers" class="dropdown-menu" onToggle={() => this.props.handleDropDown()}>
            {
              this.props.data.list.map((speaker) => {
                return <MenuItem eventKey={1 + (speaker.id / 10)} onClick={
                  () => {
                    this.props.handleSelect(speaker.id)
                  }
                }>
                  {speaker.title}
                </MenuItem>
              })
            }
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={this.props.handleClear}>
            <Glyphicon glyph='trash' />
          </NavItem>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    )
  }
}
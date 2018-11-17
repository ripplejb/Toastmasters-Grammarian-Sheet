import React, {Component} from 'react';
import {NavDropdown, Navbar, MenuItem, Nav, Glyphicon, NavItem, Grid, Col} from 'react-bootstrap';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-theme.min.css';

export class MainMenu extends Component {

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
                  <Grid>
                    <Col sm={6} md={6} lg={6} xs={6}>
                      {speaker.title}
                    </Col>
                    <Col sm={6} md={6} lg={6} xs={6}>
                      {speaker.name}
                    </Col>
                  </Grid>
                </MenuItem>
              })
            }
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={this.props.handleAddSpeaker}>
            <Glyphicon glyph='plus' />
          </NavItem>
          <NavItem onClick={this.props.handleRemoveSpeaker}>
            <Glyphicon glyph='minus' />
          </NavItem>
          <NavItem onClick={this.props.handleClear}>
            <Glyphicon glyph='refresh' />
          </NavItem>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    )
  }
}
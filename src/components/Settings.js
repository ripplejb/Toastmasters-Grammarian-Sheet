import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap'

class Settings extends Component {
  render() {
    return (<div>
      <Button onClick={() => this.props.history.push("/")}>
        Back
      </Button>
      <h1>This page is under construction...</h1>
    </div>);
  }
}

export default withRouter(Settings);

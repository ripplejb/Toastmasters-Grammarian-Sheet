import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap'

class Settings extends Component {
  render() {
    return (<div>
      <Button onClick={() => this.props.history.push("/")}>
        Test
      </Button>
    </div>);
  }
}

export default withRouter(Settings);

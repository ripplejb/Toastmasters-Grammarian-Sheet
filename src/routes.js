import React, {Component} from 'react'
import {HashRouter as Router, Route} from "react-router-dom";
import App from "./App";
import Settings from "./components/Settings";

export class AppRouter extends Component {

  render() {
    return <Router >
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/settings" component={Settings}/>
      </div>
    </Router>;
  }
}
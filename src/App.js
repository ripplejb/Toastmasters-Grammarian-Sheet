import React, { Component } from 'react';
import './App.css';
import {MainMenu} from "./components/MainMenu";
import {speakers} from './data/list'
import {GrammarianSheet} from "./components/GrammarianSheet";
import {Collapse} from 'react-bootstrap'

class App extends Component {
  constructor(props,context) {
    super(props, context);
    this.state = {
      currentSpeaker: speakers.list[0],
      dropDownOpen: false
    };
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
  }

  findIndex(id) {
    return speakers.list.findIndex((speaker) => {return speaker.id === id});
  }

  handleDropDown() {
    this.setState(prevState => ({currentSpeaker: prevState.currentSpeaker, dropDownOpen: !prevState.dropDownOpen}));
  }

  handleRoleChange(id) {
    const i = this.findIndex(id);
    if (i < 0) return;
    this.setState({currentSpeaker: speakers.list[i]})
  }

  handleGrammarianSheetChange(speaker) {
    const i = this.findIndex(speaker.id);
    if (i < 0) return;
    speakers.list[i] = speaker;
    console.log(speaker);
    this.setState({currentSpeaker: speakers.list[i]})
  }

  render() {
    return (
      <div className="App">
        <MainMenu data={speakers} handleSelect={this.handleRoleChange} handleDropDown={() => this.handleDropDown()}/>
        {!this.state.dropDownOpen ?
          <GrammarianSheet speaker={this.state.currentSpeaker} onGrammarianSheetChange={(speaker) => this.handleGrammarianSheetChange(speaker)}/> :
          null }

      </div>
    );
  }
}

export default App;

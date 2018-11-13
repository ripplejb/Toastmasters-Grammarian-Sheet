import React, { Component } from 'react';
import './App.css';
import {MainMenu} from "./components/MainMenu";
import {speakers} from './data/list'
import {GrammarianSheet} from "./components/GrammarianSheet";

class App extends Component {
  constructor(props,context) {
    super(props, context);
    this.state = {
      currentSpeaker: speakers.list[0]
    }
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  findIndex(id) {
    return speakers.list.findIndex((speaker) => {return speaker.id === id});
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
        <MainMenu data={speakers} handleSelect={this.handleRoleChange}/>
        <GrammarianSheet speaker={this.state.currentSpeaker} onGrammarianSheetChange={(speaker) => this.handleGrammarianSheetChange(speaker)}/>
      </div>
    );
  }
}

export default App;

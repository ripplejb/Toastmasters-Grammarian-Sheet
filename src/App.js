import React, {Component} from 'react';
import './App.css';
import {MainMenu} from "./components/MainMenu";
import {initialSpeakersList} from './data/list'
import {GrammarianSheet} from "./components/GrammarianSheet";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {OkCancelModel} from "./components/OkCancelModel";

class App extends Component {
  LOCAL_STORAGE_KEY = "speakers";
  LOCAL_STORAGE_SPEAKER_INDEX = "speakerIndex"

  constructor(props, context) {
    super(props, context);
    const savedSpeakers = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const speakerIndex = localStorage.getItem(this.LOCAL_STORAGE_SPEAKER_INDEX);
    this.state = {
      allStates: {
        speakers: savedSpeakers ? JSON.parse(savedSpeakers) : JSON.parse(JSON.stringify(initialSpeakersList)),
        currentIndex: speakerIndex ? parseInt(speakerIndex, 10): 0,
        dropDownOpen: false,
        clearModelShow: false
      }
    };
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleClearModelResponse = this.handleClearModelResponse.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  findIndex(id) {
    let speakers = this.state.allStates.speakers;
    return speakers.list.findIndex((speaker) => {
      return speaker.id === id
    });
  }

  handleDropDown() {
    this.setState(prevState => {
      let all = prevState.allStates;
      all.dropDownOpen = !prevState.allStates.dropDownOpen;
      return {allStates: all}
    });
  }

  handleRoleChange(id) {
    const i = this.findIndex(id);
    if (i < 0) return;
    let allStates = this.state.allStates;
    allStates.currentIndex = i;
    localStorage.setItem(this.LOCAL_STORAGE_SPEAKER_INDEX, i);
    this.setState({allStates: allStates})
  }

  handleGrammarianSheetChange(speaker) {
    const i = this.findIndex(speaker.id);
    if (i < 0) return;
    let allStates = this.state.allStates;
    allStates.speakers.list[i] = speaker;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(allStates.speakers))
    this.setState(() => allStates);
  }

  handleClearModelResponse(isOk) {
    let allStates = this.state.allStates;
    if (isOk) {
      localStorage.clear();

      allStates.currentIndex = 0;
      allStates.clearModelShow = false;
      allStates.dropDownOpen = false;
      allStates.speakers = JSON.parse(JSON.stringify(initialSpeakersList));

    } else {
      allStates.clearModelShow = false;
    }
    this.setState(() => allStates);
  }

  handleClear() {
    let allStates = this.state.allStates;
    allStates.clearModelShow = true;
    this.setState(() => allStates);
  }

  render() {
    return (
      <div className="App">
        <MainMenu data={this.state.allStates.speakers}
                  handleSelect={this.handleRoleChange}
                  handleDropDown={() => this.handleDropDown()}
                  handleClear={this.handleClear}
        />
        {!this.state.allStates.dropDownOpen ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
            <GrammarianSheet key="1" speaker={this.state.allStates.speakers.list[this.state.allStates.currentIndex]}
                             onGrammarianSheetChange={(speaker) => this.handleGrammarianSheetChange(speaker)}/>
          </ReactCSSTransitionGroup>
          :
          null}
        <OkCancelModel
          handleResponse={(isOk) => this.handleClearModelResponse(isOk)}
          show={this.state.allStates.clearModelShow}
          OkCaption="Yes"
          CancelCaption="No"
          modelTitle="Warning"
          modelText="Do you want to clear the data ?"
        />
      </div>
    );
  }
}

export default App;

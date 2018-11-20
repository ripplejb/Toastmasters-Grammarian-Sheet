import React, {Component} from 'react';
import './App.css';
import {MainMenu} from "./components/MainMenu";
import {initialSpeakersList} from './data/list'
import {GrammarianSheet} from "./components/GrammarianSheet";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {OkCancelModel} from "./components/OkCancelModel";
import {AddSpeaker} from "./components/AddSpeaker"
import {fillers} from "./data/fillers";
import {RemoveSpeaker} from "./components/RemoveSpeaker";

class App extends Component {
  LOCAL_STORAGE_KEY = "speakers";
  LOCAL_STORAGE_SPEAKER_INDEX = "speakerIndex";

  getInitialSpeakerList() {
    const savedSpeakers = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    let speakers = null;

    if (savedSpeakers)
      speakers = JSON.parse(savedSpeakers);
    else
      JSON.parse(JSON.stringify(initialSpeakersList));

    return speakers;
  }

  getInitialSpeakerIndex(speakers) {
    const speakerIndex = localStorage.getItem(this.LOCAL_STORAGE_SPEAKER_INDEX);
    let index = 0;
    if (speakerIndex) {
      index = parseInt(speakerIndex, 10);
      if (index >= speakers.list.length) index = 0;
    }
    return index;
  }

  constructor(props, context) {
    super(props, context);

    let speakers = this.getInitialSpeakerList();

    this.state = {
      allStates: {
        speakers: speakers,
        currentIndex: this.getInitialSpeakerIndex(speakers),
        dropDownOpen: false,
        clearModelShow: false,
        addSpeakerShow: false,
        removeSpeakerShow: false
      }
    };

    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleClearModelResponse = this.handleClearModelResponse.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAddSpeaker = this.handleAddSpeaker.bind(this);
    this.handleRemoveSpeaker = this.handleRemoveSpeaker.bind(this);
    this.handleAddSpeakerResponse = this.handleAddSpeakerResponse.bind(this);
    this.handleRemoveSpeakerResponse = this.handleRemoveSpeakerResponse.bind(this);
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
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(allStates.speakers));
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

  handleAddSpeakerResponse(newSpeaker) {
    let allStates = this.state.allStates;
    allStates.addSpeakerShow = false;
    if (newSpeaker !== null) {
      allStates.speakers.list.push({
        id: allStates.speakers.list.length + 1,
        title: newSpeaker.title,
        name: newSpeaker.name,
        currentIndex: this.state.currentIndex < 0 ? 0: this.state.currentIndex,
        fillerCounts: fillers.list.map(a => Object.assign({}, a))
      });
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(allStates.speakers));
    }
    this.setState(() => allStates);

  }

  handleRemoveSpeakerResponse(speakerIdTobeRemoved) {
    let allStates = this.state.allStates;
    allStates.removeSpeakerShow = false;
    if (speakerIdTobeRemoved !== null) {
      const i = this.findIndex(parseInt(speakerIdTobeRemoved));
      if (i >= 0 && i < allStates.speakers.list.length) {
        allStates.speakers.list.splice(i, 1);
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(allStates.speakers));
      }
    }
    while(allStates.currentIndex >= allStates.speakers.list.length && allStates.currentIndex >= 0) {
      allStates.currentIndex--;
    }
    this.setState(() => allStates);

  }

  handleAddSpeaker() {
    let allStates = this.state.allStates;
    allStates.addSpeakerShow = true;
    this.setState(() => allStates);
  }

  handleRemoveSpeaker() {
    let allStates = this.state.allStates;
    allStates.removeSpeakerShow = true;
    this.setState(() => allStates);
  }

  render() {
    return (
      <div className="App">
        <MainMenu data={this.state.allStates.speakers}
                  handleSelect={this.handleRoleChange}
                  handleDropDown={() => this.handleDropDown()}
                  handleClear={this.handleClear}
                  handleAddSpeaker={this.handleAddSpeaker}
                  handleRemoveSpeaker={this.handleRemoveSpeaker}
        />
        {!this.state.allStates.dropDownOpen && this.state.allStates.speakers.list != null && this.state.allStates.speakers.list.length > 0 ?
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
            <GrammarianSheet key="1"
                             speaker={
                               this.state.allStates.speakers.list[this.state.allStates.currentIndex < 0 ? 0 : this.state.allStates.currentIndex]
                             }
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

        <AddSpeaker
          handleResponse={this.handleAddSpeakerResponse}
          show={this.state.allStates.addSpeakerShow} />

        <RemoveSpeaker
          handleResponse={this.handleRemoveSpeakerResponse}
          show={this.state.allStates.removeSpeakerShow}
          speakers={this.state.allStates.speakers.list}
        />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import {Form, FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import {FillerWord} from "./FillerWord";


export class GrammarianSheet extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.fillerCountChange = this.fillerCountChange.bind(this);
    this.findFillerIndex = this.findFillerIndex.bind(this);
    this.saveState = this.saveState.bind(this);

    this.state = {
      speaker: props.speaker
    };

  }

  saveState(speaker) {
    this.setState({speaker: speaker});
    this.props.onGrammarianSheetChange(speaker);
  }

  handleChange(e) {
    let speaker = this.props.speaker;
    speaker.name = e.target.value;
    this.saveState(speaker);
  }

  findFillerIndex(filler) {
    return this.props.speaker.fillerCounts.findIndex((f) => {
      return f.filler === filler.filler
    });
  }


  fillerCountChange(filler) {
    const i = this.findFillerIndex(filler);
    let currentSpeaker = this.props.speaker;
    currentSpeaker.fillerCounts[i] = filler;
    this.saveState(currentSpeaker);
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <Col xs={12} md={12} sm={12}>
            <FormGroup>
            <ControlLabel >{this.props.speaker.title}</ControlLabel>
            <FormControl type='text' bsSize='lg' placeholder={this.props.speaker.title + ' Name'} value={this.props.speaker.name}
                         onChange={this.handleChange}/>
            </FormGroup>

          {
            this.props.speaker.fillerCounts.map((filler) => {
              return <FillerWord filler={filler} onFillerCountChange={() => this.fillerCountChange(filler)}/>
            })
          }
          </Col>
      </FormGroup>
      </Form>
    )
  }
}
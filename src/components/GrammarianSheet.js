import React, {Component} from 'react';
import {Form, FormGroup, Grid, Col, Row, FormControl, ControlLabel} from 'react-bootstrap';
import {FillerWord} from "./FillerWord";


export class GrammarianSheet extends Component {

  paddingStyle = {
    grid: {
      paddingLeft: 5,
      paddingRight: 5
    },
    row: {
      marginLeft: 5,
      marginRight: 5
    },
    col: {
      paddingLeft: 5,
      paddingRight: 5
    }
  };

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.fillerCountChange = this.fillerCountChange.bind(this);
    this.findFillerIndex = this.findFillerIndex.bind(this);
    this.saveState = this.saveState.bind(this);

  }

  saveState(speaker) {
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
      <Form>
        <Grid fluid style={this.paddingStyle.grid}>
        <Row style={this.paddingStyle.row}>
          <Col xs={12} md={12} sm={12} lg={12} style={this.paddingStyle.col}>
            <FormGroup>
              <ControlLabel>{this.props.speaker.title}</ControlLabel>
              <FormControl bsSize='lg' placeholder={this.props.speaker.title + ' Name'}
                           value={this.props.speaker.name}
                           onChange={this.handleChange}/>
            </FormGroup>
          </Col>
        </Row>
        <Row style={this.paddingStyle.row}>
          <Col xs={12} md={12} sm={12} lg={12} style={this.paddingStyle.col}>
            {
              this.props.speaker.fillerCounts.map((filler) => {
                return <FillerWord filler={filler} onFillerCountChange={() => this.fillerCountChange(filler)}/>
              })
            }
          </Col>
        </Row>
        </Grid>
      </Form>
    )
  }
}
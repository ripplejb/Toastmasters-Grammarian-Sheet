import React, {Component} from 'react';
import {FormGroup, Col, Glyphicon, Button, Grid, Row} from 'react-bootstrap';


export class FillerWord extends Component {
  constructor(props, context) {
    super(props, context);

    this.addCount = this.addCount.bind(this);
    this.minusCount = this.minusCount.bind(this);
    this.saveState = this.saveState.bind(this);

    this.state = {
      filler: props.filler
    };

  }

  saveState(filler) {
    this.setState({filler: filler});
    this.props.onFillerCountChange(filler);
  }

  static getStyle(count) {
    if (count < 5) return 'success';
    if (count < 10) return 'warning';
    return 'danger';
  }


  addCount() {
    let currentFiller = this.props.filler;
    currentFiller.count++;
    this.saveState(currentFiller);
  }

  minusCount() {
    let currentFiller = this.props.filler;
    if (currentFiller.count === 0) return;
    currentFiller.count--;
    this.saveState(currentFiller);
  }

  render() {
    return  <FormGroup>
      <Grid>
        <Row>
          <Col xs={10} md={10} sm={10} lg={10}>
            <Button bsSize="large" bsStyle={FillerWord.getStyle(this.props.filler.count)} onClick={() => {
              this.addCount(this.props.filler)
            }} block>

              <Glyphicon glyph="plus-sign"/> {this.props.filler.filler} ({this.props.filler.count})
            </Button>
          </Col>
          <Col xs={2} md={2} sm={2} lg={2}>
            <Button bsSize="large" bsStyle='warning' onClick={() => {
              this.minusCount(this.props.filler)
            }} >
              <Glyphicon glyph="minus-sign"/>
            </Button>
          </Col>
        </Row>
      </Grid>
    </FormGroup>

  }
}
import React from 'react';
import {
  Button,
  Col,
  Form,
  Label,
  Row,
} from 'react-bootstrap';

import * as lib from '../common/libs'

// Below is keyboard emulation for C4-C5 q-i keys
const emulatedKeys = Object.freeze({
  q: 60,
  w: 62,
  e: 64,
  r: 65,
  t: 67,
  y: 69,
  u: 71,
  i: 72
});

const notes = Object.values(emulatedKeys)

const types = ['sine', 'square', 'sawtooth', 'triangle']
lib.changeType(types[0])

export default class Component extends React.Component {
  state = {
    note: '',
    song: JSON.stringify(lib.defaultSong(), 0, 2),
    type: types[0]
  }

  render() {
    return (
      <Form>
        <h2>Song ([[pitch, beats],...])</h2>

        <Row>
          <Col sm={12}>
            <textarea
              style={{ margin: 0, width: 400, height: 200 }}
              value={this.state.song}
              onChange={e => this.setState({ song: e.target.value })}
            >
            {this.state.song}
            </textarea>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Button
              bsStyle="primary"
              onClick={() => {
                const song = this.state.song ? JSON.parse(this.state.song) : undefined;
                lib.playSong(song)
              }}
            >
              ^ Play Song ^
            </Button>{' '}
            <Button
              bsStyle="primary"
              onMouseUp={() => lib.noteOff()}
              onMouseDown={() => {
                const note = notes[notes.length * Math.random() | 0]
                this.setState({ note })
                lib.noteOn(note)
              }}
            >
              Play Note >
            </Button>{' '}
            <Label bsStyle="info">{this.state.note}</Label>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <Button
              bsStyle="primary"
              onClick={() => {
                const type = types[types.length * Math.random() | 0]
                this.setState({ type })
                lib.changeType(type)
              }}
            >
              Change Type
            </Button>{' '}
            <Label bsStyle="info">{this.state.type}</Label>
          </Col>
        </Row>
      </Form>
    )
  }
}

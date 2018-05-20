import React from 'react';
import {
  Col,
  Grid,
  Row,
} from 'react-bootstrap';

import Form from './components/form';
// import * as libs from './common/libs'

export default class Component extends React.Component {
  render() {
    return (
      <Grid>
        <Form />
      </Grid>
    )
  }
}

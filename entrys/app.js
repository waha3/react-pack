import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Main extends Component {
  render() {
    return <div className="container">2222</div>;
  }
}

render(<Main />, document.querySelector('#app'));

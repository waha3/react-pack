import React, { Component } from 'react';
import { render } from 'react-dom';
import http from 'axios';

http.get('https://cdnjs.cloudflare.com/ajax/libs/react-router/4.3.1/react-router.min.js');

export default class Main extends Component {
  render() {
    return <div className="container">fff11</div>;
  }
}

render(<Main />, document.getElementById('home'));

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Main extends Component {
  render() {
    return (
      <div className="container">
        aaaa
      </div>
    );
  }
}

render(
  <Main />,
  document.querySelector('#app')
);

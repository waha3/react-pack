import React, { Component } from 'react';
import { render } from 'react-dom';
// import Main from '../src/main.js';
import http from 'axios';
const logger = window.console.error;
const path = 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.5.24/dayjs.min.js';

// http.get(path).then(res => console.log(res.default))


function load() {
  const script = document.createElement('script');
  script.async = false;
  script.src = path;
  script.type = 'text/javascript';
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject();
    };
  });
}

load()
  .then(async () => {
    const res = await import(/* webpackChunkName: "main" */ '../src/main.js');
    const Main = res.default;
    render(<Main />, document.getElementById('home'));
  })
  .catch(err => logger(err));

// class Main extends Component {
//   render() {
//     return <div className="container">1111</div>;
//   }
// }

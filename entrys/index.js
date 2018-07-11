import React from 'react';
import { render } from 'react-dom';
const path = 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.5.24/dayjs.min.js';

function load(url) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = url;
  script.type = 'text/javascript';
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      script.remove();
      resolve();
    };

    script.onerror = () => {
      reject();
    };
  });
}

load(path)
  .then(async () => {
    const res = await import(/* webpackChunkName: "main" */ '../src/main.js');
    const Main = res.default;
    render(<Main />, document.getElementById('home'));
  })
  .catch(err => logger(err));

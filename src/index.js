import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './main.js';

const root = document.querySelector('.app');

render(
  <AppContainer>
    <Main />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./main.js', () => render(<Main />));
}

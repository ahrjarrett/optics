import * as React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';
import * as serviceWorker from 'helpers/serviceWorker';
import 'styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

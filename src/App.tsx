import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import * as stores from './stores';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import Routes from './routes';
import 'assets/styles/index.scss';

const history = createBrowserHistory();

@observer
class App extends Component {
  render() {
    return (
      <Provider {...stores}>
          {/* <ToastContainer /> */}
          <Router history={history}>
            <div className="app-container">
              <Routes />
            </div>
          </Router>
      </Provider>
    );
  }
};

export default App;
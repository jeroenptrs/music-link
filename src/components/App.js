import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Catch from './Catch';

class App extends Component {
  // TODO: testing on all browsers for errors
  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            <Link to="/" className="title-link">
              <h1><i className="material-icons">&#xE405;</i>msc.li</h1>
            </Link>
          </div>
          <div className="outline">
            <div className="ctr-auto">
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/:artist/:album" component={Search} />
                  <Route component={Catch} />
                </Switch>
              </div>
            </div>
            <div className="ctr-m-1 mscli-backdrop-container">
              <div className="mscli-backdrop">
                <img
                  src={'/assets/background_4K.jpg'}
                  alt="msc.li - Music Link"
                />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

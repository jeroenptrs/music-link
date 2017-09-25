import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Catch from './Catch';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
              <div className="outline">
                  <div className="ctr-auto">
                      <div className="container">
                          <h1><i className="material-icons">&#xE405;</i><span>msc.li</span></h1>
                          <Switch>
                              <Route exact path="/" component={Landing} />
                              <Route path="/:artist/:album" component={Search} />
                              <Route component={Catch} />
                          </Switch>
                      </div>
                  </div>
                  <div className="ctr-m-1 mscli-backdrop-container">
                      <div className="mscli-backdrop">
                        <img src="/assets/background.png" alt="msc.li - Music Link" />
                      </div>
                  </div>
              </div>
          </div>
        </Router>
    );
  }
}

export default App;

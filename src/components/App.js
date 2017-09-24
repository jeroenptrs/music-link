import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
              <div className="outline">
                  <div className="ctr-auto">
                      <div className="container">
                          <h1><i className="material-icons">&#xE405;</i><span>msc.li</span></h1>
                          <Route path="/" component={Landing} />
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

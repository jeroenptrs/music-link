import React, { Component } from 'react';
import Landing from './Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div className="outline">
              <div className="ctr-auto">
                  <div className="container">
                      <h1>msc.li</h1>
                      <Landing />
                  </div>
              </div>
              <div className="ctr-m-1 mscli-backdrop-container">
                  <div className="mscli-backdrop">
                    <img src="/assets/background.png" alt="msc.li - Music Link" />
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;

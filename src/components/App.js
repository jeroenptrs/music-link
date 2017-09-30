import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Catch from './Catch';
import pj from '../../package.json';

class App extends Component {
  render() {
      //TODO: Convert title-link to header
    return (
        <Router>
          <div className="App">
              <div className="outline">
                  <div className="ctr-auto">
                      <div className="container">
                          <Link to="/" className="title-link"><h1><i className="material-icons">&#xE405;</i><span>msc.li</span></h1></Link>
                          <Switch>
                              <Route exact path="/" component={Landing} />
                              <Route path="/:artist/:album" component={Search} />
                              <Route component={Catch} />
                          </Switch>
                      </div>
                  </div>
                  <div className="ctr-m-1 mscli-backdrop-container">
                      <div className="mscli-backdrop">
                        <img src={"/" + pj.ghprepo + "/assets/background.png"} alt="msc.li - Music Link" />
                      </div>
                  </div>
              </div>
          </div>
        </Router>
    );
  }
}

export default App;

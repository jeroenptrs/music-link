import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { Element, scroller } from 'react-scroll';
import RenderAlbums from './_search/_renderAlbums';
import fetchAPI from './_search/_fetchApi';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spotify: false,
      deezer: false,
      apple: false,
      scrolltip: false,
    };
    this.handleScrollTip = this.handleScrollTip.bind(this);
    this.handleScrollTipClick = this.handleScrollTipClick.bind(this);
  }

  componentWillMount() {
    fetchAPI('spotify', this);
    fetchAPI('deezer', this);
    fetchAPI('apple', this);
  }

  handleScrollTip(v) {
    const { spotify, deezer, apple } = this.state;
    if (v ||
      (!deezer && !spotify && !apple) ||
      (deezer.length === 0 && spotify.length === 0 && apple.length === 0)
    ) this.setState({ scrolltip: false });
    else this.setState({ scrolltip: 'apple' });
  }

  handleScrollTipClick() {
    scroller.scrollTo(this.state.scrolltip, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -10,
    });
  }

  render() {
    const { spotify, deezer, apple } = this.state;
    return (
      <div className="grid">
        <div className="col-s-2 streaming-title">
          <img src={'/assets/spotify_logo.png'} alt="Spotify" />
          <hr />
        </div>
        <div className="col-s-2">
          {spotify !== false ?
            <RenderAlbums albums={spotify} />
            :
            <div className="loader"><p className="loading">Loading Spotify results...</p></div>
          }
        </div>
        <div className="col-s-2 streaming-title">
          <img src={'/assets/deezer_logo.png'} alt="Deezer" />
          <hr />
        </div>
        <div className="col-s-2">
          {deezer !== false ?
            <RenderAlbums albums={deezer} />
            :
            <div className="loader"><p className="loading">Loading Deezer results...</p></div>
          }
        </div>
        <div className="col-s-2 streaming-title">
          <img src={'/assets/applemusic_logo.png'} alt="Apple Music" />
          <hr />
        </div>
        <div className="col-s-2">
          {apple !== false ?
            <RenderAlbums albums={apple} />
            :
            <div className="loader"><p className="loading">Loading Apple Music results...</p></div>
          }
          <VisibilitySensor onChange={(v) => { this.handleScrollTip(v); }}>
            <Element name="apple"><div id="bottom" /></Element>
          </VisibilitySensor>
        </div>
        <div
          className={this.state.scrolltip ? 'scrolltip-container' : 'scrolltip-container hidden'}
          onClick={() => this.handleScrollTipClick()}
        >
          <span className="scrolltip">
            <span>SCROLL DOWN FOR MORE RESULTS</span>
            <i className="material-icons">&#xE313;</i>
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as pj from '../../package.json';
import Album from './Album';
import VisibilitySensor from 'react-visibility-sensor';
import {Element, scroller} from 'react-scroll';

class Search extends Component {
  constructor(props){
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
    this.fetchAPI('spotify');
    this.fetchAPI('deezer');
    this.fetchAPI('apple');
  }

  async fetchAPI(type) {
    let state = {};

    try {
      let r = await fetch(pj.genericApi + 'genericApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artist: this.props.match.params.artist,
          album: this.props.match.params.album,
          type: type,
        }),
      });

      r = await r.json();
      state[type] = r[type];
      this.setState(state);
    } catch (error) { console.log(error); }
  }

  handleScrollTip(v) {
    if (v) this.setState({ scrolltip: false });
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

  renderAlbums(albums) {
    if (albums) {
      return albums.map(album => (
        <Album album={album} key={album.id} />
      ));
    }
    // TODO: Could not find an album on this service response.
    return (<div></div>);
  }

  render() {
    const { spotify, deezer, apple } = this.state,
      formattedSpotify = this.renderAlbums(spotify),
      formattedDeezer = this.renderAlbums(deezer),
      formattedAppleMusic = this.renderAlbums(apple);
    // TODO: proper loading components!
    return (
      <div className="grid">
        <div className="col-s-2 streaming-title">
          <img src={'/assets/spotify_logo.png'} alt="Spotify" />
          <hr />
        </div>
        <div className="col-s-2">
          {spotify !== false ?
            <div className="album-grid">{formattedSpotify}</div>
            :
            <p className="loading">Loading Spotify results...</p>
          }
        </div>
        <div className="col-s-2 streaming-title">
          <img src={'/assets/deezer_logo.png'} alt="Deezer" />
          <hr />
        </div>
        <div className="col-s-2">
          {deezer !== false ?
            <div className="album-grid">{formattedDeezer}</div>
            :
            <p className="loading">Loading Deezer results...</p>
          }
        </div>
        <div className="col-s-2 streaming-title">
          <img src={'/assets/applemusic_logo.png'} alt="Apple Music" />
          <hr />
        </div>
        <div className="col-s-2">
          {apple !== false ?
            <div className="album-grid">{formattedAppleMusic}</div>
            :
            <p className="loading">Loading Apple Music results...</p>
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
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
      scrolltip: false
    };

    this.handleScrollTip = this.handleScrollTip.bind(this);
    this.handleScrollTipClick = this.handleScrollTipClick.bind(this);
  }

  componentWillMount(){
    this.fetchAPI('spotify');
    this.fetchAPI('deezer');
    this.fetchAPI('apple');
  }

  async fetchAPI(type) {
    let state = this.state;

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

  handleScrollTip(v, type){
    switch (type) {
      case 'deezer':
        if (v) this.setState({ scrolltip: 'apple' });
        else if (!v && this.state.scrolltip !== 'deezer') this.setState({ scrolltip: 'deezer' });
        break;
      case 'apple':
        if (v) this.setState({ scrolltip: false });
        else if (!v && this.state.scrolltip !== 'apple') this.setState({ scrolltip: 'apple' });
        break;
    }
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
      return albums.map((album) => (
        <Album album={album} key={album.id} />
      ));
    }
    //TODO: Could not find an album on this service response.
    return (<div></div>);
  }

  render() {
    const { spotify, deezer, apple } = this.state;
    let formattedSpotify, formattedDeezer, formattedAppleMusic, formattedItunes;

    formattedSpotify = this.renderAlbums(spotify);
    formattedDeezer = this.renderAlbums(deezer);
    formattedAppleMusic = this.renderAlbums(apple);

    //TODO: proper loading components!
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
        <VisibilitySensor onChange={(v) => { this.handleScrollTip(v, 'deezer'); }}>
          <div className="col-s-2 streaming-title">
            <Element name="deezer"><img src={'/assets/deezer_logo.png'} alt="Deezer" /></Element>
            <hr />
          </div>
        </VisibilitySensor>
        <div className="col-s-2">
          {deezer !== false ?
            <div className="album-grid">{formattedDeezer}</div>
            :
            <p className="loading">Loading Deezer results...</p>
          }
        </div>
        <VisibilitySensor onChange={(v) => this.handleScrollTip(v, 'apple')}>
          <div className="col-s-2 streaming-title">
            <Element name="apple"><img src={'/assets/applemusic_logo.png'} alt="Apple Music" /></Element>
            <hr />
          </div>
        </VisibilitySensor>

        <div className="col-s-2">
          {apple !== false ?
            <p className="loading">Apple Music coming soon!</p>
            :
            <p className="loading">Loading Apple Music results...</p>
          }
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
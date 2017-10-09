import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: '',
      album: '',
      url: '',
      err: false,
    };

    this.onKeyUpArtist = this.onKeyUpArtist.bind(this);
    this.onKeyUpAlbum = this.onKeyUpAlbum.bind(this);
    this.onTypeAlbum = this.onTypeAlbum.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onTypeArtist(event) {
    const state = this.state;

    state.artist = event.target.value;

    if (this.state.album.length > 0 && event.target.value.length > 0) state.url = '/' + event.target.value + '/' + this.state.album;
    else state.url = '';

    this.setState(state);
  }

  onTypeAlbum(event) {
    const state = this.state;

    state.album = event.target.value;

    if(this.state.artist.length > 0 && event.target.value.length > 0)
      state.url = '/' + this.state.artist + '/' + event.target.value;
    else
      state.url = '';

    this.setState(state);
  }

  onClickSearch() {
    if (this.state.artist.length === 0 || this.state.album.length === 0)
      this.setState({ err: 'Please enter both an artist and album name.' });
    else this.setState({ err: false });
  }

  onKeyUpArtist(e) {
    if(e.key === 'Enter') this.albumInput.focus();
  }

  onKeyUpAlbum(e){
    if (e.key === 'Enter' && (this.state.artist.length > 0 && this.state.album.length > 0)){
      this.props.history.push(this.state.url);
    } else if (e.key === 'Enter') this.onClickSearch();
  }

  render() {
    return (
      <div className="info-text">
        <p>
          Do you want to share albums you love, but your friends don’t use the same streaming platform as you?<br />
        </p>
        <p>
          This site creates a <span className="highlight">link</span> to several <span className="highlight">music</span> platforms such as Spotify, Deezer and Apple Music.
        </p>

        <div className="grid">
          <div className="col-s-2 error-col">
            {this.state.err !== false ? <p>{this.state.err}</p> : <p>&nbsp;</p>}
          </div>
          <div className="col-l-1">
            <input
              type="text"
              id="artistname"
              name="artist"
              placeholder="Artist"
              value={this.state.artist}
              onChange={this.onTypeArtist.bind(this)}
              onKeyUp={(e) => this.onKeyUpArtist(e)}
            />
          </div>
          <div className="col-l-1">
            <input
              type="text"
              id="albumname"
              name="album"
              placeholder="Album"
              ref={(input) => { this.albumInput = input; }}
              value={this.state.album}
              onChange={this.onTypeAlbum}
              onKeyUp={(e) => this.onKeyUpAlbum(e)} />
          </div>
          <div className="col-auto button-col">
            <Link
              to={this.state.url}
              className="button"
              onClick={this.onClickSearch}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);

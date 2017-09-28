import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Landing extends Component {
    constructor(props){
        super(props);

        this.state = {
            artist: '',
            album: '',
            url: '',
            err: false
        }
    }

    onTypeArtist(event) {
        let state = this.state;

        state.artist = event.target.value;

        if(this.state.album !== '')
            state.url = "/" + event.target.value + "/" + this.state.album;

        this.setState(state);
    }

    onTypeAlbum(event) {
        let state = this.state;

        state.album = event.target.value;

        if(this.state.artist !== '')
            state.url = "/" + this.state.artist + "/" + event.target.value;

        this.setState(state);
    }

    onClickSearch(){
        if (this.state.artist === '' || this.state.album === '')
            this.setState({err: 'Please enter both an artist and album name.'});
    }

    render() {
        return (
            <div>
                <p>
                    Do you want to share albums you love, but your friends don’t use the same streaming platform as you?<br/>
                    This site creates a <span className="highlight">link</span> to several <span className="highlight">music</span> platforms such as Spotify, Deezer, Apple Music and iTunes.
                </p>

                <div className="grid">
                    <div className="col-s-2 error-col">
                        {this.state.err !== false ? <p>{this.state.err}</p> : <p>&nbsp;</p>}
                    </div>
                    <div className="col-s-1">
                        <input type="text" id="artistname" name="artist" placeholder="Artist" value={this.state.artist} onChange={this.onTypeArtist.bind(this)} />
                    </div>
                    <div className="col-s-1">
                        <input type="text" id="albumname" name="album" placeholder="Album" value={this.state.album} onChange={this.onTypeAlbum.bind(this)} />
                    </div>
                    <div className="col-auto button-col">
                        <Link to={this.state.url} className="button" onClick={this.onClickSearch.bind(this)} >Create a music link</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Landing);

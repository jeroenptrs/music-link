import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as pj from '../../package.json';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            spotify: false,
            deezer: false,
            apple: false
        }
        console.log(pj);
    }

    componentWillMount(){
        this.fetchAPI('spotify');
        this.fetchAPI('deezer');
        this.fetchAPI('apple');
    }

    async fetchAPI(type){
        let state = this.state;

        try{
            let r = await fetch(pj.genericApi + 'genericApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    artist: this.props.match.params.artist,
                    album: this.props.match.params.album,
                    type: type
                })
            });

            r = await r.json();
            state[type] = r[type];
            this.setState(state);
        }
        catch(error){ console.log(error); }
    }

    render(){
        const { spotify, deezer, apple } = this.state;
        let formattedSpotify = this.renderAlbums(spotify);
        console.log(deezer);

        return(
            <div className="grid">
                <div className="col-s-2 streaming-title">
                    <img src="/assets/spotify_logo.png" />
                    <hr/>
                </div>
                <div className="col-s-2">
                    {spotify ?
                        <div className="album-grid">{formattedSpotify}</div>
                        :
                        <p className="loading">Loading Spotify results...</p>
                    }
                </div>
                <div className="col-s-2 streaming-title">
                    <img src="/assets/deezer_logo.png" />
                    <hr/>
                </div>
                <div className="col-s-2">
                    {deezer !== false ?
                        <p className="loading">Deezer coming soon!</p>
                        :
                        <p className="loading">Loading Deezer results...</p>
                    }
                </div>
                <div className="col-s-2 streaming-title">
                    <img src="/assets/applemusic_logo.png" />
                    <hr/>
                </div>
                <div className="col-s-2">
                    {deezer !== false ?
                        <p className="loading">Apple Music coming soon!</p>
                        :
                        <p className="loading">Loading Apple Music results...</p>
                    }
                </div>
            </div>
        )
    }

    renderAlbums(albums){
        if(albums){
            return albums.map((album) =>
                    <div className="album-s-6-m-3-xl-2" key={album.id}>
                        <img src={album.images[0].url} />
                        <span className="info">
                            <strong>{album.name}</strong>
                            <br/>by <strong>{album.artists[0].name}</strong>
                        </span>
                        <div className="listen-button-wrapper">
                            <button className="listen-button" onClick={(e) => {window.location.href = album.external_urls.spotify}}>LISTEN</button>
                        </div>
                    </div>
                );
        }
    }

}

export default withRouter(Search);
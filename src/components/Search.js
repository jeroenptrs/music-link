import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as pj from '../../package.json';
import Album from './Album';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            spotify: false,
            deezer: false,
            apple: false
        };
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
        let formattedSpotify, formattedDeezer, formattedAppleMusic, formattedItunes;

        formattedSpotify = this.renderAlbums(spotify);
        formattedDeezer = this.renderAlbums(deezer);
        formattedAppleMusic = this.renderAlbums(apple);

        //TODO: proper loading components!
        return(
            <div className="grid">
                <div className="col-s-2 streaming-title top">
                    <img src={"/assets/spotify_logo.png"} alt="Spotify" />
                    <hr/>
                </div>
                <div className="col-s-2">
                    {spotify !== false ?
                        <div className="album-grid">{formattedSpotify}</div>
                        :
                        <p className="loading">Loading Spotify results...</p>
                    }
                </div>
                <div className="col-s-2 streaming-title">
                    <img src={"/assets/deezer_logo.png"} alt="Deezer" />
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
                    <img src={"/assets/applemusic_logo.png"} alt="Apple Music" />
                    <hr/>
                </div>
                <div className="col-s-2">
                    {apple !== false ?
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
                <Album album={album} key={album.id} />
            );
        }
        //TODO: Could not find an album on this service reponse.
        else { return (<div></div>); }
    }

}

export default withRouter(Search);
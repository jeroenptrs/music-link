import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            spotify: false,
            deezer: false,
            apple: false
        }
    }

    componentWillMount(){
        console.log(this.props.match.params);
        this.fetchAPI('spotify');
        this.fetchAPI('deezer');
        this.fetchAPI('apple');
    }

    async fetchAPI(type){
        let state = this.state;

        try{
            let r = await fetch('https://wt-d16d4ed13fb086ca4bb3643449c8f6c4-0.run.webtask.io/genericApi', {
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
        console.log(this.state);
        return(
            <ul>
                {this.state.spotify ?
                    <li>Spotify API correctly loaded</li>
                    :
                    <li>Loading Spotify API ...</li>
                }
                {this.state.deezer ?
                    <li>Deezer API correctly loaded</li>
                    :
                    <li>Loading Deezer API ...</li>
                }
                {this.state.apple ?
                    <li>Apple API correctly loaded</li>
                    :
                    <li>Loading Apple API ...</li>
                }
            </ul>
        )
    }
}

export default withRouter(Search);
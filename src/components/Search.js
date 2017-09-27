import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            spotify: false,
            deezer: false,
            applemusic: false,
            itunes: false
        }
    }

    componentWillMount(){
        console.log(this.props.match.params);
        this.fetchAPI('spotify');
    }

    async fetchAPI(type){
        try{
            let r = await fetch('https://wt-d16d4ed13fb086ca4bb3643449c8f6c4-0.run.webtask.io/genericApi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: type
                })
            });

            r = await r.json();
            this.setState({
               spotify: r.spotify,
            });
            console.log(r);
        }
        catch(error){ console.log(error); }
    }

    render(){
        return(
            <div>
                {this.state.spotify ?
                    <small>API correctly loaded</small>
                    :
                    <small>Loading ...</small>
                }
            </div>
        )
    }
}

export default withRouter(Search);
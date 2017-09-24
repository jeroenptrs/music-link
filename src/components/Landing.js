import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: props.location.pathname !== "/"
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            hidden: props.location.pathname !== "/"
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className={this.state.hidden ? "landingcomponent hidden" : "landingcomponent"}>
                <p>
                    Do you want to share albums you love, but your friends don’t use the same streaming platform as you?
                </p>
                <p>
                    This site creates a <span className="highlight">link</span> to several <span className="highlight">music</span> platforms such as Spotify, Deezer, Apple Music and iTunes.
                </p>

                <div className="grid">
                    <div className="col-s-1">
                        <input type="text" id="artistname" name="artist" placeholder="Artist" />
                    </div>
                    <div className="col-s-1">
                        <input type="text" id="albumname" name="album" placeholder="Album"/>
                    </div>
                    <div className="col-auto button-col">
                        <Link to="/test" className="button">Create a music link</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Landing);

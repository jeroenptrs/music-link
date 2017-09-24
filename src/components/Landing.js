import React, { Component } from 'react';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <p>
                    Do you like sharing your new favorite album with your friends, but they don’t use the same streaming platform as you?
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
                        <button className="button">Create a music link</button>
                    </div>
                </div>
            </div>
        );
    }
}

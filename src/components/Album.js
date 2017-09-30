import React, { Component } from 'react';

class Album extends Component {
    render(){
        const { album } = this.props;
        return(
            <div className="album-s-6-m-3-xl-2">
                <img src={album.image} alt="Album Artwork" />
                <span>
                    <span className="info">
                        <strong>{album.name}</strong>
                        <br/>by <strong>{album.artist.name}</strong>
                    </span>
                    <div className="listen-button-wrapper">
                        <button className="listen-button" onClick={(e) => {window.location.href = album.url}}>LISTEN</button>
                    </div>
                </span>
            </div>
        );
    }
}

export default Album;
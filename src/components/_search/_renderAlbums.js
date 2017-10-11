import React, { Component } from 'react';
import Album from './_album';

class RenderAlbums extends Component {
  render() {
    const { albums } = this.props;
    if (albums && albums.length > 0) {
      return (
        <div className="album-grid">
          { albums.map(album => (
            <Album album={album} key={album.id} />
          )) }
        </div>
      );
    }
    return (
      <p className="loading">Sorry! Could not find an album on this service.</p>
    );
  }
}

export default RenderAlbums;

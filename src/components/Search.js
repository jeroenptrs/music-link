import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Search extends Component {
    render(){
        let props = this.props;

        return(
            <div>
                <ul>
                    <li>{props.match.params.artist}</li>
                    <li>{props.match.params.album}</li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Search);
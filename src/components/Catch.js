import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class Catch extends Component {
    render(){
        return(
            <Redirect to={{pathname: '/'}} />
        )
    }
}

export default withRouter(Catch);
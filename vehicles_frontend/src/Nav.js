import React, { Component } from 'react';
import { Link }  from 'react-router';

import Navigationbar from './components/Navigationbar';

export default class Nav extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <Navigationbar />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

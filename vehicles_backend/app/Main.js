import React, { Component } from 'react';
import { Link }  from 'react-router';

import Navigationbar from './Navigationbar'

export default class Main extends Component {
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
